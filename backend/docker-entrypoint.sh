#!/bin/bash

# Apply migrations
npx prisma migrate dev --name init

exec "$@"