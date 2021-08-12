let Login = function () {
    let base_url = 'http://batshuayi.chickenkiller.com/api/';

    let init = function () {
        $('#loginButton').click(function () {
            let username = $.trim($('#username').val());
            let password = $.trim($('#password').val());
            $('#status').text("Authenticating...");
            login(username, password);
        });
    };

    let login = function (name, password) {
        if (name === "" || password === "") {
            $('#status').text("Naam/Paswoord kan niet leeg zijn!")
        } else {
            let loginString = "name=" + name + "&pw=" + password;
            $.ajax({
                type: 'GET', crossDomain: true, cache: false,
                url: base_url + 'users',
                dataType: 'json',
                data: loginString,
                success: function (data) {
                    if (data.length > 0) {
                        window.localStorage.setItem("UserID", data[0].id);
                        window.localStorage.setItem("name", name.toString());
                        // window.localStorage.setItem("password", password.toString());
                        $('#status').text("Login Success..!");

                        $('#tabLogin').hide();
                        $('#tabConsumptions').show();
                        $('#navUnfold').show();
                    } else {
                        $('#status').text("Controleer ingave");
                    }

                    // Geef saldo voor de user
                    Consumptions.calculateSaldo();
                },
                error: function(jqXhr, textStatus, error) {
                    alert("error\n" + error);
                }
            })
        }
    }

    return {
        init: init,
        login: login
    };
}();