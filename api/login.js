const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ SUPABASE_URL e SUPABASE_ANON_KEY não estão configuradas.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    // Buscar usuário no Supabase
    const { data: user, error } = await supabase
      .from('profiles')
      .select('id, username, password')
      .eq('username', username)
      .single();

    if (error) {
      console.error('Erro ao buscar usuário:', error.message);
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(password, user.password);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    return res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (err) {
    console.error('Erro no login:', err.message);
    return res.status(500).json({ message: 'Erro interno no login.' });
  }
};
