import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.css";
import background from "./images/hero.jpg";
import SearchField from "./components/searchbar/SearchField";
import LocationTimeDate from "./components/locationTimeDate/LocationTimeDate";
import WeatherDetails from "./components/weatherDetails/WeatherDetails";
import DaysForecast from "./components/daysForecast/DaysForecast";
import "./App.scss";
import SpinnerVariant from "./components/spinner/Spinner";
import CustomContainer from "./components/customcomponent/CustomComponent";

//  function fetchUrl() {
//     return `https://maps.googleapis.com/maps/api/geocode/json?address=${searchField.toLocaleLowerCase()}&key=${
//       process.env.REACT_APP_GOOGLE_API_KEY
//     }`;
//   }

//   const fetchData = async () => {

//     try {

//       let response = await axios.get(fetchUrl());
//       setCity(response.data.results[0].address_components[0].long_name);
//       let latitude = response.data.results[0].geometry.location.lat;
//       let longitude = response.data.results[0].geometry.location.lng;

//       let openWeatherUrl = await axios.get(
//         `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${
//           unitToggle ? "metric" : "imperial"
//         }&exclude=hourly,minutely&appid=${
//           process.env.REACT_APP_OPEN_WEATHER_API_KEY
//         }`
//       );

//       return openWeatherUrl.data;

//     } catch (error) {
//       if (error.message === "Network Error") {
//         toast.error("Network Error", {
//           style: {
//             fontSize: "3rem",
//           },
//         });
//       } else {
//         toast.error("Enter a valid city", {
//           style: {
//             fontSize: "3rem",
//           },
//         });
//       }

//     }

//   };

