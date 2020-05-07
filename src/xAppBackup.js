import React, { useState, useEffect } from "react";


import "./styles/setup.css";
import "./styles/App.css";




function App() {

  const [city, setCity] = useState("");
  const [queryCity, setQueryCity] = useState();
  const [temperature, setTemperature] = useState(1);
  const [weather, setWeather] = useState("to be returned");


  useEffect(() => {
    async function fetchWeather() {
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.search = new URLSearchParams({
        appid: "aab53c547c655e0fb456f3d6f933d4b0",
        q: queryCity,
      });

      try {

        const response = await fetch(url);
        const apiData = await response.json();

        console.log('inside try block and...')
        console.log('querycity',queryCity);

        setTemperature(apiData.main.temp);
        setWeather(apiData.weather[0].main);
        setQueryCity();

      } catch (err) {
        console.log('you have an error',err);
      }
    }
    if (queryCity) {
      fetchWeather();
    }

     

  }, [queryCity]);

  console.log('temperature', temperature);
  console.log('weather', weather);

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
        
        <form action="#" onSubmit={handleSubmit}>
          <label htmlFor="city">What City?</label>

          <input
            type="text"
            id="city"
            placeholder="enter city!"
            onChange={handleChange}
          />

          <input type="submit" value="submit" />
        </form>
        {temperature ? (
          <div className="results">
            <p className="temp">{temperature}°C</p>
            <p className="weather">{weather}</p>
          </div>
        ) : (
            <p className="placeholder">Search</p>
          )}
      </main>
      
    </>
  );
}

export default App;