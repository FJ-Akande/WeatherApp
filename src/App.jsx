import React, { useEffect, useState } from "react";
import "./App.css";
import getWeather from "./weather";
import SearchBox from "./components/searchbox/SearchBox.component";
// import useForecastData from "./useForecastData";

const App = () => {
  const [units, setUnits] = useState("fahrenheit");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationAvail, setLocationAvail] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
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
      const data = await getWeather(latitude, longitude, units);
      setResponse(data);
    };
    getData();
  }, [latitude, longitude, units]);

  if (!locationAvail) {
    return <h2>Location Unavailable; allow browser to access location</h2>;
  }

  if (!response) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <SearchBox units={units} />
      <p>Weather App</p>
      <p>{response.current.temperature_2m}</p>
    </div>
  );
};

export default App;
