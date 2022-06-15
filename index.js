
const apiKey = "9c3c4a0fea84437d454c3986beccdea3";



document.getElementById("btn").addEventListener("click", getData);

   // 7 days Data 

  async function sevenDays(lat,lon){

    let city = document.getElementById("search").value;

    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;

    let res = await fetch(url)

    let data = await res.json();

    appendSevenDays(data);

    console.log(data.daily)
  }

 // sevenDays()

  function appendSevenDays(data){
   
    data.daily.map(function(el){
      console.log(el.temp.day)

      let h4 = document.createElement("h4");
      h4.innerText = el.temp.day;

      document.getElementById("footer").append(h4)
    })
  }





  // current Location

 async function currentData(lat,lon){
    
    let city = document.getElementById("search").value
    
    
  //  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        let res = await fetch(url)
        
        let data = await res.json();

        document.getElementById("city-txt").innerText = data.name;

        appendData(data);
     
       // console.log(data);
}

async function getData(){
    
  let city = document.getElementById("search").value
  
  
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  //  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      let res = await fetch(url)
      
      let data = await res.json();

      document.getElementById("city-txt").innerText = data.name;

      appendData(data);
   
    //  console.log(data);
}


function appendData(data){

    let p1 = document.createElement("p");
    // p1.innerHTML = null;
    document.getElementById("ct").innerHTML = null;
    p1.innerText = `${Math.floor(data.main.temp)} * C`;

    let p2 = document.createElement("p");
    document.getElementById("min-t").innerHTML = null;
    p2.innerText = `${Math.floor(data.main.temp_min)} * C`;

    let p3 = document.createElement("p");
    document.getElementById("max-t").innerHTML = null;
    p3.innerText = `${Math.floor(data.main.temp_max)} * C`;

    let p4 = document.createElement("p");
    document.getElementById("desc").innerHTML = null;
    p4.innerText = `${data.weather[0].description} `;

    let p5 = document.createElement("p");
    document.getElementById("country").innerHTML = null;
    p5.innerText = data.sys.country;

    document.getElementById("ct").append(p1);
    document.getElementById("min-t").append(p2);
    document.getElementById("max-t").append(p3);
    document.getElementById("desc").append(p4);
    document.getElementById("country").append(p5);

    let iframe = document.getElementById("gmap_canvas");
    iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  //  document.getElementById("min-t").innerHTML = null;
  //  document.getElementById("max-t").innerHTML = null;
  //  document.getElementById("desc").innerHTML = null;
  //  document.getElementById("country").innerHTML = null;

}

// src="https://maps.google.com/maps?q=siliguri&t=&z=13&ie=UTF8&iwloc=&output=embed"


// Based on current location :

function getLocationWeather(){
 
   navigator.geolocation.getCurrentPosition(success);

    function success(position){
      
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      currentData(latitude,longitude);
      sevenDays(latitude,longitude);

    }
}

getLocationWeather();