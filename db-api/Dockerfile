FROM node:18.20.4

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
RUN npx prisma generate
EXPOSE 8080

CMD ["npm", "run", "dev"]

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]