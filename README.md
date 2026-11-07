# Mianatra en ligne API

API HTTP de la plateforme Mianatra en ligne. Elle gère l'inscription et la connexion des utilisateurs, et expose une documentation Swagger.

## Technologies

- NestJS 11 et TypeScript
- PostgreSQL avec Prisma 7
- JWT et bcrypt pour l'authentification
- Swagger
- Docker et Docker Compose

## Structure

```text
src/
  common/          filtres, intercepteur et Swagger
  modules/auth/    inscription et connexion
  modules/users/   utilisateurs
  prisma/          accès à la base
prisma/            schéma et migrations
prisma7.config.ts  configuration Prisma
```

## Prérequis

- Node.js 22 ou plus récent, et npm
- PostgreSQL 17, en local ou via Docker
- Un fichier `.env` copié depuis `.env.example`

Variables utiles : `PORT`, `JWT_SECRET`, `DATABASE_URL`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`.

## Lancer l'application

En local, avec PostgreSQL déjà démarré :

```bash
npm install
npx prisma generate --config prisma7.config.ts
npx prisma migrate dev --config prisma7.config.ts
npm run start:dev
```

L'API écoute sur `http://localhost:3000/api`. La documentation Swagger est sur `http://localhost:3000/api/docs`.

Avec Docker, construire l'image puis démarrer les services. `docker compose up -d` ne construit pas l'image tout seul.

```bash
docker build -t mianatra-api:latest .
docker compose up -d
```

## Prisma

Le schéma est dans `prisma/schema.prisma`. Les commandes passent par `prisma7.config.ts`.

Générer le client :

```bash
npx prisma generate --config prisma7.config.ts
```

Créer et appliquer une migration en développement :

```bash
npx prisma migrate dev --config prisma7.config.ts --name init
```

Appliquer les migrations déjà présentes :

```bash
npx prisma migrate deploy --config prisma7.config.ts
```

## Auteur

Antoni NDREMANJARY
