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
    return res.status(400).json({
      message: 'Username deve ter pelo menos 3 caracteres e senha 6 caracteres.'
    });
  }

  try {
    // 🔍 Verificar se o usuário já existe antes de registrar
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Erro ao verificar username:', checkError.message);
      return res.status(500).json({ message: 'Erro ao verificar username.' });
    }

    // 🔐 Criar usuário no Supabase Auth (email temporário para testes)
    const email = `${username.toLowerCase()}@temp-mail.org`;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError || !authData || !authData.user) {
      console.error('Erro no registro de autenticação:', authError?.message || 'Nenhum usuário retornado');
      return res.status(500).json({
        message: `Erro no registro de autenticação: ${authError?.message || 'Nenhum usuário retornado'}`
      });
    }

    const userId = authData.user.id;

    // 🔐 Criptografar senha para armazenar em perfil
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: insertedUser, error: insertError } = await supabase
      .from('profiles')
      .insert([{ id: userId, username, password: hashedPassword }])
      .select();

    if (insertError) {
      console.error('Erro ao inserir usuário:', insertError.message);
      return res.status(500).json({ message: insertError.message });
    }

    if (!insertedUser || insertedUser.length === 0) {
      console.error('Falha ao recuperar dados do registro:', insertedUser);
      return res.status(500).json({ message: 'Falha ao recuperar dados do registro.' });
    }

    console.log('Usuário registrado com sucesso:', insertedUser[0]);
    return res.status(200).json({ message: 'User registered', userId: insertedUser[0].id });

  } catch (err) {
    console.error('Erro inesperado no registro:', err);
    return res.status(500).json({
      message: 'Erro interno no registro.' + (err.message ? ' Detalhes: ' + err.message : '')
    });
  }
};
