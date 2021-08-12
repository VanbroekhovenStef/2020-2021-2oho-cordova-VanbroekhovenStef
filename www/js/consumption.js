let Consumption = function () {
    let base_url = 'http://batshuayi.chickenkiller.com/api/';

    let init = function () {
        let data = `
            <h5 id="naamConsumptie"></h5>
            <label for="aantal">Aantal:</label>
            <input type="number" name="aantal" id="aantal" value="1">
            <br><br>
            <label for="trakteren">
                <input type="checkbox" name="trakteren" id="trakteren" class="filled-in"/>
                <span>Trakteren</span>
            </label>
            <br><br>
            <div id="select"></div>
            <br><br>
            <a class="waves-effect waves-light btn" data-role="button" id="addConsumption" data-theme="b">Bevestigen</a>
        `;
        $('#consumption').html(data);

        $(document).on('click', '#addConsumption', function() {
            Consumption.addConsumption();
            $('#tabConsumption').hide();
            $('#tabConsumptions').show();
            setTimeout(function() {
                Consumptions.calculateSaldo();
            }, 500);
        });

        $('#trakteren').click(function() {
            if ($(this).prop('checked')) {
                $.getJSON(base_url + 'all_users', function (data) {
                    $(document).ready(function() {
                        $('select').formSelect();
                    });
                    let select = `
                    <div class="input-field">
                        <select class="getrakteerde" name="getrakteerde_id" id="getrakteerde_id">`;

                    for (i = 0; i < data.length; i++) {
                        if (data[i].id != window.localStorage.getItem("UserID")) {
                            select += `
                            <option value="${data[i].id}">${data[i].name}</option>`;
                        }
                    }
                    select += `
                        </select>
                        <label for="persoon">Kies een persoon</label>
                    </div>`;

                    $('#select').html(select);
                    $('#select').show();
                });
            } else {
                $('#select').hide();
            }
        });
    };

    let fill = function (name) {
        $('#naamConsumptie').text(name);
    }

    // Functie om bij het saldo van de getrakteerde op te tellen
    // Het huidige saldo wordt eerst opgehaald, en daarna opgeteld met getrakteerde amount
    // Daarna wordt het nieuwe saldo verstuurd naar de database
    let updateTraktatie = function(getrakteerde_id, consumption_id, consumption_name, amount) {
        let getrakteerde = 'user=' + getrakteerde_id;
        setTimeout(function() {
            $.ajax({
                type: 'GET', crossDomain: true, cache: false,
                url: base_url + 'user_saldos',
                data: getrakteerde,
                dataType: 'json',
                success: function (data) {
                    let saldoGetrakteerdeArray = {};
                    for (i = 0; i < data.length; i++) {
                        saldoGetrakteerdeArray[data[i].consumption.name] = data[i].amount;
                    }

                    let saldoGetrakteerdeAmount = saldoGetrakteerdeArray[consumption_name] ? saldoGetrakteerdeArray[consumption_name] : 0;
                    amount = parseInt(amount) + parseInt(saldoGetrakteerdeAmount);

                    let getrakteerdeString = 'user=' + getrakteerde_id + '&consumption=' + consumption_id + '&amount=' + amount;
                    setTimeout(function() {
                        $.ajax({
                            type:'POST', crossDomain: true, cache: false,
                            url: base_url + 'saldos',
                            data: getrakteerdeString,
                            success: function(data) {
                                console.log(data);
                            },
                            error: function(jqXhr, textStatus, error) {
                                alert("error\n" + error);
                            }
                        });
                    }, 100);

                },
                error: function(jqXhr, textStatus, error) {
                    alert("error\n" + error);
                }
            });
        }, 100);
    }

    let addConsumption = function () {
        let user_id = window.localStorage.getItem('UserID');
        let consumption_id = window.localStorage.getItem('consumption_id');
        let consumption_name = window.localStorage.getItem('consumption_name');
        let amount = $('#aantal').val();
        let traktatie = $('#trakteren').prop('checked') ? 'traktatie' : 'geen';
        let getrakteerde_id = $('#getrakteerde_id').val();

        let saldo = JSON.parse(window.localStorage.getItem('saldo'));

        let saldoAmount = saldo[consumption_name] ? saldo[consumption_name] : 0;
        if (amount === "") {
            alert('Aantal kan niet leeg zijn');

        // Als de user een saldo heeft van het geselecteerde item, zal het aantal eerst van zijn saldo afgetrokken worden vooraleer een UserConsumption wordt aangemaakt
        } else if (saldoAmount > 0) {
            // Als het saldo hoger is dan het ingegeven aantal, wordt enkel van het saldo afgetrokken
            if (saldoAmount >= amount) {
                let correctedAmount = saldoAmount - amount;
                let saldoString = 'user=' + user_id + '&consumption=' + consumption_id + '&amount=' + correctedAmount;
                $.ajax({
                    type:'POST', crossDomain: true, cache: false,
                    url: base_url + 'saldos',
                    data: saldoString,
                    success: function(data) {
                        console.log(data);
                    },
                    error: function(jqXhr, textStatus, error) {
                        alert("error\n" + error);
                    }
                });

                // Als het een traktatie is, moet dit bij het saldo van de getrakteerde opgeteld worden.
                setTimeout(function() {
                    if (traktatie === 'traktatie') {
                        updateTraktatie(getrakteerde_id, consumption_id, consumption_name, amount);
                    }
                }, 100);

            // Als het saldo lager is dan het ingegeven aantal moet eerst het saldo tot 0 gebracht worden, en daarna het overgebleven
            // aantal als UserConsumption geregistreerd worden
            } else {
                let correctedAmount = amount - saldoAmount;
                let saldoString = 'user=' + user_id + '&consumption=' + consumption_id + '&amount=' + 0;
                $.ajax({
                    type:'POST', crossDomain: true, cache: false,
                    url: base_url + 'saldos',
                    data: saldoString,
                    success: function(data) {
                        console.log(data);
                    },
                    error: function(jqXhr, textStatus, error) {
                        alert("error\n" + error);
                    }
                });

                let consumptionString = "user=" + user_id + "&consumption=" + consumption_id + "&amount=" + correctedAmount + "&traktatie=" + traktatie + "&getrakteerde=" + getrakteerde_id;
                setTimeout(function() {
                    $.ajax({
                        type: "POST", crossDomain: true, cache: false,
                        url: base_url + 'user_consumptions',
                        data: consumptionString,
                        success: function(data) {
                            console.log(data);
                            alert("Toegevoegd!")
                        },
                        error: function(jqXhr, textStatus, error) {
                            alert("error\n" + error);
                        }
                    });
                }, 50);
                // Als het gaat om een traktatie, moet het saldo van de getrakteerde omhoog gaan
                setTimeout(function() {
                    if (traktatie === 'traktatie') {
                        updateTraktatie(getrakteerde_id, consumption_id, consumption_name, amount);
                    }
                }, 100);

            }

        // Indien de gebruiker geen saldo heeft, wordt voor de bestelling een UserConsumption aangemaakt
        } else {
            // let url_consumption = 'http://stefvb.sinners.be/api/user_consumptions';
            let consumptionString = "user=" + user_id + "&consumption=" + consumption_id + "&amount=" + amount + "&traktatie=" + traktatie + "&getrakteerde=" + getrakteerde_id;
            $.ajax({
                type: "POST", crossDomain: true, cache: false,
                url: base_url + 'user_consumptions',
                data: consumptionString,
                success: function(data) {
                    alert("Toegevoegd!")
                },
                error: function(jqXhr, textStatus, error) {
                    alert("error\n" + error);
                }
            });

            setTimeout(function() {
                if (traktatie === 'traktatie') {
                    updateTraktatie(getrakteerde_id, consumption_id, consumption_name, amount);
                }
            }, 500);

        }
    }

    return {
        init: init,
        fill: fill,
        addConsumption: addConsumption
    };
}();