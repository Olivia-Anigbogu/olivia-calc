# ── Stage 1: CI ──────────────────────────────────────────────
FROM node:22-alpine AS ci

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY calculator/assets/js/calculator.js  calculator/assets/js/calculator.js
COPY eslint.config.cjs         eslint.config.cjs
COPY tests/                    tests/

RUN npm run lint
RUN npm test

# ── Stage 2: Serve ───────────────────────────────────────────
FROM nginx:alpine AS serve

RUN rm -rf /usr/share/nginx/html/*

# Homepage (root)
COPY index.html                          /usr/share/nginx/html/

# Calculator (subfolder)
COPY calculator/index.html               /usr/share/nginx/html/calculator/index.html
COPY calculator/assets/css/calculator.css /usr/share/nginx/html/calculator/assets/css/
COPY --from=ci /app/calculator/assets/js/calculator.js  /usr/share/nginx/html/calculator/assets/js/

EXPOSE 80
