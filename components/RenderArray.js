import React, { useState, useEffect } from "react";
import "../styles/App.css";


function RenderArray() {

    const [temp, setTemp] = useState("");
    const [queryTemp, setQueryTemp] = useState();

     const handleChange = (evt) => {
         const userInput = evt.target.value;
         setTemp(userInput);
     };

     const handleSubmit = (e) => {
         e.preventDefault();
        setQueryTemp(temp);
     };


    // similar to component mount and component did mount

    useEffect(() => {

      async function fetchTemp() {
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.search = new URLSearchParams({
        appid: "aab53c547c655e0fb456f3d6f933d4b0",
        q: queryTemp,
        units: "metric"
      });

      try {

        const response = await fetch(url);
        const apiData = await response.json();
        setTemp(apiData.temp);
        setQueryTemp();
        console.log('apiData is',apiData)
        
      } catch (err) {
        console.log('you have an error',err);
      }
    }
    if (queryTemp) {
      fetchTemp();
    }

  },[queryTemp]);


    return (
        <div>
            
            <form action="#" onSubmit={handleSubmit}>
            <label htmlFor="temp">What Temp ?</label>
            <input
                type="text"
                id="temp"
                placeholder="Temp Required?"
                onChange={handleChange}/>
            <input type="submit" value="Submit temp" />
            </form>

                {temp ? (
                <div className="results">
                    <p className="temp2">Temp: {temp}°C</p>
                </div>
                ) : (
                    <p className="placeholder">Output</p>
                )}
            
        </div>
    )

}

    

export default RenderArray