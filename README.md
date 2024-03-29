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

De database is gemaakt in een Laravel applicatie. Hierin zijn alle API's opgesteld die 
aangesproken worden door de applicatie.
Er zijn vier tabellen die de applicatie gebruikt: User, UserConsumption, Consumption en Saldo. Saldo heeft betrekking op de traktaties die gemaakt kunnen worden, en staat onafhankelijk van UserConsumption. Dit betekent dat wanneer een gebruiker een saldo heeft staan, het geselecteerde aantal eerst hiervan wordt afgetrokken, en slechts het overgebleven deel in de tabel UserConsumption terecht komt en dus betaald moet worden..
![Datamodel](https://user-images.githubusercontent.com/74854941/129409385-9adf2bff-24a2-41de-91b1-bde9d189cf18.PNG)

De tabel Result wordt gebruikt om resultaten vanuit een elektronica projectje door te sturen naar dezelfde database. De resultaten hiervan kunnen via een RFID-tag gelinkt worden aan de gebruikers. Hiervan is echter nog geen interface gemaakt in de applicatie.

## Hosting

API wordt gehost op een Raspberry Pi die thuis staat aangesloten op het netwerk. De database wordt hierop bijgehouden, en de Laravel-applicatie zorgt ervoor dat deze toegankelijk is via een API. Om dit uit te werken heb ik gebruik gemaakt van de opgedane kennis bij het vak Linux. Daarnaast heb ik via port forwardng de API extern beschikbaar gemaakt.

# Screenshots

## Login scherm
![Login](https://user-images.githubusercontent.com/74854941/129408705-2a1ecfc0-a0ef-4dc3-9bad-d02852176a16.PNG)

## Consumpties
![Consumpties](https://user-images.githubusercontent.com/74854941/129408802-b4c391ce-882f-463c-a509-7ff853fcdddc.PNG)
![Consumptie](https://user-images.githubusercontent.com/74854941/129408835-98443320-5b6f-479e-a835-bf74495ce9fe.PNG)
![Trakteren](https://user-images.githubusercontent.com/74854941/129408864-7fb27b49-5909-4841-aff8-723d073d6931.PNG)

## Overzicht
![Overzicht](https://user-images.githubusercontent.com/74854941/129408870-656a24ea-cba5-4378-84b1-6662e01c9cb5.PNG)

## Highscores
![Highscores](https://user-images.githubusercontent.com/74854941/129408886-f4277e67-f777-47d5-8b77-ecd4bae381c6.PNG)
