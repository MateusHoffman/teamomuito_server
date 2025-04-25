# Te Amo Muito Server

## 📝 Descrição

TeamoMuito Server é o backend da aplicação web romântica Te Amo Muito, desenvolvido com Node.js e Express. Este servidor fornece todas as APIs necessárias para o funcionamento do cliente, incluindo gerenciamento de usuários, upload de mídia, processamento de pagamentos e envio de e-mails.

## 🔗 Repositórios Relacionados

- [Te Amo Muito Client](https://github.com/MateusHoffman/teamomuito_client) - Frontend da aplicação que consome as APIs deste servidor.

## 🚀 Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime JavaScript
- **Express** - Framework web para Node.js
- **TypeScript** - Superset JavaScript com tipagem estática
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Cloudinary** - Serviço de gerenciamento de mídia
- **MercadoPago** - Gateway de pagamento
- **Stripe** - Processamento de pagamentos
- **Nodemailer** - Envio de e-mails
- **Multer** - Upload de arquivos
- **Express Validator** - Validação de dados

### Ferramentas de Desenvolvimento

- **TypeScript** - Verificação de tipos
- **ts-node** - Execução de TypeScript
- **Docker** - Containerização
- **Fly.io** - Plataforma de deploy

## 📁 Estrutura do Projeto

```
src/
├── controllers/     # Controladores da aplicação
├── models/         # Modelos do MongoDB
├── routes/         # Rotas da API
├── services/       # Serviços e lógica de negócio
├── utils/          # Funções utilitárias
├── config/         # Configurações
└── server.ts       # Arquivo principal do servidor
```

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js (versão LTS recomendada)
- MongoDB
- Conta no Cloudinary
- Conta no MercadoPago
- Conta no Stripe
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm run start` - Inicia o servidor de produção

## 🌟 Funcionalidades

- API RESTful para gerenciamento de homenagens
- Upload e gerenciamento de mídia
- Integração com gateways de pagamento
- Sistema de envio de e-mails
- Validação de dados
- Autenticação e autorização
- Armazenamento em banco de dados
- Logs e monitoramento

## 🔒 Segurança

- Validação de dados de entrada
- Proteção contra ataques comuns (CORS, XSS, etc.)
- Variáveis de ambiente para dados sensíveis
- Sanitização de dados
- Validação de tipos com TypeScript

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Autor

### Mateus Hoffman Silva

Desenvolvedor Full Stack apaixonado por criar experiências digitais únicas e memoráveis.

#### Contato

- 📧 Email: mateushoffmandev@gmail.com
- 📱 Celular: +55 19 989428951
- 💼 LinkedIn: [mateushoffman](https://www.linkedin.com/in/mateushoffman/)
- 💻 GitHub: [MateusHoffman](https://github.com/MateusHoffman)

## 🙏 Agradecimentos

Gostaria de expressar minha gratidão a todos que contribuíram para o desenvolvimento deste projeto:

- A todos os usuários que testaram e forneceram feedback valioso
- À comunidade open source por disponibilizar ferramentas incríveis
- Aos amigos e familiares que apoiaram durante o desenvolvimento
- A todos os casais que inspiram este projeto com suas histórias de amor

Este projeto é dedicado a todos os casais que buscam formas especiais de expressar seu amor e carinho.
