FROM node:23.3.0

WORKDIR /app/bot
COPY package*.json /app/bot
COPY ./src /app/bot/src
RUN npm i

CMD ["npm", "run", "dev"]

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]