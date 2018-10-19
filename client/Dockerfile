FROM node:alpine

WORKDIR /app

COPY ./ ./

RUN npm install --production
RUN npx nuxt build

CMD npm start