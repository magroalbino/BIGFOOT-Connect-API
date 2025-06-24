import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import 'dotenv/config'; // Carrega variáveis de ambiente

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ SUPABASE_URL e SUPABASE_ANON_KEY não estão configuradas.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username e senha são obrigatórios.' });
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, password')
      .eq('username', username)
      .single();

    if (error || !data) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    return res.status(200).json({ message: 'Login successful', userId: data.id });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ message: 'Erro interno no login.' });
  }
}