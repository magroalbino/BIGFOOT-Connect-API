const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ SUPABASE_URL e SUPABASE_ANON_KEY não estão configuradas.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  if (username.length < 3 || password.length < 6) {
    return res.status(400).json({ message: 'Username deve ter pelo menos 3 caracteres e senha 6 caracteres.' });
  }

  try {
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Erro ao verificar username:', checkError.message);
      return res.status(500).json({ message: 'Erro ao verificar username.' });
    }
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from('profiles')
      .insert([{ username, password: hashedPassword }]); // Não incluir id

    if (error) {
      console.error('Erro ao inserir usuário:', error.message);
      return res.status(500).json({ message: error.message });
    }

    console.log('Usuário registrado:', data);
    return res.status(200).json({ message: 'User registered', userId: data[0].id });
  } catch (err) {
    console.error('Erro no registro:', err);
    return res.status(500).json({ message: 'Erro interno no registro.' + (err.message ? ' Detalhes: ' + err.message : '') });
  }
};