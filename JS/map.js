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

function showMarkers() {
    country_Data.forEach(function(country) {
        var latLng = new google.maps.LatLng(
            country.latitude,
            country.longitude
        );
        var country_code = country.country_code.toUpperCase();
        var countryName = country.location;
        var confirmed = country.confirmed;
        var recovered = country.recovered;
        var dead = country.dead;
        var updatedOn = country.updated.substring(0, 10);
        createMarker(latLng, country_code, countryName, confirmed, recovered, dead, updatedOn);
    });
}

function createMarker(latlng, country_code, name, confirmed, recovered, dead, updatedOn) {
    var image = {
            url: "CVirus.png", // url
            scaledSize: new google.maps.Size(38, 38), // scaled size
            // origin: new google.maps.Point(0,0), // origin
            // anchor: new google.maps.Point(0, 0) // anchor
    };
        
    var html = `
                <div class = "country-info-window">
                    <div style = "    color: #fa5a54; font-size: 25px; font-weight: bold; margin-bottom: 5px;">
                        ${name}
                    </div>
                    <div style = "font-size: 14px; margin-bottom : 5px; margin-right:7px;">
                        Updated On : ${updatedOn}
                    </div>
                    <div style = "border: 0.6px solid black; margin-bottom: 4px;"></div>
                    <div style = "font-size: 18px; margin-bottom : 5px;">
                        Total cases : ${confirmed}
                    </div>
                    <div style = "font-size: 18px; margin-bottom : 5px;">
                        Recovered : ${recovered}
                    </div>
                    <div style = "font-size: 18px; color: #fa5a54;">
                        Death : ${dead}
                    </div>
                </div>
                `;
    
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label: {
            text:`${country_code}`,
            color: 'white',
            fontWeight: 'bold',
        },
        icon: image

    });
    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
}

