var map;
var radars;
var myPositionMarker;

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
        window.localStorage.setItem("myPosition", JSON.stringify(myPos));
        map.setCenter(myPos);
        if (!initial) {
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

function initMap() {
    var uluru = { lat: 43.8865592, lng: 18.3104995 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru
    });
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
}

getPosition(true);

$.ajax({
    type: 'GET',
    dataType: "json",
    url: "https://api.sjedimnako.ba/radarAPI.php?task=getRadars&myLat=" + JSON.parse(window.localStorage.getItem("myPosition")).lat + "&myLng=" + JSON.parse(window.localStorage.getItem("myPosition")).lng,
    success: function (data) {
        radars = data.radari;
        window.localStorage.setItem("radars", JSON.stringify(radars));
        //alert("doio sa servera");
        $(".radarList").html(" ");
        for (var i = 0; i < radars.length; i++) {
            var item = '<a class="listItem"><img src="img/' + radars[i].Ikona + '" class="itemImg pull-left" /><h4>' + radars[i].Ime + ' <span id="isP' + i + '" class="isPotvrdjeno fa fa-question-circle"> </span><a class="fa fa-location-arrow goto" data-lat="' + radars[i].lat + '" data-lng="' + radars[i].lng + '"></a></h4><p><strong>' + radars[i].Mjesto + ', </strong>' + radars[i].Napomena + '</p><hr /></a>';
            //alert(item);
            $(".radarList").append(item);
            var centar = { lat: parseFloat(radars[i].lat), lng: parseFloat(radars[i].lng) };
            var tip;
            if (parseInt(radars[i].Potvrdjeno)) {
                tip = "./img/" + radars[i].mapIcon;
            } else {
                $("#isP"+i).css("display", "inline");
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