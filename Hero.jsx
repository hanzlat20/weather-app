import React, {useState,useEffect} from 'react';
import './Hero.css';
import sunRise from './assets/sunrise.png';
import sunSet from './assets/sunset.png';
import clear from './assets/clear.png';
import humidity from './assets/humidity.png';
import windSpeed from './assets/wind.png';
import pressure from './assets/pressure.png';
import uvWhite from './assets/uv-white.png';
import clouds from './assets/cloudy-weather.png';
import rain from './assets/rainy.png';
import sun from './assets/sun-2.png';
import sunDark from './assets/sun-dark.png';
import sunRiseLight from './assets/sunrise-light.png';
import sunSetLight from './assets/sunset-light.png';
import rainLight from './assets/rain-light3.png';
import sunLight from './assets/sun-light.png';
import cloudLight from './assets/cloud-light.png';
import humidityLight from './assets/humidity 1.png';
import windLight from './assets/wind 1.png';
import pressureLight from './assets/pressure-white 1.png';
import uvLight from './assets/uv-white 1.png';

function Hero({weatherData,mode}){
    const [currTime,setCurrTime] = useState("");
    const [uvIndex,setUvIndex] = useState(null);

     useEffect (() => {
    if(!weatherData || !weatherData.city) return;

        function updateTime(){
        const now = new Date();
    const seconds = weatherData.city.timezone * 1000;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
    const Time = new Date(utc + seconds);
    const locatTime = Time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});
    setCurrTime(locatTime);
    }
    updateTime();
    const interval = setInterval(updateTime,1000);

    return () => clearInterval(interval);
    },[weatherData]);


     useEffect(() => {
        if(!weatherData || !weatherData.city) return;

        const lat = weatherData.city.coord.lat;
        const lon = weatherData.city.coord.lon;
        const apiKey = "openuv-cq732urmcrlt09a-io"; 

        async function fetchUv(){
            const url = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}&alt=100`;
            try {
                const response = await fetch(url, {
                    headers: {
                        'x-access-token': apiKey
                    }
                });
                const data = await response.json();
                if (data && data.result && typeof data.result.uv !== "undefined") {
                    setUvIndex(data.result.uv);
                } else {
                    setUvIndex("N/A");
                }
            } catch (error) {
                setUvIndex("N/A");
            }
        }

        fetchUv();

    },[weatherData]);

   


    if (!weatherData || !weatherData.city) {
  return <div>Loading...</div>;
}


const now = new Date();
    const seconds = weatherData.city.timezone * 1000;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
    const Time = new Date(utc + seconds);
    const date = Time.getDate();
    const day = Time.toLocaleDateString('en-US', {weekday: 'long'});
    const month = Time.toLocaleDateString('en-US', {month: 'long'});


    const temp = Math.round(weatherData.list[0].main.temp - 273.15);
    const feelsLike = Math.round(weatherData.list[0].main.feels_like - 273.15);

    const sunriseUtc = weatherData.city.sunrise;
    const timezone = weatherData.city.timezone;
    const sunriseLocal = new Date((sunriseUtc + timezone) * 1000);
    const sunriseTime = sunriseLocal.toUTCString().slice(17,22);

    const sunsetUtc = weatherData.city.sunset;
    const sunsetLocal = new Date((sunsetUtc + timezone) * 1000);
    const sunsetTime = sunsetLocal.toUTCString().slice(17,22);

    const weatherType = weatherData.list[0].weather[0].main;
    let typePic;

    if(weatherType.toLowerCase() === "clouds"){
        typePic = mode ? cloudLight : clouds;
    }else if(weatherType.toLowerCase() === "clear"){
        typePic = mode ? sunLight : sunDark;
    }else{
            typePic = mode ? rainLight : rain;
    }

    const humidityPercent = weatherData.list[0].main.humidity;
    const pressureValue = weatherData.list[0].main.pressure; 
    const windValue = weatherData.list[0].wind.speed;
    const windKmh = (windValue * 3.6).toFixed(1);

   
    return(
        <div className={`hero-section ${mode ? "light-mode" : ""}`}>
            <div className= {`local-time ${mode  ?  "local-time-light" : ""}`}> 
                <div className={`time-info ${mode ? "time-info-light" : ""}`}>
                    <p id='local-city'>
                        {weatherData && weatherData.city ? weatherData.city.name : ""}
                    </p>
                    <p id='local-time'>
                        {currTime}
                    </p>
                    <p id='local-date'>
                        {day}, {date} {month}
                    </p>
                </div>
            </div>

            <div className={`weather-details ${mode ? "weather-details-light" : ""}`}>
                <div className="main-details">

                    <div className="temp-details">
                        <p id= {"temp" + (mode ? "-light" : "")}>{temp}°C</p>

                    <div className="feels-like">
                        <p>Feels like:
                            
                        </p>
                        <p id='feels-like-temp'>{feelsLike}°C</p>
                    </div>
                    </div>

                    <div className="sun-details">
                        <div className="sun-rise">
                        <img src={mode ? sunRiseLight : sunRise} alt="" />
                        <span className='sun-rise-text'>
                            <p>Sunrise</p>
                            <p id='sun-time'>{sunriseTime} AM</p>
                        </span>
                    </div>

                    <div className="sun-set">
                        <img src={mode ? sunSetLight : sunSet} alt="" />
                        <span className='sun-set-text'>
                            <p >Sunset</p>
                            <p id='sun-time'>{sunsetTime} PM</p>
                        </span>
                    </div>
                    </div>


                </div>

                <div className="icon-weather">
                    <img src={typePic} alt="" />
                    <p>
                        {weatherType}
                    </p>
                </div>

                 <div className="extra-details">

                    <div className="extra-up">

                    <div className="humidity">
                        <img src={mode ? humidityLight : humidity} alt="" />
                        
                        <div className="humidity-text">
                            <p id='humidity-cels'>{humidityPercent}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>

                    <div className="wind-speed">
                        <img src={mode ? windLight : windSpeed} alt="" />

                        <div className="wind-text">
                            <p id='wind-up'>{windKmh}km/h</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>

                    </div>

                    <div className="extra-down">

                          <div className="pressure">

                        <img src={mode ? pressureLight : pressure} alt="" />

                        <div className="pressure-text">
                            <p id='pressure-up'>{pressureValue}hPa</p>
                            <p>Pressure</p>
                        </div>
                    </div>

                    <div className="uv">

                        <img src={mode ? uvLight : uvWhite} alt="" />

                        <div className="uv-text">
                            <p id='uv-up'>{uvIndex}</p>
                            <p>UV</p>
                        </div>
                    </div>

                    </div>



                 </div>

            </div>
        </div>
    );
}

export default Hero