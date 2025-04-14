FROM node:16-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY src/ ./src/

# Crear directorio de assets si no existe
RUN mkdir -p ./src/assets/

# Construir la aplicación
RUN npm run build

# Configuración para servir la aplicación
FROM nginx:alpine

# Copiar la aplicación compilada
COPY --from=0 /app/dist/vision2.5-frontend /usr/share/nginx/html

# Exponer puerto
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]