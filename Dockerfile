# Usa Node.js 16 como imagen base
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de tu proyecto
RUN npm install

# Copia el resto de tu código fuente al contenedor
COPY . .

# Expone el puerto en el que tu aplicación escucha (si aplica)
EXPOSE 5000

# Define el comando para ejecutar tu aplicación
CMD ["node", "server.js"]
