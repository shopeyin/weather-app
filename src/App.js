import React from "react";
import axios from "axios";
import "./App.scss";
import SearchField from "./components/searchbar/SearchField";
import LocationTimeDate from "./components/locationTimeDate/LocationTimeDate";
import WeatherDetails from "./components/weatherDetails/WeatherDetails";
import DaysForecast from "./components/daysForecast/DaysForecast";
import HourlyForecast from "./components/hourlyForecast/HourlyForecast";

function App() {
  const [searchField, setSearchFieled] = React.useState("");
  const [weatherReport, setWeatherReport] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [city, setCity] = React.useState("");
  const googleAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchField}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

  const handleChange = (event) => {
    setSearchFieled(event.target.value);
  };
  const fetchData = async () => {
    try {
      let response = await axios.get(googleAPI);
      setCity(response.data.results[0].address_components[0].long_name);
      let latitude = response.data.results[0].geometry.location.lat;
      let longitude = response.data.results[0].geometry.location.lng;
      let unit = "metric";
      let openWeatherUrl = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${unit}&exclude=hourly,minutely&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      );
      setWeatherReport(openWeatherUrl.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(weatherReport);
  return (
    <div className="container">
      <SearchField
        name="Search"
        placeholder="Search for preferred city..."
        handleChange={handleChange}
        fetchData={fetchData}
      />
      {loading ? (
        "Loading"
      ) : (
        <div className="weather__container">
          <div className="weather__container-row">
            <LocationTimeDate
              location={city}
              timestamp={weatherReport.current.dt}
              timezone={weatherReport.timezone}
            />
            <WeatherDetails
              temp={weatherReport.current.temp}
              feelsLike={weatherReport.current.feels_like}
              sunrise = {weatherReport.current.sunrise}
              sunset = {weatherReport.current.sunset}
            />
          </div>
          <div className="weather__container-row">
            <DaysForecast />
            <HourlyForecast />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
