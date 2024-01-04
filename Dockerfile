# Etapa de construcción
FROM node:14-alpine AS builder

# Establecemos el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copiamos el archivo package.json y package-lock.json a /usr/src/app
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el código fuente de la aplicación al directorio de trabajo
COPY . .

# Etapa de producción
FROM node:14-alpine

# Establecemos el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copiamos los archivos construidos de la etapa anterior
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/. .

# Instalamos netcat (utilizando apk)
RUN apk update && apk add netcat-openbsd

# Exponemos el puerto 3000, que es el puerto en el que se ejecuta tu aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]

