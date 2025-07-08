FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json /app/package-lock.json ./

RUN npm install --production && npm cache clean --force

USER node

CMD ["npm", "start"]