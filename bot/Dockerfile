FROM node:23.3.0

# Copy dependencies from other packages
WORKDIR /app/backend/prisma/generated/zod
COPY ./backend/prisma/generated/zod/index.ts /app/backend/prisma/generated/zod
COPY ./backend/package.json /app/backend
WORKDIR /app/backend
RUN npm i
WORKDIR /app/shared
COPY ./shared /app/shared
RUN npm i

# Copy src folder 
WORKDIR /app/bot
COPY ./bot/package*.json /app/bot
COPY ./bot/src /app/bot/src
# Install packages
RUN npm i

CMD ["npm", "run", "dev"]