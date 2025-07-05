# 🧠 BIGFOOT Connect – Backend API

> API RESTful que alimenta o sistema de autenticação do aplicativo **BIGFOOT Connect**, responsável pelo registro e login de usuários que compartilham banda ociosa em troca de tokens na rede Solana.

---

## 🛠️ Tecnologias Utilizadas

- ⚙️ Node.js + Express
- 🔐 bcryptjs & jsonwebtoken
- 🔧 dotenv
- ☁️ Deploy via [Vercel](https://vercel.com/)
- 📁 Estrutura pronta para Serverless Functions

---

## 📁 Estrutura do Projeto

```
bigfoot-connect-api/
├── api/
│   ├── register.js       # Rota POST /register
│   └── login.js          # Rota POST /login
├── lib/
│   └── users.js          # Armazena usuários em memória (temporariamente)
├── .env                  # Variáveis de ambiente (JWT_SECRET)
├── vercel.json           # Configuração para deploy na Vercel
└── README.md
```

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
```

**Resposta:**
```json
{
  "message": "Usuário cadastrado com sucesso"
}
```

---

### 🔑 POST `/api/login`

Autentica o usuário e retorna um token JWT.

**Requisição:**
```json
{
  "username": "seu_usuario",
  "password": "sua_senha"
}
```

**Resposta:**
```json
{
  "token": "jwt_token_aqui"
}
```

---

## 💻 Executando Localmente

```bash
git clone https://github.com/magroalbino/bigfoot-connect-api.git
cd bigfoot-connect-api

npm install
```

Crie um arquivo `.env` com:

```ini
JWT_SECRET=sua_chave_super_secreta
```

Execute localmente:

```bash
npx vercel dev
```

---

## ☁️ Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login.
2. Clique em **"Import Project"** e selecione este repositório.
3. Adicione a variável de ambiente `JWT_SECRET`.
4. Clique em **Deploy ✅**.

Após o deploy, sua API estará disponível em uma URL como:

```
https://bigfoot-connect-api.vercel.app/api/register
```

Substitua o `fetch("http://localhost:3000/register")` no Electron pela nova URL da Vercel.

---

## 🔒 Segurança

- Senhas são armazenadas com **bcrypt** (hash seguro).
- Tokens JWT são gerados com **jsonwebtoken**.
- Estrutura pronta para expansão com banco de dados real.

---

## ✨ Melhorias Futuras

- Integração com banco de dados real (ex: PostgreSQL + Prisma)
- Middleware de verificação de token JWT
- Rate limiting e proteção por IP
- Testes automatizados

---

## 🤝 Contribuindo

Pull requests são bem-vindos!  
Se encontrar algum bug ou tiver sugestões, abra uma issue.

---

## 📝 Licença

MIT © BIGFOOT Labs
