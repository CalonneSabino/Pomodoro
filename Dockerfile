# Etapa 1: build
FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_OPTIONS="--openssl-legacy-provider"
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir com Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
