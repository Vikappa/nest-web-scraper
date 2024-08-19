# Nest Web Scraper
<p align="center">
  <img src="./media/webscraperlogo.png" width="200" alt="Nest Logo" />
</p>
  <p align="center">La mia prima Nest web app che legge e analizza i contenuti delle pagine</p>
    <p align="center">

<div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px; gap: 2px;">
  <img src="https://img.shields.io/badge/NestJS-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/API-REST-blue?style=for-the-badge" alt="API REST" />
<img src="https://img.shields.io/badge/Docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

## Descrizione

<p>NestWebScraper è il mio primo progetto Nest Js. Ho realizzato un singolo endpoint che riceve un url di una pagina web da analizzare e risponde con la conta di parole più usate, numero parole totali, ecc</p>

## Uso

<p>Inviare una FETCH POST con payload all'url in cui è hostata la web app con la chiave "urlToScrape"</p>


<p>Inviare una FETCH POST con payload all'url in cui è hostata la web app con la chiave "urlToScrape" (puoi usare tool come Postman o Thunder Client) inviando un oggetto con l'url di cui vuoi effettuare lo scraping.</p>
<p>Esempio</p>

```bash
{
    "urlToScrape": "https://it.wikipedia.org/wiki/Cyberpunk_2077"
}
```
<p>Per favore, non usare Url di siti come youtube o altre app con sistemi anti scraping per non mandare K.O. il sistema!</p>


### Script disponibili

Puoi avviare il progetto usando gli script disponibili nel file `package.json` oppure installando la `Dockerimage` presente nella repo. 

## Installazione tramite docker
```bash
$ docker build -t nest-web-scraper .
$ docker run -p 3000:3000 nest-web-scraper
```

## Installazione tramite npm
```bash
$ nest run build
$ nest start
```

## Test

Tramite linea di comando, puoi eseguire i test con il seguente comando:
```bash
$ npm test
```

## Ester egg:

<p>Se mandi una richiesta GET a localhost:3000 ti risponde con la playlist che ho ascoltato mentre programmavo questo progetto</p>

## Stay in touch

- Author - <a href="https://vincenzocostantinicvnext.vercel.app/" target="_blank">Vincenzo Costantini</a>
