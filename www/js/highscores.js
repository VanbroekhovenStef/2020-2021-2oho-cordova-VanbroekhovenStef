let Highscores = function () {
    let base_url = 'http://batshuayi.chickenkiller.com/api/';

    let init = function () {
        $(document).ready(function(){
            $('.tabs').tabs();
        });

        let data = `
              <div class="row">
                <div class="col s12">
                  <ul class="tabs">
                    <li class="tab col s3"><a class="active" href="#individueel">Pers.</a></li>
                    <li class="tab col s3"><a href="#takken">Takken</a></li>
                    <li class="tab col s3"><a href="#jaar">Jaar</a></li>
                  </ul>
                </div>
                <div id="individueel" class="col s12"></div>
                <div id="takken" class="col s12"></div>
                <div id="jaar" class="col s12"></div>
              </div>
        `;
        $('#highscores').html(data);
    };

    let createPersTable = function() {
        $.ajax({
            type: 'GET', crossDomain: true, cache: false,
            url: base_url + 'pers_consumptions',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                let tablePers = '';
                tablePers = `
                <table>
                    <thead>
                        <tr>
                            <td>Positie</td>
                            <td>Persoon</td>
                            <td>Score</td>
                        </tr>
                    </thead>
                    <tbody id="persBody">
                    </tbody>
                </table>`;

                $('#individueel').html(tablePers);

                let rowsPers = '';
                for (i = 0; i < data.length; i++) {
                    rowsPers += `
                   <tr>
                    <td>${i+1}.</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].total}</td>
                   </tr>`;
                }
                $('#persBody').html(rowsPers);
            },
            error: function(jqXhr, textStatus, error) {
                // alert("error\n" + error);
            }
        });
    }

    let createTakkenTable = function() {
        $.ajax({
            type: 'GET', crossDomain: true, cache: false,
            url: base_url + 'takken_consumptions',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                let tableTakken = '';
                tableTakken = `
                <table>
                    <thead>
                        <tr>
                            <td>Positie</td>
                            <td>Tak</td>
                            <td>Score</td>
                        </tr>
                    </thead>
                    <tbody id="takBody">
                    </tbody>
                </table>`;

                $('#takken').html(tableTakken);

                let rowsTakken = '';
                for (i = 0; i < data.length; i++) {
                    rowsTakken += `
                   <tr>
                    <td>${i+1}.</td>
                    <td>${data[i].tak}</td>
                    <td>${data[i].total}</td>
                   </tr>`;
                }
                $('#takBody').html(rowsTakken);
            },
            error: function(jqXhr, textStatus, error) {
                // alert("error\n" + error);
            }
        });
    }

    let createJaarTable = function() {
        $.ajax({
            type: 'GET', crossDomain: true, cache: false,
            url: base_url + 'jaar_consumptions',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                let tableJaar = '';
                tableJaar = `
                <table>
                    <thead>
                        <tr>
                            <td>Positie</td>
                            <td>Jaar</td>
                            <td>Score</td>
                        </tr>
                    </thead>
                    <tbody id="jaarBody">
                    </tbody>
                </table>`;

                $('#jaar').html(tableJaar);

                let rowsJaar = '';
                for (i = 0; i < data.length; i++) {
                    rowsJaar += `
                   <tr>
                    <td>${i+1}.</td>
                    <td>${data[i].year_of_birth}</td>
                    <td>${data[i].total}</td>
                   </tr>`;
                }
                $('#jaarBody').html(rowsJaar);
            },
            error: function(jqXhr, textStatus, error) {
                // alert("error\n" + error);
            }
        });
    }
    return {
        init: init,
        createJaarTable: createJaarTable,
        createTakkenTable: createTakkenTable,
        createPersTable: createPersTable
    };
}();