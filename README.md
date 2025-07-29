# Sistema de Autenticação JWT

Um sistema simples de autenticação e autorização construído com NestJS, JWT e decorators personalizados. O projeto foi desenvolvido com foco em segurança e não utiliza banco de dados para manter a simplicidade.

## 🚀 Características

- ✅ Autenticação JWT
- ✅ Autorização baseada em roles
- ✅ Guards personalizados
- ✅ Decorators para controle de acesso
- ✅ Validação de dados com class-validator
- ✅ Documentação automática com Swagger
- ✅ Testes unitários e e2e

## 📁 Estrutura do Projeto

```
src/
├── auth/                    # Módulo de autenticação
│   ├── auth.controller.ts   # Controller de autenticação
│   ├── auth.service.ts      # Serviços de autenticação
│   ├── auth.guard.ts        # Guard JWT
│   ├── auth.module.ts       # Módulo principal
│   └── auth.dto.ts          # DTOs de validação
├── decorators/              # Decorators personalizados
│   └── roles.decorator.ts   # Decorator para controle de roles
├── users/                   # Módulo de usuários (service apenas)
│   ├── users.service.ts     # Serviços de usuários com dados de teste
│   └── users.module.ts      # Módulo de usuários
├── test/                    # Testes e2e
├── app.module.ts           # Módulo raiz
└── main.ts                 # Ponto de entrada
```

## 🛠️ Tecnologias Utilizadas

- **NestJS** - Framework Node.js
- **JWT** - Autenticação baseada em tokens
- **Class Validator** - Validação de dados
- **Class Transformer** - Transformação de objetos
- **Swagger** - Documentação da API
- **Jest** - Testes unitários
- **TypeScript** - Tipagem estática

## 📋 Pré-requisitos

- Node.js (versão 22 ou superior)
- npm ou pnpm

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone git@github.com:Natan-Barbosa/Autenticacao-JWT-TypeScript.git
cd Autenticacao-JWT-TypeScript
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas configurações:

```env
JWT_SECRET=seu_jwt_secret_aqui
```

## 🚀 Executando a Aplicação

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

### Debug

```bash
npm run start:debug
```

## 📖 Documentação da API

A documentação completa da API está disponível através do Swagger em:

```
http://localhost:3000/api
```

## 🧪 Testes

### Executar todos os testes

```bash
npm run test
```

### Testes em modo watch

```bash
npm run test:watch
```

### Testes com coverage

```bash
npm run test:cov
```

### Testes e2e

```bash
npm run test:e2e
```

## 📝 Endpoints Principais

### Autenticação

- `POST /auth/login` - Realizar login
- `GET /auth/private/profile` - Obter perfil do usuário autenticado (requer autenticação)
- `GET /auth/private/admin` - Rota exclusiva para administradores (requer role ADMIN)
- `GET /auth/private/user` - Rota para usuários e administradores (requer role USER ou ADMIN)
- `GET /auth/public/profile` - Rota pública (sem autenticação)

## 👥 Usuários de Teste

O projeto inclui dois usuários pré-configurados para teste:

### Admin

- **Email**: `teste1@gmail.com`
- **Senha**: `12345678`
- **Role**: ADMIN

### Usuário

- **Email**: `teste2@gmail.com`
- **Senha**: `87654321`
- **Role**: USER

## 🔒 Sistema de Autorização

### Roles Disponíveis

- `ADMIN` - Acesso total ao sistema
- `USER` - Acesso limitado aos recursos

### Exemplo de uso do decorator @Roles:

```typescript
@Get('/admin-only')
@Roles('ADMIN')
@UseGuards(AuthGuard, RolesGuard)
adminOnlyEndpoint() {
  return { message: 'Apenas administradores podem acessar' };
}
```

## 🛡️ Segurança

- Tokens JWT com expiração configurável
- Validação rigorosa de dados de entrada
- Guards personalizados para proteção de rotas
- Autorização baseada em roles

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.
