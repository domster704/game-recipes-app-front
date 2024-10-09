FROM node:22-alpine3.20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src ./src
COPY build ./build

COPY .babelrc webpack.config.js ./

RUN npm run build

FROM nginx:1.27-alpine3.20 AS nginx

COPY --from=builder /app/build /app/build
COPY nginx/front.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

RUN ["nginx", "-g", "daemon off;"]