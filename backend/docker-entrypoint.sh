#!/bin/bash

# Apply migrations
cd ./app/backend
npx prisma migrate dev --name init

# Apply database constraints
source ./.env
psql 

exec "$@"