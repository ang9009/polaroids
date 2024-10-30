FROM node:18.20.4

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]