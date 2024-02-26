import React, { useEffect, useState } from "react";
import "./App.css";
import getWeather from "./services/weather";
import useGeolocation from "./hooks/useGeolocation";
import Header from "./components/header/header.component";
import CurrentWeather from "./components/current-weather/current-weather.component";

const App = () => {
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
          setDefaultLocation((prev) => ({
            ...prev,
            data,
          }));
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
      const fetchSearchedLocationData = () => {
        getWeather(
          searchedLocation.searchLat,
          searchedLocation.searchLong,
          units
        )
          .then((data) => {
            setDefaultLocation({
              latitude: searchedLocation.searchLat,
              longitude: searchedLocation.searchLong,
              city: searchedLocation.searchedRadar,
              data: data,
            });
            console.log(data);
          })
          .catch((error) => {
            console.error("Error fetching searched weather data:", error);
          });
      };
      fetchSearchedLocationData();
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

  if (!defaultLocation || !defaultLocation.data) {
    return <h2>Loading weather data...</h2>;
  }

  return (
    <div>
      <Header
        units={units}
        setUnits={setUnits}
        setDefaultLocation={setDefaultLocation}
        setSearchedLocation={setSearchedLocation}
      />
      <CurrentWeather defaultLocation={defaultLocation} />
    </div>
  );
};

export default App;
