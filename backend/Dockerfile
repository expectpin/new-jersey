# backend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

# Instala as dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./
RUN npm install

# Copia o resto do código da aplicação
COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]