function App() {
  const [searchField, setSearchFieled] = React.useState("");
  const [weatherReport, setWeatherReport] = React.useState({});
  const [loadingSpinner, setLoadingSpinner] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [unitToggle, setUnitToggle] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [hideHomepage, setHideHomepage] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showUnit, setShowUnit] = useState(false);

  const handleSwitch = async (nextChecked) => {
    setShowUnit(false);
    setUnitToggle(nextChecked);
  };

  const handleChange = (event) => {
    setSearchFieled(event.target.value);
  };

  const isInputEmpty = searchField.trim() === "";

  const buttonClickRef = React.useRef(false);

  const handleButtonClick = () => {
    // Set the button click ref to true when the button is clicked
    buttonClickRef.current = true;
  };

  const fetchData = React.useCallback(async () => {
    if (!searchField || !buttonClickRef.current) {
      return;
    }
    setHideHomepage(true);
    setShowInfo(true);
    setLoadingSpinner(true);
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
    } catch (error) {
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
    setShowUnit(true);
  }, [searchField, unitToggle]);

  React.useEffect(() => {
    fetchData();
    buttonClickRef.current = false;
  }, [fetchData]);

  console.log(buttonClickRef);

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
        handleButtonClick={handleButtonClick}
      />
      {!hideHomepage ? (
        <CustomContainer
          children={"Check the current weather  situation in any city"}
          background={background}
        />
      ) : (
        ""
      )}

      {showInfo ? (
        <>
          {loadingSpinner ? (
            <SpinnerVariant />
          ) : error ? (
            <CustomContainer children={"Fix the error and search again"} />
          ) : (
            <div className="weather__container">
              <div className="weather__container-row">
                <LocationTimeDate
                  location={city}
                  timestamp={weatherReport?.current?.dt}
                  timezone={weatherReport?.timezone}
                />
                <WeatherDetails
                  temp={weatherReport?.current?.temp}
                  feelsLike={weatherReport?.current?.feels_like}
                  sunrise={weatherReport?.current?.sunrise}
                  sunset={weatherReport?.current?.sunset}
                  timezone={weatherReport?.timezone}
                  weather={weatherReport?.current?.weather[0]}
                  currentWeather={weatherReport?.current}
                  unitToggle={unitToggle}
                  weatherReport={weatherReport}
                  showUnit={showUnit}
                />
              </div>
              <div className="weather__container-row">
                <DaysForecast
                  weatherForecast={weatherReport?.daily}
                  timezone={weatherReport?.timezone}
                  unitToggle={unitToggle}
                  loadingSpinner={loadingSpinner}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

// import React, { useCallback, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import "bootstrap/dist/css/bootstrap.css";
// import background from "./images/hero.jpg";
// import SearchField from "./components/searchbar/SearchField";
// import LocationTimeDate from "./components/locationTimeDate/LocationTimeDate";
// import WeatherDetails from "./components/weatherDetails/WeatherDetails";
// import DaysForecast from "./components/daysForecast/DaysForecast";
// import "./App.scss";
// import SpinnerVariant from "./components/spinner/Spinner";
// import CustomContainer from "./components/customcomponent/CustomComponent";

// function App() {
//   const [searchField, setSearchFieled] = React.useState("");
//   const [weatherReport, setWeatherReport] = React.useState({});
//   const [loadingSpinner, setLoadingSpinner] = React.useState(false);
//   const [city, setCity] = React.useState("");
//   const [unitToggle, setUnitToggle] = React.useState(false);
//   const [error, setError] = React.useState(false);
//   const [hideHomepage, setHideHomepage] = useState(false);
//   const [showInfo, setShowInfo] = useState(false);
//   const [showUnit, setShowUnit] = useState(false);

//   const handleSwitch = async (nextChecked) => {
//     setShowUnit(false);
//     setUnitToggle(nextChecked);
//   };

//   const handleChange = (event) => {
//     setSearchFieled(event.target.value);
//   };

//   const isInputEmpty = searchField.trim() === "";

//   const unit = unitToggle ? "metric" : "imperial";
//   const search = searchField.toLocaleLowerCase();

//   const fetchData = useCallback(async () => {
//     if (!search) {
//       return;
//     }
//     setHideHomepage(true);
//     setShowInfo(true);
//     setLoadingSpinner(true);
//     try {
//        const googleAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
//        let response = await axios.get(googleAPI);
//       setCity(response.data.results[0].address_components[0].long_name);
//       let latitude = response.data.results[0].geometry.location.lat;
//       let longitude = response.data.results[0].geometry.location.lng;
//       let openWeatherUrl = await axios.get(
//         `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${unit}&exclude=hourly,minutely&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
//       );
//       setWeatherReport(openWeatherUrl.data);
//       setError(false);
//     } catch (error) {
//       if (error.message === "Network Error") {
//         toast.error("Network Error", {
//           style: {
//             fontSize: "3rem",
//           },
//         });
//       } else {
//         toast.error("Enter a valid city", {
//           style: {
//             fontSize: "3rem",
//           },
//         });
//       }
//       setError(true);
//     }
//     setLoadingSpinner(false);
//     setShowUnit(true);
//   }, [search, unit]);

//   React.useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return (
//     <div className="container">
//       <Toaster />
//       <SearchField
//         name="Search"
//         placeholder="Search for preferred city..."
//         handleChange={handleChange}
//         fetchData={fetchData}
//         disabledButton={isInputEmpty}
//         handleSwitch={handleSwitch}
//         unitToggle={unitToggle}
//       />
//       {!hideHomepage ? (
//         <CustomContainer
//           children={"Check the current weather  situation in any city"}
//           background={background}
//         />
//       ) : (
//         ""
//       )}

//       {showInfo ? (
//         <>
//           {loadingSpinner ? (
//             <SpinnerVariant />
//           ) : error ? (
//             <CustomContainer children={"Fix the error and search again"} />
//           ) : (
//             <div className="weather__container">
//               <div className="weather__container-row">
//                 <LocationTimeDate
//                   location={city}
//                   timestamp={weatherReport?.current?.dt}
//                   timezone={weatherReport?.timezone}
//                 />
//                 <WeatherDetails
//                   temp={weatherReport?.current?.temp}
//                   feelsLike={weatherReport?.current?.feels_like}
//                   sunrise={weatherReport?.current?.sunrise}
//                   sunset={weatherReport?.current?.sunset}
//                   timezone={weatherReport?.timezone}
//                   weather={weatherReport?.current?.weather[0]}
//                   currentWeather={weatherReport?.current}
//                   unitToggle={unitToggle}
//                   weatherReport={weatherReport}
//                   showUnit={showUnit}
//                 />
//               </div>
//               <div className="weather__container-row">
//                 <DaysForecast
//                   weatherForecast={weatherReport?.daily}
//                   timezone={weatherReport?.timezone}
//                   unitToggle={unitToggle}
//                   loadingSpinner={loadingSpinner}
//                 />
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }

// export default App;
