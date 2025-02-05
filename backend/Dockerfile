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

# Install Postgres CLI to run .sql files
RUN apt-get update
RUN apt-get install -y postgresql

# Since there is a circular dependency between shared and backend, run npm i
# again in shared to set up workspaces
WORKDIR /app/shared
RUN npm i

EXPOSE 8080

WORKDIR /app/backend
CMD ["npm", "run", "dev"]

# Apply migrations after container starts
COPY ./backend/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]