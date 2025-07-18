FROM node:22.15.0

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "preview"]