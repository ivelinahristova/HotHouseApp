/**
 * Created by Ivelina on 5.1.2016 г..
 */
$(document).ready(function(){

    $.support.cors = true;
    
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "http://ivelinah.ddns.net/sensors",
        beforeSend: function( xhr ) {
            xhr.overrideMimeType( "application/json; charset=x-user-defined" );
        }
    })
        .done(function( data ) {
            //var responseObj = JSON.parse(data);
            for(var sensorId in data){
                var sensor = (data[sensorId]);
                $('#' + sensor['name'] + '-value').html(sensor['value']);
                var date = sensor['updated_at'].substring(0, 10);
                var time = sensor['updated_at'].substring(10, 20);
                $('#' + sensor['name'] + ' .last-updated-date').html(date);
                $('#' + sensor['name'] + ' .last-updated-time').html(time);
            }
        });


   /* var request = new XMLHttpRequest();
    var response = null;
// Feature detection for CORS
    if ('withCredentials' in request) {
        request.open('GET', 'http://ivelina.ddns.net/sensors', true);
        // Just like regular ol' XHR
        request.onreadystatechange = function() {

            if (request.readyState === 4) {
                console.log(request);
                if (request.status >= 200 && request.status < 400) {

                    response = request.response;
                    var responseObj = JSON.parse(response);
                    document.getElementsByClassName('app')[0].innerHTML = response;
                    for(var sensorId in responseObj){
                        var sensor = (responseObj[sensorId]);

                        $('#' + sensor['name'] + '-value').html(sensor['value']);
                        var date = sensor['updated_at'].substring(0, 10);
                        var time = sensor['updated_at'].substring(10, 20);
                        $('#' + sensor['name'] + ' .last-updated-date').html(date);
                        $('#' + sensor['name'] + ' .last-updated-time').html(time);
                    }

                } else {
                    console.log(request.getResponseHeader ("Content-Type"));
                }
            }
        };
        request.timeout = 1000;
        request.send(null);
    }*/

    /*$(document).bind('mobileinit',function(){
        $.mobile.pushStateEnabled = false;
    });*/
});

