FROM node:18 as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
EXPOSE 80