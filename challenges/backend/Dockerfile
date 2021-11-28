FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm test

RUN npm run build

CMD ["sh","-c","NODE_ENV=production BASE_URL=https://api-core-dev.caronsale.de/api/v1 node dist/main.js"]