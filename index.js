export default function handler(req, res) {
  res.status(200).send(`
    <html>
      <head><title>BIGFOOT Connect API</title></head>
      <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
        <h1>🚀 BIGFOOT Connect API</h1>
        <p>API operacional. Use as rotas <code>/api/register</code> e <code>/api/login</code> para integração.</p>
      </body>
    </html>
  `);
}
