import React from "react";
import sunriseImg from "../images/sunrise.png";
import sunsetImg from "../images/sunset.png";
import "./weatherdetails.scss";
function WeatherDetails({ temp, feelsLike, sunrise, sunset }) {
  return (
    <div className="weather__details">
      <div className="weather__details-main">
        <div className="temp">
          <h2>
            {Math.floor(temp)}
            <span>&#176;C</span>
          </h2>
          <p>
            Feels like:{Math.floor(feelsLike)}
            <span>&#176;C</span>
          </p>
        </div>
        <div className="sunrise-sunset">
          <div className="sun">
            <figure className="sun__logo">
              <img src={sunriseImg} alt="sunrise" className="sun__logo-image"/>
            </figure>
            <div className="">
              <p>Sunrise</p>
              <p>Date and time</p>
            </div>
          </div>
          <div className="sun">
            <figure className="sun__logo">
              <img src={sunsetImg} alt="sunrise" className="sun__logo-image"/>
            </figure>
            <div className="">
              <p>Sunset</p>
              <p>Date and time</p>
            </div>
          </div>
        </div>
      </div>
      <div className="weather__details-icon"></div>
      <div className="weather__details-extra"></div>
    </div>
  );
}

export default WeatherDetails;
