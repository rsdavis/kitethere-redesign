FROM node:alpine

WORKDIR /app

COPY ./ ./

RUN npm install --production
RUN npx nuxt build

EXPOSE 3000

CMD npm start