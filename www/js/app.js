$(function(){

    document.addEventListener("deviceready", onDeviceReady, false);

    $('.sidenav').sidenav();	/* https://materializecss.com/sidenav.html */

    // Hide navigation until logged in
    $('#navUnfold').hide();

    $('.sidenav a').click(function () {
        $('.spa').hide();
        $('#' + $(this).data('show')).show();
        $('.sidenav').sidenav('close');
    });

    // Upon logout reset all information about user and hide navigation
    $('#logoutButton').click( function() {
        $('#navUnfold').hide();
        $('#status').text('');
        window.localStorage.setItem("UserID", 0);
        window.localStorage.setItem("name", '');
        window.localStorage.setItem("password", '');
    });

    $('#overzicht').click(function() {
        setTimeout(function() {
            Overview.createTable();
        }, 200);
    });

    $('#highscoresTab').click(function() {
        setTimeout(function() {
            Highscores.createJaarTable();
        }, 100);
        setTimeout(function() {
            Highscores.createPersTable();
        }, 200);
        setTimeout(function() {
            Highscores.createTakkenTable();
        }, 300);
    })

    $('#berekenSaldo').click(function() {
        Consumptions.calculateSaldo();
    })
});

function onDeviceReady() {
    console.log('Device is ready');
    Login.init();
    Info.init();
    Consumptions.init();
    Consumption.init();
    Overview.init();
    Highscores.init();
}