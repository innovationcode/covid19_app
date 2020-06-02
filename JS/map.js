var map;
var markers = [];
var infoWindow;
var locationSelect;
var foundCountry = []; // for search country


//Google map initialize
function initMap() {
    
    var loading = document.getElementsByClassName('loading');
    loading.className = 'show'
// Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        var styledMapType = new google.maps.StyledMapType(
            [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#6ddfe3'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: 'black'}]
              }
            ],
            {name: 'Styled Map'});

        setTimeout(function() { 
            var missouri = {lat:38.573936, lng:-92.603760}; 
            //var mumbai = {lat: 19.0760, lng: 72.8777};
            map = new google.maps.Map(document.getElementById('map'), {
                center: missouri, // mumbai,
                zoom: 5,
                mapTypeControlOptions: {
                    mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
            }
        })
           
        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
          
        //console.log(country_Data);
        showMarkers();  
        infoWindow = new google.maps.InfoWindow();
    }, 2500);

    var countryName = document.getElementById('country-name-input').value;
    if(countryName) {
        searchCountry(countryName);
    }
}

/**************** showMarkers ******************/
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
    showMarkers(foundCountry); // will show markers on map for found satores only
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

// Function to close country container displaying search results
function closeCountryContainer() {
    document.querySelector('.country-list-container').style.display = 'none';
    map.setZoom(5);
}

function setOnClickListener() {
    var storeElements = document.querySelectorAll('.country-container');
    console.log("setOnClickListener  :  ", storeElements)
    storeElements.forEach(function(element, index) {
        console.log(element, "++++++++++++++++++++++++++++++++++++++++")
        element.addEventListener('click', function() {
            var countryCodeFromEvent = element.querySelector('.store-number').innerHTML.toLowerCase();
            countryCodeFromEvent = countryCodeFromEvent.replace(/\s/g, '');
    
            var countryForMarkerEvent = foundCountry.filter(country => country.country_code === countryCodeFromEvent);
            console.log(countryForMarkerEvent)
            var indexForClickCountry = country_Data.findIndex(dt => dt.country_code === countryCodeFromEvent);
            console.log("indexForClickCountry : ", indexForClickCountry)
            
            new google.maps.event.trigger(markers[indexForClickCountry], 'click' );
            var bounds = new google.maps.LatLngBounds(); //bounds spreads the marker '
            //map.setCenter(bounds);
            map.fitBounds(bounds);
            map.setZoom(6);
        })
    });
}