# polaroids

A photo storage system consisting of a Discord bot that automatically uploads
media to my Synology FileStation, and a website that displays this media.

## Setup

I'm not sure if anyone would actually be interested in this (this is moreso for
my own reference), but if for some reason you are, here's how you can
set polaroids up for yourself:

### Prerequisites

- Docker and Docker Compose installed on your machine.
- A Discord Developer Portal account.
- A Synology NAS with FileStation on it.

### Steps

1. Run `npm run setup` in the root directory

2. Create .env files in the root, bot, and db-api directories

   The `.env` file in the `bot` directory should look like this:

   ```sh
   # From the Discord Developer Portal
   TOKEN=XXX
   CLIENT_ID=XXX
   GUILD_ID=XXX

   # Your FileStation details
   PS_API_URL=XXX
   PS_API_USERNAME=XXX
   PS_API_PASSWORD=XXX
   ```

   Your FileStation API url should be prefixed with "/photo/webapi". Make sure
   that the user associated with your login details has admin permissions.

   The `.env` file in the `db-api` folder should look like this:

   ```sh
   # The port for the API
   PORT=8080

   # Make sure that these variables match the .env file in the root folder.
   POSTGRES_USER=XXXX
   POSTGRES_PASSWORD=XXXX
   POSTGRES_DB=XXXX

   DATABASE_URL=XXXX
   ```

   The `.env` file in the root folder should look like this:

   ```sh
   POSTGRES_USER=XXX
   POSTGRES_PASSWORD=XXX
   POSTGRES_DB=XXX
   ```

   These variables are used in `docker-compose.yml` to initialize the Postgres database.

## Starting Services

```bash
docker-compose build
docker-compose up
```

Refer to the docker compose file for port information.

## Folder structure

There are three main directories: the `bot` directory, the `db-api` directory, and the
`shared` directory.

- `bot` contains everything relevant to the polaroids Discord bot.
- `db-api` contains everything relevant to the API that interacts with the
  Postgres database, which stores data about the bot's settings and the images
  it archives.
- `shared` contains error codes and response interfaces that are shared between
  the database API and the Discord bot.

### Adding events

To add a new bot event, go to `bot/src/events` and create a new file. Each event
must implement the `EventData` interface, and must be exported using a default
export. Otherwise, the `registerEvents` function will not be able to
find/register the event.
