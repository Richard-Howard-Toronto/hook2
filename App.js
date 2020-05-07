import React, { useState, useEffect } from "react";
import Header from './components/Header';
import RenderArray from './components/RenderArray';

import "./styles/setup.css";
import "./styles/App.css";



function App() {

  const [city, setCity] = useState("");
  const [queryCity, setQueryCity] = useState();
  const [temperature, setTemperature] = useState("");
  const [wind,setWind] = useState("");
  const [degrees, setDegrees] = useState("");
  const [weather, setWeather] = useState("");
  const [sunRise, setSunRise] = useState("");
  const [sunSet, setSunSet] = useState("");
  const sunUp = sunSet - sunRise;

  useEffect(() => {
    async function fetchWeather() {
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.search = new URLSearchParams({
        appid: "aab53c547c655e0fb456f3d6f933d4b0",
        q: queryCity,
        units: 'metric'
      });

      try {

        const response = await fetch(url);
        const apiData = await response.json();


        console.log(Object.values(apiData));
        console.log(sunUp);


        function time_convert(sunUp) {
          var hours = Math.floor(sunUp / 3600);
          var minutes = Math.floor((sunUp / 60)-(hours * 60));
          var seconds = sunUp - (hours * 3600) - (minutes *60);
          return hours + ":" + minutes + ":" + seconds;
        }

        console.log(time_convert(sunUp));

        setTemperature(apiData.main.temp);
        setWeather(apiData.weather[0].main);
        setWind(apiData.wind.speed);
        setDegrees(apiData.wind.deg);
        setSunRise(apiData.sys.sunrise)
        setSunSet(apiData.sys.sunset)
        
        setQueryCity();

        } catch (err) {
         console.log('you have an error',err);
      }
    }
    if (queryCity) {
      fetchWeather();
    }

  },[queryCity]);



  let direction = "";
  if (degrees >= 180) {
    direction = "degrees from the north"

  } else if (degrees > 0 || degrees < 180.0){
    direction = "degrees from the south"

  } else {
    direction = "- wind speed too low for direction."
  }

  const handleChange = (e) => {
    const userInput = e.target.value; 
    setCity(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQueryCity(city);
  };


  return (
    <>
      <main className="wrapper">
      
      <Header />
      <RenderArray />

        <form action="#" onSubmit={handleSubmit}>
          <label htmlFor="city">What City?</label>
          <input
            type="text"
            id="city"
            placeholder="enter city!"
            onChange={handleChange}
          />

          <input type="submit" value="Input Submit" />
        </form>
        {temperature ? (
          <div className="results">
            <p className="temp">Temp: {temperature}°C</p>
            <p className="weather">Weather: {weather}</p>
            <p className="wind">Wind {wind} kph {degrees} {direction}</p>
                <div>
                  <ol>
                      {/* {allApiData} */}
                  </ol>
               </div>
          </div>
        ) : (
            <p className="placeholder">Output</p>
          )}
      </main>
      
    </>
  );
}

export default App;



// "coord": {
//   "lon": 139,
//   "lat": 35
// },
// "weather": [{
//   "id": 800,
//   "main": "Clear",
//   "description": "clear sky",
//   "icon": "01n"
// }],
// "base": "stations",
// "main": {
//   "temp": 281.52,
//   "feels_like": 278.99,
//   "temp_min": 280.15,
//   "temp_max": 283.71,
//   "pressure": 1016,
//   "humidity": 93
// },
// "wind": {
//   "speed": 0.47,
//   "deg": 107.538
// },
// "clouds": {
//   "all": 2
// },
// "dt": 1560350192,
// "sys": {
//   "type": 3,
//   "id": 2019346,
//   "message": 0.0065,
//   "country": "JP",
//   "sunrise": 1560281377,
//   "sunset": 1560333478
// },
// "timezone": 32400,
// "id": 1851632,
// "name": "Shuzenji",
// "cod": 200
// }