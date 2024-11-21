# Utiliser une image Node.js comme base
FROM node:16

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port de la Gateway
EXPOSE 3000

# Lancer le serveur
CMD ["node", "server.js"]
