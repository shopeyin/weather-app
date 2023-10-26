import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Switch from "react-switch";
import SearchField from "./components/searchbar/SearchField";
import LocationTimeDate from "./components/locationTimeDate/LocationTimeDate";
import WeatherDetails from "./components/weatherDetails/WeatherDetails";
import DaysForecast from "./components/daysForecast/DaysForecast";
import "./App.scss";

function App() {
  const [searchField, setSearchFieled] = React.useState("");
  const [weatherReport, setWeatherReport] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [city, setCity] = React.useState("");
  const [unitToggle, setUnitToggle] = React.useState(false);

  const handleSwitch = (nextChecked) => {
    setUnitToggle(nextChecked);
  };

  // React.useEffect(()=>{
  //     console.log('useEffect')

  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(function(position) {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;
  //         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  //       });
  //     } else {
  //       console.log("Geolocation is not supported by this browser.");
  //     }
  // },[])

  const handleChange = (event) => {
    setSearchFieled(event.target.value);
  };
  const fetchData = async () => {
    try {
      const googleAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchField}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      let response = await axios.get(googleAPI);
      setCity(response.data.results[0].address_components[0].long_name);
      let latitude = response.data.results[0].geometry.location.lat;
      let longitude = response.data.results[0].geometry.location.lng;

      let openWeatherUrl = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${
          unitToggle ? "metric" : "imperial"
        }&exclude=hourly,minutely&appid=${
          process.env.REACT_APP_OPEN_WEATHER_API_KEY
        }`
      );
      setWeatherReport(openWeatherUrl.data);
      setLoading(false);
    } catch (error) {
      toast.error("Enter a valid city", {
        style: {
          fontSize: "3rem",
        },
      });
    }
  };

  const isInputEmpty = searchField.trim() === "";

  return (
    <div className="container">
      <label>
        <Switch
          onChange={handleSwitch}
          checked={unitToggle}
          className="react-switch"
          checkedIcon={<div>Celsius</div>} 
          uncheckedIcon={<div>F</div>}
        />
      </label>
      <Toaster />
      <SearchField
        name="Search"
        placeholder="Search for preferred city..."
        handleChange={handleChange}
        fetchData={fetchData}
        disabledButton={isInputEmpty}
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
              sunrise={weatherReport.current.sunrise}
              sunset={weatherReport.current.sunset}
              timezone={weatherReport.timezone}
              weather={weatherReport.current.weather[0]}
              currentWeather={weatherReport.current}
            />
          </div>
          <div className="weather__container-row">
            <DaysForecast
              weatherForecast={weatherReport.daily}
              timezone={weatherReport.timezone}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
