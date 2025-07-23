# Use esse para build local
# FROM node:22.15.0

# WORKDIR /app

# COPY package.json package-lock.json* ./
# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 3002

# CMD ["npm", "run", "preview"]

#Use esse para deploy
FROM node:22.15.0 AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
USER root
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
