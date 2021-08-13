let Consumptions = function () {
    let base_url = 'http://batshuayi.chickenkiller.com/api/';

    let init = function () {
        $.ajax({
            type: 'GET', crossDomain: true, cache: false,
            url: base_url + 'consumptions',
            dataType: 'json',
            success: function (data) {
                let cards = `<div class="row">`;
                for (i = 0; i < data.length; i++) {
                    cards += `
                    <div class="consumption col s6" data-id="${i + 1}">
                        <div class="card blue-grey darken-1">
                            <div class="card-image">
                                <img src="img/${data[i].name}.jpg" alt="${data[i].name}" data-id="${i + 1}">
                            </div>
                        </div>
                    </div>`;
                }
                $('#consumptions').append(cards);
            },
            error: function(jqXhr, textStatus, error) {
                alert("error\n" + error);
            }
        });


        $(document).on('click', '.consumption', function(event) {
            let name = $(this).find('img').attr('alt');
            let id = $(this).data('id');
            window.localStorage.setItem('consumption_id', id);
            window.localStorage.setItem('consumption_name', name);
            $('#tabConsumptions').hide();
            $('#tabConsumption').show();
            Consumption.fill(name);
        });
    };


    let calculateSaldo = function() {
        let user_id = window.localStorage.getItem('UserID');
        let user = 'user=' + user_id;

        $.ajax({
            type: 'GET', crossDomain: true, cache: false,
            url: base_url + 'user_saldos',
            data: user,
            dataType: 'json',
            success: function (data) {
                let saldoArray = {};
                let sum = 0;
                let saldo = '';

                for (i = 0; i < data.length; i++) {
                    saldoArray[data[i].consumption.name] = data[i].amount;
                    sum += data[i].amount;
                }
                window.localStorage.setItem('saldo', JSON.stringify(saldoArray));
                if (sum > 0) {
                    saldo = `
                    <h5>Saldo:</h5>`;
                }

                for (const [key, value] of Object.entries(saldoArray)) {
                    if (value > 0) {
                        saldo += `
                        <p>${key}: ${value}</p>`;
                    }
                }

                $('#saldo').html(saldo);
            },
            error: function(jqXhr, textStatus, error) {
                alert("error\n" + error);
            }
        });
    }

    return {
        init: init,
        calculateSaldo: calculateSaldo
    };
}();