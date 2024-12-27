FROM node:18.20.4

WORKDIR /app/backend
COPY package*.json /app/backend
RUN npm i
COPY . /app/backend
RUN npx prisma generate
EXPOSE 8080

CMD ["npm", "run", "dev"]

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]