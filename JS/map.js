var map;
var markers = [];
var infoWindow;
var locationSelect;

//Google map initialize
function initMap() {
    
    var loading = document.getElementsByClassName('loading');
    loading.className = 'show'

    setTimeout(function() { 
        var mumbai = {lat: 19.0760, lng: 72.8777};
        map = new google.maps.Map(document.getElementById('map'), {
            center: mumbai,
            zoom: 5,
        })
        console.log(country_Data);
        showMarkers();  
        infoWindow = new google.maps.InfoWindow();
    }, 2500);

    var countryName = document.getElementById('country-name-input').value;
    if(countryName) {
        searchCountry(countryName);
    }
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

/****************** searchCountry() *****************/
function searchCountry(country) {
    var countryNameToSearch = document.getElementById('country-name-input').value.toLowerCase();
    
    foundCountry = country_Data.filter(function(country, index) {
            return countryNameToSearch === country.location.toLowerCase();
    });
    
    if(foundCountry.length === 0) {
        foundCountry = country_Data.filter(function(country, index) {
            return countryNameToSearch.substring(0,1) === country.location.substring(0,1).toLowerCase();
        });
    }
    console.log("FOUND country  : ", foundCountry);
    
    displayCountries(foundCountry); 
//    showMarkers(foundCountry); // will show markers on map for found satores only
    setOnClickListener(); // onclick in store-list display area will pop up marker info on map
}

// ************ DISPLAY STORES *************
function displayCountries(foundCountry) {
    var countryHtml = '';
    foundCountry.forEach(function(country, index){ 
        var countryName = country.location;
        var country_code = country.country_code.toUpperCase();
        var confirmed = country.confirmed;
        var recovered = country.recovered;
        var dead = country.dead;
        var updatedOn = country.updated.substring(0, 10);

        countryHtml += ` 
            <div class = 'country-container'>
                <div class = 'country-container-background' >
                    <div class = "country-info-container">
                        <div class = 'country-name'>
                            <span> ${countryName} </span>
                        </div>
                        <div class = 'country-other-info'>
                            <span> Confirmed : ${confirmed} </span><br/>
                            <span> Recovered : ${recovered} </span><br/>
                            <span> Death : ${dead} </span>
                        </div>
                        <div class = 'store-phone-number'> 
                             Updated-on : ${updatedOn}
                        </div>
                    </div>
                    <div class = "store-number-container">
                        <div class = 'store-number'>
                            ${country_code}
                        </div>
                    </div>    
                </div>
            </div>
         `
    });
    document.querySelector('.country-list-container').style.display = 'flex';
    document.querySelector('.country-list').innerHTML = countryHtml; //select element with class "stores-list" and display storeHtml there.
}
