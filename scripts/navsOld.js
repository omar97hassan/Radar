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
    if (tip == "radar") {
        $(".tipPrijave").html("Prijavi radar");
        $(".tipPrijave").attr("data-tip", "1");
        $(".prijavaImg").attr("src", "img/police-icon-0.png");
    }
    else if (tip == "udes") {
        $(".tipPrijave").html("Prijavi udes");
        $(".tipPrijave").attr("data-tip", "2");
        $(".prijavaImg").attr("src", "img/970411-200.png");
    }
    else if (tip == "oprez") {
        $(".tipPrijave").html("Upozori ostale vozače");
        $(".tipPrijave").attr("data-tip", "3");
        $(".prijavaImg").attr("src", "img/alert.png");
    }
}

$(".radarBtn").click(function () {
    populateRadarModal("radar");
    $(".radarModalWrap").addClass("showDarknesR");
    $(".radarModal").addClass("showRadarModal");
});

$("#udesBtn").click(function () {
    populateRadarModal("udes");
    $(".radarModalWrap").addClass("showDarknesR");
    $(".radarModal").addClass("showRadarModal");
})

$("#someAlertBtn").click(function () {
    populateRadarModal("oprez");
    $(".radarModalWrap").addClass("showDarknesR");
    $(".radarModal").addClass("showRadarModal");
})

function hideRadarModal() {
    $(".radarModalWrap").removeClass("showDarknesR");
    $(".radarModal").removeClass("showRadarModal");
}

$(".closeRadarModal").click(function () {
    hideRadarModal();
});
$(".radarModalWrap").click(function () {
    hideRadarModal();
}).children().click(function (e) {
    return false;
});