FROM node:12.3.1-alpine

WORKDIR /app

COPY . .

RUN yarn --production && yarn cache clean

CMD ["node", "index"]
