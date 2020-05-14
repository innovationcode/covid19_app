var map;
var markers = [];
var infoWindow;
var locationSelect;

//Google map initialize
function initMap() {
    var mumbai = {lat: 19.0760, lng: 72.8777};
    map = new google.maps.Map(document.getElementById('map'), {
        center: mumbai,
        zoom: 5,
    })
    setTimeout(function() {
        console.log(country_Data);
        showMarkers();  
        infoWindow = new google.maps.InfoWindow();
    }, 1000);
}