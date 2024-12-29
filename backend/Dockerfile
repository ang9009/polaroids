FROM node:18.20.4

# Copy dependencies from shared
WORKDIR /app/shared
COPY ./shared /app/shared
RUN npm i

WORKDIR /app/backend
COPY ./backend/package*.json /app/backend
COPY ./backend/src /app/backend/src
COPY ./backend/prisma /app/backend/prisma
RUN npm i
RUN npx prisma generate

# Since there is a circular dependency, run npm i again in shared to set up workspaces
WORKDIR /app/shared
RUN npm i

WORKDIR /
# Install Chrome (for puppeteer)
# (https://stackoverflow.com/questions/78466171/how-to-run-puppeteer-and-node-js-inside-a-docker-container)
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

EXPOSE 8080

CMD ["npm", "run", "dev"]

# Apply migrations after container starts
COPY ./backend/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]