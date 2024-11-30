# polaroids

A photo organization system consisting of a Discord bot that automatically uploads
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

   Your FileStation API url should be prefixed with "/webapi". Make sure
   that the user associated with your login details has admin permissions.
   More information about the FileStation API can be found (here)[https://global.download.synology.com/download/Document/Software/DeveloperGuide/Package/FileStation/All/enu/Synology_File_Station_API_Guide.pdf].

   The `.env` file in the `db-api` folder should look like this:

   ```sh
   # The port for the API
   PORT=XXXX

   # Make sure that these variables match the .env file in the root folder.
   POSTGRES_USER=XXXX
   POSTGRES_PASSWORD=XXXX
   POSTGRES_DB=XXXX

   DATABASE_URL=XXXX
   ```

   The `.env` file in the root folder should look like this:

   ```sh
   POSTGRES_USER=XXXX
   POSTGRES_PASSWORD=XXXX
   POSTGRES_DB=XXXX
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

### Adding events and commands

To add a new bot event, go to `bot/src/features`, select the associated
feature, navigate to its `events` folder and create a new file. Each event
must implement the `EventData` interface, and must be exported using a default
export. Otherwise, the `registerEvents` function will not be able to
find/register the event.

Adding a command is similar: there is a `commands` folder under each feature
folder. Create a new file in that folder, and in it, create a object that
implements the `CommandData` interface, then export it using a default export.
Otherwise, the `deploycommands` function will not be able to find/register the
command.

Note that errors thrown by events or commands are caught and logged by the bot
in `handleInteractions`, so throwing errors is fine.

Once you've added/changed a command, run the following while inside of the `bot`
folder to update the bot:

```
npm run deploycommands
```

## Types overview

### Result

The `Result` type used in the `bot` folder is primarily used for API calls. This
is especially useful when you need to return a warning message based on some API
exception, which can't really be classified as an error.
