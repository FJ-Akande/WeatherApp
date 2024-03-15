import { useEffect, useState, useContext } from "react";
import getWeather from "./services/weather/weather.services";
import useGeolocation from "./hooks/geolocation/useGeolocation.hooks";
import { WeatherDataContext } from "./components/contexts/weather-data-contexts";
import Header from "./components/header/header.component";
import CurrentWeather from "./components/current-weather/current-weather.component";
import HourlyForecast from "./components/hourly-forecast/hourly-forecast.component";
import CurrentWeatherDetails from "./components/current-weather-details/current-weather-details.component";
import DailyWeather from "./components/daily-weather/daily-weather.component";
import "./App.css";

const App = () => {
  const { weatherData, setWeatherData } = useContext(WeatherDataContext);
  const [units, setUnits] = useState("fahrenheit");
  const { location, city, locationAvailable } = useGeolocation();
  const [defaultLocation, setDefaultLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);

  useEffect(() => {
    if (location) {
      setDefaultLocation(location);
    }
  }, [location]);

  useEffect(() => {
    if (defaultLocation) {
      getWeather(defaultLocation.latitude, defaultLocation.longitude, units)
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error("Error fetching default weather data:", error);
        });
    }
  }, [defaultLocation, units]);

  useEffect(() => {
    if (
      searchedLocation &&
      searchedLocation.searchLat &&
      searchedLocation.searchLong
    ) {
      getWeather(searchedLocation.searchLat, searchedLocation.searchLong, units)
        .then((data) => {
          setDefaultLocation({
            latitude: searchedLocation.searchLat,
            longitude: searchedLocation.searchLong,
            city: searchedLocation.searchedRadar,
          });
          setWeatherData(data);
        })
        .catch((error) => {
          console.error("Error fetching searched weather data:", error);
        });
    }
  }, [searchedLocation, units]);

  if (locationAvailable === null) {
    return <h2>Checking location availability...</h2>;
  }

  if (!locationAvailable) {
    return (
      <h2>
        There was an error getting your location. Please allow us to use your
        location and refresh the page.
      </h2>
    );
  }

  if (!weatherData) {
    return <h2>Loading weather data...</h2>;
  }

  return (
    <div className="body-container">
      <Header
        units={units}
        setUnits={setUnits}
        setDefaultLocation={setDefaultLocation}
        setSearchedLocation={setSearchedLocation}
      />
      <div className="hero-sidebar-wrapper">
        <section className="hero-section">
          <CurrentWeather defaultLocation={defaultLocation} />
          <HourlyForecast />
          <CurrentWeatherDetails />
        </section>
        <DailyWeather />
      </div>
    </div>
  );
};

export default App;
