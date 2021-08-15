let Info = function () {
    let init = function () {
        let data = `
            <b>Naam: </b>Stef Vanbroekhoven<br>
            <b>E-mail: </b><a href="mailto:r0630975@student.thomasmore.be">r0630975@student.thomasmore.be</a><br>
            <b>Telefoon: </b><a href="tel:+32497384416">0497384416</a><br>
            <div>
                <h4><i class="material-icons">flag</i> Algemene info</h4>
                <p>Met deze applicatie kan leiding van scouts Sint-Pieter Mol de <b>consumpties</b> die ze tijdens het jaar consumeren <b>digitaal registreren</b>.
                    Naast persoonlijke consumpties registreren, kan men met deze applicatie ook andere leiding <b>trakteren</b>. Hierbij wordt dan een
                    saldo opgebouwd waar de getrakteerde gratis van kan afnemen. Daarnaast heeft elke leider een <b>persoonlijk overzicht</b> met alle
                    consumpties die hij door het jaar heeft aangeduid, met daarbij het te betalen bedrag. Als laatste kunnen <b>highscores</b> geraadpleegd
                    worden tussen de leiding. Deze zijn onderverdeeld op persoonlijk niveau, per tak en per jaargroep.</p>
                <h4><i class="material-icons">flag</i> Specificaties</h4>
                    <ul> 
                        <li><b>Front-end</b>
                            <ul>
                                <li>De front-end maakt gebruik van materialize css voor de opmaak.</li>
                            </ul>
                        </li>
                        <li><b>Functionaliteit</b>
                            <ul>
                                <li>De functionaliteit van deze applcatie is afhankelijk van een database die thuis op een Raspberry Pi 
                                gehost wordt. Met behulp van AJAX functies wordt deze aangesproken wanneer een actie wordt ingezet door de 
                                gebruiker. Local storage wordt gebruikt om gegevens van de ingelogde gebruiker en de gekozen consumptie bij 
                                te houden.</li>
                            </ul>
                        </li>
                        <li><b>Back-end</b>
                            <ul>
                                <li>De database is gemaakt in een laravel applicatie. Hierin zijn alle API's opgesteld die 
                                aangesproken worden door de applicatie.<br>
                                Er zijn vier tabellen die de applicatie gebruikt (zie foto). <br><img src="img/screenshots/Datamodel.PNG" alt="datamodel" width="300">
                                De laravel applicatie wordt ook gebruikt om het app-debug.apk bestand aan te bieden.</li>
                            </ul>
                        </li>
                    </ul>
                    
            </div>
        `;
        $('#info').html(data);
    };
    return {
        init: init
    };
}();

