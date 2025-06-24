const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ SUPABASE_URL e SUPABASE_ANON_KEY não estão configuradas.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });
  res.status(200).send(`
    <html>
      <head><title>BIGFOOT Connect API</title></head>
      <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
        <h1>🚀 BIGFOOT Connect API</h1>
        <p>API operacional. Use as rotas <code>/api/register</code> e <code>/api/login</code> para integração.</p>
      </body>
    </html>
  `);
};