# frontend/Dockerfile

# 1. Stage: build
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# 2. Stage: nginx static serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
