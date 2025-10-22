FROM node:22.17.1-slim
LABEL maintainer="rishabhparihar511@gmail.com"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]