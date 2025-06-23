# 🧠 BIGFOOT Connect - Backend API

> API RESTful que alimenta o sistema de autenticação do aplicativo desktop **BIGFOOT Connect**, responsável pelo registro e login de usuários que compartilham banda em troca de tokens na rede Solana.

---

## 🛠️ Tecnologias Utilizadas

- ⚙️ Node.js + Express
- 🔐 bcryptjs & jsonwebtoken
- 🧪 dotenv
- ☁️ Deploy via [Vercel](https://vercel.com/)
- 📁 Estrutura pronta para `serverless functions`

---

## 📁 Estrutura do Projeto

bigfoot-connect-api/
├── api/
│ ├── register.js # Rota POST /register
│ └── login.js # Rota POST /login
├── lib/
│ └── users.js # Armazena usuários em memória (temporariamente)
├── .env # Variáveis de ambiente (JWT_SECRET)
├── vercel.json # Configuração do deploy Vercel
└── README.md

yaml
Copiar
Editar

---

## 🔐 Endpoints da API

### ➕ POST `/api/register`

Registra um novo usuário.

**Requisição:**
```json
{
  "username": "seu_usuario",
  "password": "sua_senha"
}
Resposta:
{
  "message": "Usuário cadastrado com sucesso"
}
🔑 POST /api/login
Autentica o usuário e retorna um token JWT.

Requisição:

{
  "username": "seu_usuario",
  "password": "sua_senha"
}
Resposta:

json
Copiar
Editar
{
  "token": "jwt_token_aqui"
}
💻 Executando Localmente
git clone https://github.com/magroalbino/bigfoot-connect-api.git
cd bigfoot-connect-api

npm install
Configure o arquivo .env:
ini
Copiar
Editar
JWT_SECRET=sua_chave_super_secreta
Execute localmente:
bash
npx vercel dev
☁️ Deploy na Vercel
Faça login em vercel.com

Clique em Import Project e selecione este repositório

Adicione a variável de ambiente JWT_SECRET

Clique em Deploy ✅

Após o deploy, você terá uma URL como:

https://bigfoot-connect-api.vercel.app/api/register
Substitua o fetch("http://localhost:3000/register") no Electron pelo novo link da Vercel!

🔒 Segurança
Senhas armazenadas com bcrypt (hash)

Tokens JWT gerados com jsonwebtoken

Pode ser expandido para uso com bancos de dados reais (ex: PostgreSQL, MongoDB)

✨ Melhorias Futuras
Integração com banco de dados real (via Prisma)

Middleware de proteção com verificação de token

Rate-limiting e verificação de IP

Testes automatizados

🤝 Contribuindo
Pull requests são bem-vindos! Sinta-se livre para abrir uma issue se encontrar algum bug ou sugerir melhorias.

📝 Licença
MIT © BIGFOOT Labs
