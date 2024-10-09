FROM node:22-alpine3.20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY build/ build/
COPY .babelrc webpack.config.js ./
COPY src/ src/

RUN npm run build

FROM nginx:1.27-alpine3.20 AS nginx

COPY --from=builder /app/build /app/build
COPY nginx/front.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
