//global variables
var country_Data = [] 

//playAudio function
var x = document.getElementById("myAudio"); 
function playAudio() { 
        x.play();
        x.volume = 0.02; 
} 

//fetch data to have records for countries...
fetch('https://www.trackcorona.live/api/countries')
    .then(res => res.json())
    .then((out) => {
        country_Data = out.data;
        console.log("counrey_data", country_Data)
}).catch(err => console.error(err));
 


async function worldCount() {
        var worldCount = {}
        console.log("In WorldCount")

        await fetch("https://api.thevirustracker.com/free-api?global=stats", {
                method: "GET"
        })
        .catch((err) => {
                console.log("Error  : ", err);
        })
        .then((res) => {
                if (res.ok) {
                        res.json().then((json) => {
                               // console.log("RESPONSE  : ",json.results[0]),
                                worldCount = json.results[0];
                                console.log("worldCount   :  ",worldCount)
                        });
                } else {
                        console.log("error", res);
                }
        });
        setTimeout(function() {
                var globalInfoWindow = document.getElementById('global-info');
                globalInfoWindow.style.display = 'block';
                console.log("WWWW  : ", worldCount)
                globalInfoWindow.innerHTML = 
                        `<div class = "global-info-window">
                                <h1 style = "padding: 30px 0px">
                                        Total affected countries : ${worldCount.total_affected_countries}
                                </h1>
                                <h3>
                                        Total cases  : ${worldCount.total_cases}
                                </h3>
                                <h3>
                                        Recovered   : ${worldCount.total_recovered}
                                </h3>
                                <h3>
                                        Death  : ${worldCount.total_deaths}
                                </h3>
                                <h3>
                                        Total active cases   : ${worldCount.total_active_cases}
                                </h3>
                                <h3>
                                        Total new cases today   : ${worldCount.total_new_cases_today}
                                </h3>
                                <h3>
                                        Total new deaths today  : ${worldCount.total_new_deaths_today}
                                </h3>
                                <div style = "font-size: 14px; margin-bottom : 5px; margin-right:7px;">
                                        Updated On  : ${country_Data[0].updated.substring(0,10)}
                                </div>
                                <button onclick="buttonClick();"> Close </button>
                        </div>  
                        `;
        }, 800);
}

function buttonClick() {
        var globalInfoWindow = document.getElementById('global-info')
        globalInfoWindow.style.display = 'none';
}