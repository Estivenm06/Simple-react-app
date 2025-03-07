FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 3000
EXPOSE 8000

RUN npm run build

CMD ["npm", "run", "preview"]