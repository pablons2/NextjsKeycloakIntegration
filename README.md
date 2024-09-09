## Next.js Keycloak Integration ##

#Este projeto é uma aplicação Next.js integrada com Keycloak para autenticação via NextAuth. A configuração utiliza Docker para o Keycloak e a aplicação Next.js para simplificar o processo de desenvolvimento.#

* Tecnologias Utilizadas
Next.js 14.2.x
NextAuth para autenticação
Keycloak para OpenID Connect
Docker para containerização
TypeScript
Pré-requisitos
Docker e Docker Compose instalados
Node.js v20+ e Yarn
Configuração do Keycloak com Docker
Crie um arquivo docker-compose.yml na raiz do projeto:

``` 

version: "3.8"
services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=admin
    ports:
      - "8080:8080"
    command: start-dev

``` 
Execute o comando para iniciar o Keycloak:

``` 
docker-compose up -d

``` 

Acesse o Keycloak na URL http://localhost:8080 e faça login com as credenciais admin/admin.

Crie um novo realm chamado nextjs-realm.

Crie um client no realm com os seguintes detalhes:

Client ID: nextjs-realm-client
Access Type: confidential
Valid Redirect URIs: http://localhost:3000/*
Root URL: http://localhost:3000
Gere um Client Secret na aba Credentials e salve-o para as variáveis de ambiente.

##Configuração do Next.js##
#Variáveis de Ambiente#
Crie um arquivo .env.local na raiz do projeto e adicione as seguintes variáveis:

``` 

AUTH_KEYCLOAK_ID=nextjs-realm-client
AUTH_KEYCLOAK_SECRET=<client-secret>
AUTH_KEYCLOAK_ISSUER=http://localhost:8080/realms/nextjs-realm
```

Estrutura de Arquivos
src/app/api/auth/[...nextauth]/route.ts:

```

import { handlers } from "@/auth";

export const { GET, POST } = handlers;
auth.ts:
/code:
import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { handlers } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID!,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
    }),
  ],
});

``` 
Aqui está um README resumido para o seu projeto baseado nas instruções fornecidas. Ele inclui a configuração do ambiente com Docker, variáveis de ambiente e o uso do Keycloak e NextAuth.

Next.js Keycloak Integration
Este projeto é uma aplicação Next.js integrada com Keycloak para autenticação via NextAuth. A configuração utiliza Docker para o Keycloak e a aplicação Next.js para simplificar o processo de desenvolvimento.

Tecnologias Utilizadas
Next.js 14.2.x
NextAuth para autenticação
Keycloak para OpenID Connect
Docker para containerização
TypeScript
Pré-requisitos
Docker e Docker Compose instalados
Node.js v20+ e Yarn
Configuração do Keycloak com Docker
Crie um arquivo docker-compose.yml na raiz do projeto:
yaml
Copiar código
version: "3.8"
services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=admin
    ports:
      - "8080:8080"
    command: start-dev
Execute o comando para iniciar o Keycloak:
bash
Copiar código
docker-compose up -d
Acesse o Keycloak na URL http://localhost:8080 e faça login com as credenciais admin/admin.

Crie um novo realm chamado nextjs-realm.

Crie um client no realm com os seguintes detalhes:

Client ID: nextjs-realm-client
Access Type: confidential
Valid Redirect URIs: http://localhost:3000/*
Root URL: http://localhost:3000
Gere um Client Secret na aba Credentials e salve-o para as variáveis de ambiente.

Configuração do Next.js
Variáveis de Ambiente
Crie um arquivo .env.local na raiz do projeto e adicione as seguintes variáveis:

env
Copiar código
AUTH_KEYCLOAK_ID=nextjs-realm-client
AUTH_KEYCLOAK_SECRET=<client-secret>
AUTH_KEYCLOAK_ISSUER=http://localhost:8080/realms/nextjs-realm
Dependências
Instale as dependências do projeto com Yarn:

bash
Copiar código
yarn install
Estrutura de Arquivos
src/app/api/auth/[...nextauth]/route.ts:
ts
Copiar código
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
auth.ts:
ts
Copiar código
import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { handlers } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID!,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
    }),
  ],
});

#Executando o Projeto#
Inicie o servidor Next.js em modo de desenvolvimento:
bash
Copiar código
yarn dev
Acesse a aplicação em http://localhost:3000.
Autenticação
Quando o usuário acessar uma rota protegida, ele será redirecionado para o login do Keycloak. Após a autenticação, será redirecionado de volta à aplicação.

Configuração com Docker para Produção
Para rodar em ambiente de produção com Docker, você pode utilizar um Dockerfile para a aplicação Next.js. Aqui está um exemplo básico:

Crie um Dockerfile:
/code:
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["yarn", "start"]

Para buildar e rodar a aplicação no Docker, execute os comandos:
/code:

docker build -t nextjs-keycloak .
docker run -p 3000:3000 nextjs-keycloak

### Contribuição ###
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou um pull request.


