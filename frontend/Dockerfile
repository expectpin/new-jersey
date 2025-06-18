# frontend/Dockerfile

# Estágio 1: Compilação (Build)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Produção (Production)
FROM nginx:alpine
# Copia os ficheiros compilados do novo outputPath para o diretório do Nginx
COPY --from=build /app/dist/frontend /usr/share/nginx/html
# Copia a configuração do Nginx para lidar com o roteamento do Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
