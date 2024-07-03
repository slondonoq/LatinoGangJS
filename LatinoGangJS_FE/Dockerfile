# Etapa 1: Construir la aplicación React
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
COPY .env.production ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Configurar NGINX y servir la aplicación
FROM nginx:1.21.0-alpine

WORKDIR /app

COPY --from=build /app/dist /app

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 5001