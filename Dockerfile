FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --registry=https://registry.npmmirror.com

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

EXPOSE 3099

CMD ["node", "dist/http-server.js"]