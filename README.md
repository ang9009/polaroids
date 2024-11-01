# polaroids

A photo storage system consisting of a Discord bot that automatically uploads
media to my Synology PhotoStation6, and a website that displays this media.

## Setup

I'm not sure if anyone would actually be interested in this (this is moreso for
my own reference), but if for some reason you are, here's how you can
set polaroids up for yourself:

### Prerequisites

- Docker and Docker Compose installed on your machine.
- A Discord Developer Portal account.
- A Synology PhotoStation6.

### Environment Configuration

1. **Create .env files in the root and bot directories**

   The `.env` file in the `bot` directory should look like this:

   ```sh
   # From the Discord Developer Portal
   TOKEN=XXX
   CLIENT_ID=XXX
   GUILD_ID=XXX

   # Your PhotoStation6 details
   PS_API_URL=XXX
   PS_API_USERNAME=XXX
   PS_API_PASSWORD=XXX
   ```

   Your PhotoStation6 API url should be prefixed with "/photo/webapi". Make sure
   that the user associated with your login details has admin permissions.

   The `.env` file in the `db-api` folder should look like this:

   ```sh
   # Make sure that these variables match the .env file in the root folder.
   POSTGRES_USER=XXX
   POSTGRES_PASSWORD=XXX
   POSTGRES_DB=XXX

   DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}"
   ```

   The `.env` file in the root folder should look like this:

   ```sh
   POSTGRES_USER=XXX
   POSTGRES_PASSWORD=XXX
   POSTGRES_DB=XXX
   ```

   These variables are used in `docker-compose.yml` to initialize the Postgres database.

### Starting Services

```bash
docker-compose build
docker-compose up
```

Refer to the docker compose file for port information.

## Acknowledgments

- Huge thanks to JBowen, who wrote this very nice [unofficial API
  reference](https://blog.jbowen.dev/synology/photostation/api/) for the
  PhotoStation6.
