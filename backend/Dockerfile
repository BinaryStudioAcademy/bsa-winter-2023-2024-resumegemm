FROM node:18.19.0-alpine

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont

# ROOT

WORKDIR /app

COPY /*.json .

COPY /*.yml .

COPY /shared ./shared

COPY /backend ./backend

RUN npm install

# BACKEND

WORKDIR /app/backend

RUN npm install

RUN npm run build

#RUN npm run migrate:dev
#
#RUN npm run seed:run

CMD ["node", "build/src/index.js"]
