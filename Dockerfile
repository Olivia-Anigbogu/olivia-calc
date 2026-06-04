# ── Stage 1: CI ──────────────────────────────────────────────
FROM node:22-alpine AS ci

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY assets/js/calculator.js  assets/js/calculator.js
COPY eslint.config.cjs         eslint.config.cjs
COPY tests/                    tests/

RUN npm run lint
RUN npm test

# ── Stage 2: Serve ───────────────────────────────────────────
FROM nginx:alpine AS serve

RUN rm -rf /usr/share/nginx/html/*

COPY index.html                          /usr/share/nginx/html/
COPY assets/css/calculator.css           /usr/share/nginx/html/assets/css/
COPY --from=ci /app/assets/js/calculator.js  /usr/share/nginx/html/assets/js/

EXPOSE 80