var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// add icon to pointer marker

// make marker draggable
var pointMarker = L.marker([51.5, -0.09], {
    draggable: true,
    autoPan: true
}).addTo(map);

// get lat/lng value afer dragend
pointMarker.on("dragend", function (e) {
    var position = e.target.getLatLng();
    console.log('lat : ', position.lat);
    console.log('lng : ', position.lng);
    getLatLng(position.lat, position.lng)
});

// show after dragging
function getLatLng(lat, lng) {
}

// show while dragging
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Show me here full GEO address")
        .openOn(map);
}
pointMarker.on('move', onMapClick);

// show onclick maker
map.on('click', function (e) {
    console.log('lat : ', e.latlng.lat);
    console.log('lng : ', e.latlng.lng);
    pointMarker.setLatLng([e.latlng.lat, e.latlng.lng])
});


function onLocationFound(e) {
    alert('Load');
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}
// pointMarker.on('load', onLocationFound);