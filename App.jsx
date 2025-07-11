import React, {useState,useEffect} from 'react';
import NavDark from './NavDark.jsx';
import Hero from './Hero.jsx';
import Footer from './Footer.jsx';

function App() {

  const [weatherData,setWeatherData] = useState();
  const [mode,setMode] = useState(false);

  useEffect(() => {
    async function defaultWeather(){
              const apiKey = "5f090676c8524eb310837989abe77bdb";
              const URL = `http://api.openweathermap.org/data/2.5/forecast?q=Lahore&appid=${apiKey}`; 
              const response = await fetch(URL);
              const data = await response.json();
              setWeatherData(data);
              // console.log(data);
    }
    defaultWeather();
  },[]);

  return (
    <>
     <NavDark setWeatherData = {setWeatherData}
              setMode = {setMode}
              mode = {mode}
               />
     <Hero weatherData = {weatherData}
          mode = {mode} />
     <Footer weatherData = {weatherData} 
              mode = {mode}/>
    </>
  )
}

export default App
