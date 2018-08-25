FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install eslint
RUN npm install express body-parser boom mysql2 sequelize shortid uuid

COPY ./ ./

CMD npm run start