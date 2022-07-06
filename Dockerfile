FROM node:lts-alpine AS build

WORKDIR /src
COPY ./package* ./
RUN npm ci

COPY . .
RUN npm run lint
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /src/dist /usr/share/nginx/html
