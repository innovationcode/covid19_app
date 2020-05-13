//global variables
var country_Data = [] 
//playAudio function
var x = document.getElementById("myAudio"); 

function playAudio() { 
        x.play(); 
} 

fetch('https://www.trackcorona.live/api/countries')
    .then(res => res.json())
    .then((out) => {
        //console.log('Output: ', out);
        country_Data = out;
        console.log(country_Data)
}).catch(err => console.error(err));
        