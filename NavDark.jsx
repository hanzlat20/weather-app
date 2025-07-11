import './NavDark.css';
import React,{useState} from 'react';
import searchIcon from './assets/search 1.png'
import currentLocation from './assets/current location icon.png';
import lightSearch from './assets/search-light.png';
import './index.css';

const apiKey = "5f090676c8524eb310837989abe77bdb";

function NavDark({setWeatherData,mode,setMode}){

    const [modeText,setmodeText] = useState("Dark Mode");
    const [modeColor,setmodeColor] = useState("fff");
    const [city,setCity] = useState("");
    const [searchImg,setSearchImg] = useState(searchIcon);
    const [suggestions,setSuggetions] = useState([]);

    const addMove = () => {
        if(mode === false){
            setMode(true);
            setmodeText("Light Mode");
            setmodeColor("black");

            document.body.classList.add("light-bg");
            document.body.classList.remove("dark-bg");

            document.querySelector(".rect-mode").classList.add("rect-light");

            document.querySelector(".search-bar").classList.add("search-bar-light");

            document.querySelector(".search-content").classList.add("search-content-light");

            setSearchImg(lightSearch);

            document.querySelector(".location").classList.add("location-light");
        }
        else{
            setMode(false);
            setmodeText("Dark Mode");
            setmodeColor("#fff");
            document.body.classList.add("dark-bg");
            document.body.classList.remove("light-bg");

            document.querySelector(".rect-mode").classList.remove("rect-light");
            document.querySelector(".search-bar").classList.remove("search-bar-light");

            document.querySelector(".search-content").classList.remove("search-content-light");

            setSearchImg(searchIcon);

            document.querySelector(".location").classList.remove("location-light");
        }


    }

    function inputChange (evt){
        setCity(evt.target.value);
        fetchData(evt.target.value);
    }

    async function handleSuggestions(cityObj){
        setCity(cityObj.name);
        setSuggetions([]);
         const weatherData = await getWeatherdata(cityObj.name);
    useData(weatherData);
    }

     function currLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const URL =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

                    let response = await fetch (URL);
                    const currLoc = await response.json();
                    setCity(currLoc.city.name);

                    const weatherData = await getWeatherdata(currLoc.city.name);
                    useData(weatherData);
                }
            )

        }
    }

    async function inputReceived(evt){
        evt.preventDefault();
        let weatherData;
        if (city.trim()){
           weatherData = await getWeatherdata(city);
        }
     

        
        useData(weatherData);
        setSuggetions([]);
    }

    function useData(data){
        setWeatherData(data);
    }

    async function getWeatherdata(city){

        const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        
        let response = await fetch(URL);
        // console.log(response);
        return response.json();
    }

    async function fetchData(value){
        if(!value) {
            setSuggetions([]);
            return;
        }
        const URl = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`;
        let response = await fetch(URl);
        const result = await response.json();
        setSuggetions(result);
        console.log(suggestions);
    }


   
    return(
        <>
        <div className="nav-content">

                <div className="mode" >
            <div className="rect-mode" onClick={addMove}>
                <div className= {`circle-mode ${mode ? "move-light" : "move-dark"}`}>

                </div>
            </div>

            <p style={{color : modeColor}}> {modeText} </p>
        </div>

        <form className="search-bar" onSubmit={inputReceived} autoComplete='off'>
                <input type="search" className='search-content' placeholder='Search for your preffered city...' value={city} onChange={inputChange}/>
                <img src={searchImg} alt="search" />
                
         {suggestions.length > 0 && (
            <div className= {`search-result ${mode ? "search-result-light" : ""}`}>
                   <ul className={`search-result-content ${mode ? "search-result-content-light" : ""}`}>
                    {suggestions.map((cityObj,idx) => (
                        <li key={idx} onClick={() => handleSuggestions(cityObj)}>
                         {cityObj.name}{cityObj.state ? `, ${cityObj.state}` : ''}, {cityObj.country}
                        </li>
                    ))}
                   </ul>
             </div>
         )}
        </form>

        <div className="location" onClick={currLocation}>
            <img src={currentLocation} alt="" />
            <p>Current Location</p>
        </div>

        </div>
        
        </>
    );
}

export default NavDark