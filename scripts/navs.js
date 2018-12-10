Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

function showMap() {
    $(".mapCardWrap").css("display", "block");
    $(".listCardWrap").css("display", "none");
    $(".kartaBtn").removeClass("titlePasive");
    $(".kartaBtn").addClass("titleActive");
    $(".listaBtn").removeClass("titleActive");
}
$(".kartaBtn").on("click", function () {
    showMap();
});
function showList() {
    $(".mapCardWrap").css("display", "none");
    $(".listCardWrap").css("display", "block");
    $(".listaBtn").removeClass("titlePasive");
    $(".listaBtn").addClass("titleActive");
    $(".kartaBtn").removeClass("titleActive");
}
$(".listaBtn").on("click", function () {
    showList();
});

$(".appNav").on("click", function () {
    $(".sideBarWrap").removeClass("hideDarknes");
    $(".sideBar").removeClass("hideSideBar");

    $(".sideBarWrap").addClass("showDarknes");
    $(".sideBar").addClass("showSideBar");
});

function hideSideBar() {
    $(".sideBarWrap").addClass("hideDarknes");
    $(".sideBar").addClass("hideSideBar");
    setTimeout(function () {
        $(".sideBarWrap").removeClass("showDarknes");
        $(".sideBar").removeClass("showSideBar");
    }, 500);
    
}

$(".closeSideBar").on("click", function () {
    hideSideBar();
});
$(".sideBarWrap").click(function () {
    hideSideBar();
}).children().click(function (e) {
    return false;
});

$(".sideItem").on("click", function () {
    var chk = $(this).children().find("input");
    chk.prop("checked", !chk.prop("checked"));
});

function populateRadarModal(tip) {
    if (tip == "Radar") {
        $(".tipPrijave").html("Prijavi radar");
        $(".tipPrijave").attr("data-tip", "Radar");
        $(".prijavaImg").attr("src", "img/police-icon-0.png");
    }
    else if (tip == "Udes") {
        $(".tipPrijave").html("Prijavi udes");
        $(".tipPrijave").attr("data-tip", "Udes");
        $(".prijavaImg").attr("src", "img/970411-200.png");
    }
    else if (tip == "Oprez") {
        $(".tipPrijave").html("Upozori ostale vozače");
        $(".tipPrijave").attr("data-tip", "Oprez");
        $(".prijavaImg").attr("src", "img/alert.png");
    }
}

function populatePotvrdiModal(provjera) {
    $(".prijavaImg").attr("src", "img/" + provjera.Ikona);
    $(".potvrdiModalNaslov").html("Potvrdi " + provjera.Ime);
    $(".naseljePot").html("" + provjera.Mjesto);
    $(".opisPot").html("" + provjera.Napomena);
    $(".potvrdiBtn").attr("data-lat", provjera.lat);
    $(".potvrdiBtn").attr("data-lng", provjera.lng);
}

function checkIfInBlizina(tip) {
    var result = {};
    var myPos = JSON.parse(window.localStorage.getItem("myPosition"));
    var radars = JSON.parse(window.localStorage.getItem("radars"));
    for (var i = 0; i < radars.length; i++) {
        if (tip == radars[i].Ime && (6371 * Math.acos(Math.cos(Math.radians(myPos.lat)) * Math.cos(Math.radians(radars[i].lat)) *
        Math.cos(Math.radians(radars[i].lng) - Math.radians(myPos.lng)) + Math.sin(Math.radians(myPos.lat)) * Math.sin(Math.radians(radars[i].lat)))) < 0.6) {
            result.tacno = true;
            result.lat = radars[i].lat;
            result.lng = radars[i].lng;
            result.Ikona = radars[i].Ikona;
            result.Ime = radars[i].Ime;
            result.Mjesto = radars[i].Mjesto
            result.Napomena = radars[i].Napomena
            break;
        }
    }
    return result;
}

$(".radarBtn").click(function () {
    var provjera = checkIfInBlizina("Radar");
    if (provjera.tacno) {
        populatePotvrdiModal(provjera);

        $(".potvrdiModalWrap").addClass("showDarknesP");
        $(".potvrdiModal").addClass("showPotvrdiModal");
        $(".cancelPotBtn").attr("data-tip", "Radar");
    }
    else {
        populateRadarModal("Radar");
        $(".radarModalWrap").addClass("showDarknesR");
        $(".radarModal").addClass("showRadarModal");
    }
});

$("#udesBtn").click(function () {
    var provjera = checkIfInBlizina("Udes");
    if (provjera.tacno) {
        populatePotvrdiModal(provjera);

        $(".potvrdiModalWrap").addClass("showDarknesP");
        $(".potvrdiModal").addClass("showPotvrdiModal");
        $(".cancelPotBtn").attr("data-tip", "Udes");
    }
    else {
        populateRadarModal("Udes");
        $(".radarModalWrap").addClass("showDarknesR");
        $(".radarModal").addClass("showRadarModal");
    }
})

$("#someAlertBtn").click(function () {
    var provjera = checkIfInBlizina("Oprez");
    if (provjera.tacno) {
        populatePotvrdiModal(provjera);

        $(".potvrdiModalWrap").addClass("showDarknesP");
        $(".potvrdiModal").addClass("showPotvrdiModal");
        $(".cancelPotBtn").attr("data-tip", "Oprez");
    }
    else {
        populateRadarModal("Oprez");
        $(".radarModalWrap").addClass("showDarknesR");
        $(".radarModal").addClass("showRadarModal");
    }
})

$(".cancelPotBtn").click(function () {
    hidePotvrdiModal();
    populateRadarModal($(this).attr("data-tip"));
    $(".radarModalWrap").addClass("showDarknesR");
    $(".radarModal").addClass("showRadarModal");
})

function hideRadarModal() {
    $(".radarModalWrap").removeClass("showDarknesR");
    $(".radarModal").removeClass("showRadarModal");
}

function hidePotvrdiModal() {
    $(".potvrdiModalWrap").removeClass("showDarknesP");
    $(".potvrdiModal").removeClass("showPotvrdiModal");
}

$(".closeRadarModal").click(function () {
    hideRadarModal();
});
$(".radarModalWrap").click(function () {
    hideRadarModal();
}).children().click(function (e) {
    return false;
});

$(".closePotvrdiModal").click(function () {
    hidePotvrdiModal();
});
$(".potvrdiModalWrap").click(function () {
    hidePotvrdiModal();
}).children().click(function (e) {
    return false;
});

/////////////////////////////////
$(".sendBtn").click(function () {

    $.ajax({
        type: 'GET',
        dataType: "json",
        url: "https://api.sjedimnako.ba/radarAPI.php?task=insertRadar&lat=" + JSON.parse(window.localStorage.getItem("myPosition")).lat +
            "&lng=" + JSON.parse(window.localStorage.getItem("myPosition")).lng +
            "&ime=" + $(".tipPrijave").attr("data-tip") +
            "&napomena=" + $(".napomenaR").val() +
            "&mjesto=" + $(".naseljeTxt").val(),
        success: function (data) {
            window.location.reload();
            hideRadarModal();
        },
        error: function () {
            window.location.reload();
        }
    });
})

$(".potvrdiBtn").click(function () {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: "https://api.sjedimnako.ba/radarAPI.php?task=potvrdiRadar&lat=" + $(this).attr("data-lat") +
            "&lng=" + $(this).attr("data-lng"),
        success: function (data) {
            window.location.reload();
            hidePotvrdiModal();
        },
        error: function () {
            window.location.reload();
        }
    });
})