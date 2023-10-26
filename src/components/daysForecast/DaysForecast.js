import React from "react";
import moment from "moment-timezone";
import "./daysforecast.style.scss";
import Table from "react-bootstrap/Table";

function DaysForecast({ weatherForecast, timezone }) {
  const nextFiveDailyweather = weatherForecast.slice(1, 6);
 
  return (
    <div className="daysForecast">
      <h2>5 Days Forecast</h2>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Morning</th>
            <th>Afternoon</th>
            <th>Evening</th>
            <th>Night</th>
            <th>Day</th>
          </tr>
        </thead>
        <tbody>
          {nextFiveDailyweather.map((daily) => {
            return (
              <tr key={daily.dt}>
                <td>
                  <figure className="weather_forecast-icon">
                    <img
                      src={`https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`}
                      alt="weather_icon"
                    />
                  </figure>
                </td>
                <td>
                  {" "}
                  {Math.floor(daily.temp.morn)} <span>&#176;C</span>
                </td>
                <td>
                  {" "}
                  {Math.floor(daily.temp.day)} <span>&#176;C</span>
                </td>
                <td>
                  {" "}
                  {Math.floor(daily.temp.eve)} <span>&#176;C</span>
                </td>
                <td>
                  {" "}
                  {Math.floor(daily.temp.night)} <span>&#176;C</span>
                </td>
                <td>
                  {moment.unix(daily.dt).tz(timezone).format("dddd MMMM Do YYYY")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default DaysForecast;
