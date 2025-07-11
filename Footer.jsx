import './Footer.css';
import React,{useState} from 'react';
import clouds from './assets/clouds.png';
import clear from './assets/clear.png';
import navigation from './assets/navigation.png';
import clouds2 from './assets/cloudy-weather.png';
import sunDark from './assets/sun-dark.png';
import rain from './assets/rainy.png';
import rainLight from './assets/rain-light3.png';
import sunLight from './assets/sun-light.png';
import cloudLight from './assets/cloud-light.png';




function Footer({weatherData,mode}){

     if (!weatherData || !weatherData.city) {
  return <div>Loading...</div>;
}

    const  nextDates = [];
    const nextWeatherType = [];
    const nextDayTemp = [];
   
    for(let i = 7; i < weatherData.list.length; i+=8){
        const nextDate = weatherData.list[i].dt_txt;
    const nextDateObj = new Date(nextDate);
   
    nextDates.push({
          day: nextDateObj.toLocaleDateString('en-US', { weekday: 'long' }),
        month: nextDateObj.toLocaleDateString('en-US', { month: 'long' }),
     dateNum: nextDateObj.getDate()
    });

    const nextweather = weatherData.list[i].weather[0].main;

    nextWeatherType.push({
        main: nextweather
    });

    const nextTemp = Math.round(weatherData.list[i].main.temp - 273.15);

    nextDayTemp.push({
        temp: nextTemp
    });
    }

    let nexthours = [];
    const hourWeathertype = [];
    const hourlyTemp = [];
    const hourlyWind = [];

    for(let i=1 ; i<=5 ; i++){
        const nextTime = weatherData.list[i].dt_txt;
        let nextHourTime = new Date(nextTime);

        const nextHourWeather = weatherData.list[i].weather[0].main;

        const nextHourTemp = Math.round(weatherData.list[i].main.temp - 273.15);

        const nextHourWind = (weatherData.list[i].wind.speed * 3.6).toFixed(0);

         nexthours.push({
            hour: nextHourTime.toLocaleTimeString([], {hour: "2-digit",minute:"2-digit", hour12:true}).slice(0,5)
        });

        hourWeathertype.push({
            weather: nextHourWeather
        });

        hourlyTemp.push({
            temp: nextHourTemp
        });

        hourlyWind.push({
            wind: nextHourWind
        })

       
    }
    
    let nextDayPic = [];
    let nextHourPic = [];
    for(let i = 0; i<5; i++){
        if(nextWeatherType[i].main === "Clouds"){
            nextDayPic.push({
                value: mode ? cloudLight : clouds2
            });
        }else if(nextWeatherType[i].main === "Clear"){
            nextDayPic.push({
                value: mode ? sunLight : sunDark
            });
        }else{
            nextDayPic.push({
                value:  mode ? rainLight : rain
            });
        }

        if(hourWeathertype[i].weather === "Clouds"){
            nextHourPic.push({
                value: mode ? cloudLight : clouds2
            });
        }else if(hourWeathertype[i].weather === "Clear"){
            nextHourPic.push({
                value: mode ? sunLight : sunDark
            });
        }else{
            nextHourPic.push({
                value: mode ? rainLight : rain
            });
        }

    }

    // console.log(nextHourPic);
 
    return(
        <div className={`footer ${mode ? "light-mode" : ""}`}>

       

        <div className={`weather-forecast ${mode ? "weather-forecast-light" : ""}`}>
            <div className="foot-head">
                <p>5 Days Forecast:</p>
            </div>

            <div className="foreCast-content">

        <div className="icons">

                <img src={nextDayPic[0].value} alt="" />
                <img src={nextDayPic[1].value} alt="" />
                <img src={nextDayPic[2].value} alt="" />
                <img src={nextDayPic[3].value} alt="" />
                <img src={nextDayPic[4].value} alt="" />
            </div>

            <div className="dail-temp">
                
                <p className='daily-cel'> {nextDayTemp[0].temp} °C</p>
                <p className='daily-cel'> {nextDayTemp[1].temp} °C</p>
                <p className='daily-cel'> {nextDayTemp[2].temp} °C</p>
                <p className='daily-cel'> {nextDayTemp[3].temp} °C</p>
                <p className='daily-cel'> {nextDayTemp[4].temp} °C</p>
    
            </div>

            <div className="daily-date">
                
                <p className='days'>{nextDates[0].day} , {nextDates[0].dateNum} {nextDates[0].month.slice(0,3)}</p>
                <p className='days'>{nextDates[1].day} , {nextDates[1].dateNum} {nextDates[1].month.slice(0,3)}</p>
                <p className='days'>{nextDates[2].day} , {nextDates[2].dateNum} {nextDates[2].month.slice(0,3)}</p>
                <p className='days'>{nextDates[3].day} , {nextDates[3].dateNum} {nextDates[3].month.slice(0,3)}</p>
                <p className='days'>{nextDates[4].day} , {nextDates[4].dateNum} {nextDates[4].month.slice(0,3)}</p>

    
            </div>

            </div>

            
        </div>

        <div className={`hourly-forecast ${mode ? "hourly-forecast-light" : ""}`}>

            <div className="hourly-top">
                <p>Hourly Forecast:</p>
            </div>

            <div className="hourly-groups">
                <div className={`group2 ${mode ? "group2-light-3" : ""}`}>
                    <p> {nexthours[0].hour} </p>

                    <div className="hour-temp">
                        <img src={nextHourPic[0].value} alt="" />
                        <p> {hourlyTemp[0].temp} °C</p>
                    </div>

                    <div className="hour-wind">
                        <img src={navigation} alt="" />
                        <p> {hourlyWind[0].wind} km/h</p>
                    </div>
                </div>

                <div className={`group2 ${mode ? "group2-light-3" : ""}`}>
                    <p> {nexthours[1].hour} </p>

                    <div className="hour-temp">
                        <img src={nextHourPic[1].value} alt="" />
                        <p>{hourlyTemp[1].temp} °C</p>
                    </div>

                    <div className="hour-wind">
                        <img src={navigation} alt="" />
                        <p>{hourlyWind[1].wind}  km/h</p>
                    </div>
                </div>

                <div className={`group2 ${mode ? "group2-light-3" : ""}`}>
                    <p> {nexthours[2].hour} </p>

                    <div className="hour-temp">
                        <img src={nextHourPic[2].value} alt="" />
                        <p>{hourlyTemp[2].temp} °C</p>
                    </div>

                    <div className="hour-wind">
                        <img src={navigation} alt="" />
                        <p>{hourlyWind[2].wind}  km/h</p>
                    </div>
                </div>

                <div className={`group2 ${mode ? "group2-light-2" : ""}`}>
                    <p> {nexthours[3].hour}</p>

                    <div className="hour-temp">
                        <img src={nextHourPic[3].value} alt="" />
                        <p>{hourlyTemp[3].temp} °C</p>
                    </div>

                    <div className="hour-wind">
                        <img src={navigation} alt="" />
                        <p>{hourlyWind[3].wind}  km/h</p>
                    </div>
                </div>

                <div className={`group2 ${mode ? "group2-light-2" : ""}`}>
                    <p> {nexthours[4].hour} </p>

                    <div className="hour-temp">
                        <img src={nextHourPic[4].value} alt="" />
                        <p>{hourlyTemp[4].temp} °C</p>
                    </div>

                    <div className="hour-wind">
                        <img src={navigation} alt="" />
                        <p>{hourlyWind[4].wind}  km/h</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Footer