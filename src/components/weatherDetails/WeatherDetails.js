import React from "react";
import sunriseImg from "../images/sunrise.png";
import sunsetImg from "../images/sunset.png";
import humidityImg from "../images/humidity.png";
import windspeedImg from "../images/wind.png";
import pressureImg from "../images/pressure.png";
import uvImg from "../images/uv.png";
import moment from "moment-timezone";
import "./weatherdetails.scss";
function WeatherDetails({
  temp,
  feelsLike,
  sunrise,
  sunset,
  timezone,
  weather,
  currentWeather,
  unitToggle,
}) {
  let sunriseTime = moment.unix(sunrise).tz(timezone).format("HH:mm");
  let sunsetTime = moment.unix(sunset).tz(timezone).format("HH:mm");

  return (
    <div className="weather__details">
      <div className="weather__details-main">
        <div className="temp">
          <h2>
            {Math.floor(temp)}
            <span>&#176;{unitToggle ? "C" : "F"}</span>
          </h2>
          <p>
            Feels like:{Math.floor(feelsLike)}
            <span>&#176;C</span>
          </p>
        </div>
        <div className="sunrise-sunset">
          <div className="sun">
            <figure className="sun__logo">
              <img src={sunriseImg} alt="sunrise" className="sun__logo-image" />
            </figure>
            <div className="">
              <p>Sunrise</p>
              <p>{sunriseTime}</p>
            </div>
          </div>
          <div className="sun">
            <figure className="sun__logo">
              <img src={sunsetImg} alt="sunrise" className="sun__logo-image" />
            </figure>
            <div className="">
              <p>Sunset</p>
              <p>{sunsetTime}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="weather__details-icon">
        <figure className="weather_icon-image">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
            alt="weather_icon"
          />
        </figure>
        <figcaption>{weather.description}</figcaption>
      </div>
      <div className="weather__details-extra">
        <div className="weather__details-row">
          <div className="weather-image">
            <figure>
              <img src={humidityImg} alt="humidity" />
            </figure>
            <h3>{currentWeather.humidity}</h3>
            <p>Humidity</p>
          </div>
          <div className="weather-image">
            <figure>
              <img src={windspeedImg} alt="windspeed" />
            </figure>
            <h3>{currentWeather.wind_speed}</h3>
            <p>Wind Speed</p>
          </div>
        </div>
        <div className="weather__details-row">
          <div className="weather-image">
            <figure>
              <img src={pressureImg} alt="pressure" />
            </figure>

            <h3>{currentWeather.pressure}</h3>
            <p>Pressure</p>
          </div>
          <div className="weather-image">
            <figure>
              <img src={uvImg} alt="uv" className="" />
            </figure>
            <h3>{currentWeather.uvi}</h3>
            <p>UV</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
