FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# src/generated is excluded from the build context: the client is generated in the image.
# This URL only loads the Prisma config. Compose replaces it at startup.
ENV DATABASE_URL="postgresql://user:password@postgres:5432/mianatra_db"

RUN npx prisma generate --config prisma7.config.ts && npm run build

EXPOSE 3000

CMD ["node", "dist/main"]