# 2020-2021-2oho-cordova-VanbroekhovenStef

Met deze applicatie kan leiding van scouts Sint-Pieter Mol de consumpties die ze tijdens het jaar consumeren digitaal registreren.
Naast persoonlijke consumpties registreren, kan men met deze applicatie ook andere leiding trakteren. Hierbij wordt dan een
saldo opgebouwd waar de getrakteerde gratis van kan afnemen. Daarnaast heeft elke leider een persoonlijk overzicht met alle
consumpties die hij door het jaar heeft aangeduid, met daarbij het te betalen bedrag. Als laatste kunnen highscores geraadpleegd
worden tussen de leiding. Deze zijn onderverdeeld op persoonlijk niveau, per tak en per jaargroep.

# Specificaties

## Front-end

De front-end maakt gebruik van materialize css voor de opmaak.

## Functionaliteit

De functionaliteit van deze applcatie is afhankelijk van een database die thuis op een Raspberry Pi 
gehost wordt. Met behulp van AJAX functies wordt deze aangesproken wanneer een actie wordt ingezet door de 
gebruiker. Local storage wordt gebruikt om gegevens van de ingelogde gebruiker en de gekozen consumptie bij 
te houden.

## Back-end

De database is gemaakt in een laravel applicatie. Hierin zijn alle API's opgesteld die 
aangesproken worden door de applicatie.
Er zijn vier tabellen die de applicatie gebruikt (zie foto). De tabel Result wordt gebruikt om 
resultaten vanuit een elektronica projectje door te sturen naar dezelfde database (zie filmpje). Hiervan 
is echter nog geen interface gemaakt in de applicatie.
De laravel applicatie wordt ook gebruikt om het app-debug.apk bestand aan te bieden.


![](www/img/screenshots/login.png)
