var map;
var radars;
var myPositionMarker;

function initMap() {
    var uluru = { lat: 43.8865592, lng: 18.3104995 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru
    });
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
}

$.ajax({
    type: 'GET',
    dataType: "json",
    url: "https://api.sjedimnako.ba/radarAPI.php?task=getRadars",
    success: function (data) {
        radars = data.radari;
        //alert("doio sa servera");
        $(".radarList").html(" ");
        for (var i = 0; i < radars.length; i++) {
            var item = '<a class="listItem"><img src="img/' + radars[i].Ikona + '" class="itemImg pull-left" /><h4>' + radars[i].Ime + ' <a class="fa fa-location-arrow goto" data-lat="' + radars[i].lat + '" data-lng="' + radars[i].lng + '"></a></h4><p><strong>' + radars[i].Mjesto + ', </strong>' + radars[i].Napomena + '</p><hr /></a>';
            //alert(item);
            $(".radarList").append(item);
            var centar = { lat: parseFloat(radars[i].lat), lng: parseFloat(radars[i].lng) };
            var tip;
            if (parseInt(radars[i].Potvrdjeno)) {
                tip = "./img/" + radars[i].mapIcon;
            } else {
                tip = "./img/" + radars[i].mapUnIcon;
            }
            var marker = new google.maps.Marker({
                position: centar,
                icon: tip,
                map: map
            });
            map.setCenter(centar);
        }
        $(".goto").click(function () {
            var centar = { lat: parseFloat($(this).attr("data-lat")), lng: parseFloat($(this).attr("data-lng")) };
            map.setCenter(centar);
            if (window.innerWidth <= 801) {
                showMap();
            }
        });
    },
    error: function () {
        alert("Neke usluge nisu dostupne, provjerite vašu konekciju...");
    }
});

function getPosition(initial) {
    console.log("getPosition trigered");
    var options = {
        enableHighAccuracy: true,
        maximumAge: 0
    }
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {
        var myLat = position.coords.latitude;
        var myLng = position.coords.longitude;
        var myPos = { lat: myLat, lng: myLng };
        map.setCenter(myPos);
        if (!initial) {
            console.log("old marker removed");
            myPositionMarker.setMap(null);
        }
        myPositionMarker = new google.maps.Marker({
            position: myPos,
            label: "ME",
            map: map
        });
    };

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}