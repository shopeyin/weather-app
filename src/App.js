/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.css";
import SearchField from "./components/searchbar/SearchField";
import LocationTimeDate from "./components/locationTimeDate/LocationTimeDate";
import WeatherDetails from "./components/weatherDetails/WeatherDetails";
import DaysForecast from "./components/daysForecast/DaysForecast";
import ErrorComponent from "./components/error/ErrorComponent";
import "./App.scss";
import SpinnerVariant from "./components/spinner/Spinner";
import HomePage from "./components/homepage/HomePage";

function App() {

  const [searchField, setSearchFieled] = React.useState("");
  const [weatherReport, setWeatherReport] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [loadingSpinner, setLoadingSpinner] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [unitToggle, setUnitToggle] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSwitch = (nextChecked) => {
    setUnitToggle(nextChecked);
  };

  const handleChange = (event) => {
    setSearchFieled(event.target.value);
  };

  const fetchData = async () => {
    setLoadingSpinner(true);
    if (isInputEmpty) {
      return;
    }
    try {
      const googleAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchField.toLocaleLowerCase()}&key=${
        process.env.REACT_APP_GOOGLE_API_KEY
      }`;
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
      setError(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        toast.error("Network Error", {
          style: {
            fontSize: "3rem",
          },
        });
      } else {
        toast.error("Enter a valid city", {
          style: {
            fontSize: "3rem",
          },
        });
      }
      setError(true);
    }
    setLoadingSpinner(false);
  };
  const isInputEmpty = searchField.trim() === "";

  React.useEffect(() => {
    fetchData();
  }, [unitToggle]);

 
  return (
    <div className="container">
      <Toaster />

      <SearchField
        name="Search"
        placeholder="Search for preferred city..."
        handleChange={handleChange}
        fetchData={fetchData}
        disabledButton={isInputEmpty}
        handleSwitch={handleSwitch}
        unitToggle={unitToggle}
      />

      {loading ? (
        <HomePage />
      ) : (
        <>
          {loadingSpinner ? (
            <SpinnerVariant />
          ) : (
            <>
              {error ? (
                <ErrorComponent />
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
                      unitToggle={unitToggle}
                    />
                  </div>
                  <div className="weather__container-row">
                    <DaysForecast
                      weatherForecast={weatherReport.daily}
                      timezone={weatherReport.timezone}
                      unitToggle={unitToggle}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
