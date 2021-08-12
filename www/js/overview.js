let Overview = function () {
    let base_url = 'http://batshuayi.chickenkiller.com/api/';

    let init = function () {
        let data = `
            <h5>Samenvatting</h5>
            <p id="sinds"></p>
                <table class="striped centered">
                    <thead>
                        <tr>
                            <td><b>Consumptie</b></td>
                            <td><b>Zelf</b></td>
                            <td><b>Getrakteerd</b></td>
                            <td><b>Totaal</b></td>
                        </tr>
                    </thead>
                    <tbody id="samenvatting">
                    </tbody>
                </table>
                <div id="total"></div>`;
        $('#overview').html(data);
    };

    let createTable = function() {
        // Array met prijzen vullen
        let prijsArray = {};
        let user_id = window.localStorage.getItem('UserID');
        $.ajax({
            type: 'GET', crossDomain: true, cache: false,
            url: base_url + 'user_consumptions',
            data: 'id=' + user_id,
            success: function (data) {
                console.log(data);
                for (i = 0; i < data.length; i++) {
                    prijsArray[data[i].name] = data[i].price;
                }
            },
            error: function(jqXhr, textStatus, error) {
                alert("error\n" + error);
            }
        });

        // Tabel bouwen
        let userString = "id=" + window.localStorage.getItem('UserID');
        setTimeout(function() {
            $.ajax({
                type: 'GET', crossDomain: true, cache: false,
                url: base_url + 'user_consumptions',
                data: userString,
                success: function (data) {
                    // Maak dynamisch de arrays voor zelf gestreepte en getrakteerde consumpties
                    // Bij toevoeging van een nieuwe consumptie wordt deze automatisch opgenomen in de tabel
                    console.log(data);
                    let consumptionArray = {}
                    let trakteerArray = {};
                    for (const [key, value] of Object.entries(prijsArray)) {
                        consumptionArray[key] = 0;
                        trakteerArray[key] = 0;
                    }

                    // Vul de arrays met aantallen
                    for (i = 0; i < data.length; i++) {
                        prijsArray[data[i].consumption.name] = data[i].consumption.price;
                        if (data[i].traktatie) {
                            trakteerArray[data[i].consumption.name] += data[i].amount;
                        } else {
                            consumptionArray[data[i].consumption.name] += data[i].amount;
                        }
                    }

                    // Bouw de tabel en bereken totale kost
                    let rows = '';
                    let totalCost = 0;
                    for (const [key, value] of Object.entries(consumptionArray)) {
                        let total = value + trakteerArray[key];
                        rows += `
                        <tr>
                            <td><b>${key}</b></td>
                            <td>${value}</td>
                            <td>${trakteerArray[key]}</td>
                            <td>${total}</td>
                        </tr>`;

                        totalCost += (value + trakteerArray[key]) * prijsArray[key];
                    }
                    totalCost = Math.round(totalCost * 100) / 100;
                    let verschuldigd = `<p>U bent <b>€ ${totalCost}</b> verschuldigd</p>`

                    $('#samenvatting').html(rows);
                    $('#total').html(verschuldigd);
                },
                error: function(jqXhr, textStatus, error) {
                    alert("error\n" + error);
                }
            });
        }, 100)
    };
    return {
        init: init,
        createTable: createTable
    };
}();