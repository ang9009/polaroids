FROM node:18.20.4

WORKDIR /app/backend
COPY package*.json /app/backend
RUN npm i
COPY . /app/backend
RUN npx prisma generate

# Install Chrome
# (https://stackoverflow.com/questions/78466171/how-to-run-puppeteer-and-node-js-inside-a-docker-container)
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

EXPOSE 8080

CMD ["npm", "run", "dev"]

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]