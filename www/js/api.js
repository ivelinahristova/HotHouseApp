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


    $.ajax({
        dataType: "json",
        type: "GET",
        url: "http://ivelinah.ddns.net/controls",
        beforeSend: function( xhr ) {
            xhr.overrideMimeType( "application/json; charset=x-user-defined" );
        }
    })
        .done(function( data ) {
            var responseObj = data;
            console.log(responseObj);
            for(var sensorId in responseObj){
                var sensor = (responseObj[sensorId]);
                $('#' + sensor['name'] + ' .control-action').attr('data-status', sensor['status'] == 1 ? 0 : 1);
                $('#' + sensor['name'] + ' .control-action').attr('data-name', sensor['name']);

                if(sensor['status'] == 1) {
                    $('#' + sensor['name'] + ' .condition').html('ON');
                    $('#' + sensor['name'] + ' .condition').addClass('on');
                    $('#' + sensor['name'] + ' .control-action').html('ЗАТВОРИ');
                } else {
                    $('#' + sensor['name'] + ' .condition').html('OFF');
                    $('#' + sensor['name'] + ' .condition').addClass('off');
                    $('#' + sensor['name'] + ' .control-action').html('ОТВОРИ');
                }
                $('#' + sensor['name'] + '-value').html(sensor['value']);
                var date = sensor['updated_at'].substring(0, 10);
                var time = sensor['updated_at'].substring(10, 20);
                $('#' + sensor['name'] + ' .last-updated-date').html(date);
                $('#' + sensor['name'] + ' .last-updated-time').html(time);
            }
        });


    $('.control-action').on('click', function () {
        console.log(888);
        var status = $(this).attr('data-status');
        console.log(status);
        var name = $(this).attr('data-name');

        $.ajax({
            dataType: "text",
            type: "PUT",
            url: "http://ivelinah.ddns.net/controls/" + name,
            data: { status: status },
            beforeSend: function( xhr ) {
                xhr.overrideMimeType( "application/json; charset=x-user-defined" );
            },
            error: function(jq,status,message) {
                alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
            }
        })
            .done(function( data ) {
                console.log(111);
                console.log(data);
                location.reload();
            });
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

