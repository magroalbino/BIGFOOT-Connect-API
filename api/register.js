export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Simulação simples (idealmente usar um banco de dados)
  if (username === 'admin') {
    return res.status(400).json({ message: 'User already exists' });
  }

  return res.status(200).json({ message: 'User registered' });
}
