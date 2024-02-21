import React, { useEffect, useState } from "react";
import "./App.css";
import getWeather from "./weather";
import SearchBox from "./components/searchbox/SearchBox.component";

const App = () => {
  const [units, setUnits] = useState("fahrenheit");
  const [locationAvail, setLocationAvail] = useState(null);
  const [defaultLocation, setDefaultLocation] = useState({
    latitude: null,
    longitude: null,
    data: null,
  });
  const [searchedLocation, setSearchedLocation] = useState({
    searchLat: "",
    searchLong: "",
    searchedLocation: "",
    data: null,
  });

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setDefaultLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationAvail(true);
        });
      } else {
        setLocationAvail(false);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getWeather(
        defaultLocation.latitude,
        defaultLocation.longitude,
        units
      );
      setDefaultLocation((prev) => ({
        ...prev,
        data,
      }));
    };
    getData();
  }, [defaultLocation.latitude, defaultLocation.longitude, units]);

  useEffect(() => {
    if (searchedLocation.searchLat && searchedLocation.searchLong) {
      const getMainLocationData = async () => {
        const searchData = await getWeather(
          searchedLocation.searchLat,
          searchedLocation.searchLong,
          units
        );
        setSearchedLocation((prev) => ({
          ...prev,
          searchData,
        }));
        console.log(searchData);
      };
      getMainLocationData();
    }
  }, [searchedLocation.searchLat, searchedLocation.searchLong, units]);

  if (!locationAvail) {
    return <h2>Location Unavailable; allow browser to access location</h2>;
  }

  if (!defaultLocation.data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <SearchBox units={units} setSearchedLocation={setSearchedLocation} />
      <p>Weather App</p>
      <p>{defaultLocation.data.current.temperature_2m}</p>
    </div>
  );
};

export default App;
