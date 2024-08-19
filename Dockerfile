FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

#Copia il resto del codice sorgente nell'immagine
COPY . .

RUN npm run test
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app

##Copia solo le dipendenze di produzione
COPY --from=build /app/package*.json ./
RUN npm install --production

##Copia il codice compilato dalla fase di build
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
