FROM node:18.19.0-alpine AS build-stage

# ROOT

WORKDIR /app

COPY /*.json .

COPY /*.yml .

COPY /shared ./shared

COPY /frontend ./frontend

RUN npm install

# FRONTEND

WORKDIR /app/frontend

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build-stage /app/frontend/build /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
