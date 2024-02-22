import React, { useEffect, useState } from "react";
import "./App.css";
import getWeather from "./weather";
import useGeolocation from "./useGeolocation";
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
      const fetchDefaultLocationData = async () => {
        try {
          const data = await getWeather(
            defaultLocation.latitude,
            defaultLocation.longitude,
            units
          );
          setDefaultLocation((prev) => ({
            ...prev,
            data,
          }));
        } catch (error) {
          console.error("Error fetching default weather data:", error);
        }
      };
      fetchDefaultLocationData();
    }
  }, [defaultLocation, units]);

  useEffect(() => {
    if (
      searchedLocation &&
      searchedLocation.searchLat &&
      searchedLocation.searchLong
    ) {
      const fetchSearchedLocationData = async () => {
        try {
          const data = await getWeather(
            searchedLocation.searchLat,
            searchedLocation.searchLong,
            units
          );
          setDefaultLocation({
            latitude: searchedLocation.searchLat,
            longitude: searchedLocation.searchLong,
            data: data,
          });
        } catch (error) {
          console.error("Error fetching searched weather data:", error);
        }
      };
      fetchSearchedLocationData();
    }
  }, [searchedLocation, units]);

  if (locationAvailable === null) {
    return <h2>Checking location availability...</h2>;
  }

  if (!locationAvailable) {
    return <h2>Location Unavailable; allow browser to access location</h2>;
  }

  if (!defaultLocation || !defaultLocation.data) {
    return <h2>Loading default weather data...</h2>;
  }

  return (
    <div>
      <Header
        units={units}
        setUnits={setUnits}
        setDefaultLocation={setDefaultLocation}
        setSearchedLocation={setSearchedLocation}
      />
      <CurrentWeather searchedLocation={searchedLocation} city={city} />
    </div>
  );
};

export default App;
