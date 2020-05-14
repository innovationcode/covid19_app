//global variables
var country_Data = [] 

//playAudio function
var x = document.getElementById("myAudio"); 
function playAudio() { 
        x.play();
        x.volume = 0.5; 
} 

//fetch data to have records for countries...
fetch('https://www.trackcorona.live/api/countries')
    .then(res => res.json())
    .then((out) => {
        country_Data = out.data;
        console.log("counrey_data", country_Data)
}).catch(err => console.error(err));
 