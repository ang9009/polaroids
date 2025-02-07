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

# Unfortunately the migration command/constraints will run on every startup, but
# this cannot be written in the image build step, since the database container
# has to be up for for this to work
WORKDIR /app/backend
CMD /bin/bash && \
    # Run migrations
    npx prisma migrate dev --name init && \
    # Load env variables from file and add constraints
    export $(grep -E 'POSTGRES_USER|POSTGRES_DB|POSTGRES_PASSWORD' .env | xargs) && \
    PGPASSWORD="$POSTGRES_PASSWORD" psql -h db -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /app/backend/prisma/constraints.sql && \
    npm run dev

