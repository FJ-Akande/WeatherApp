import React, { useEffect, useState } from "react";
import "./App.css";
// import getWeather from "./weather";

const App = () => {
  const [units, setUnits] = useState("metric");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [locationAvail, setLocationAvail] = useState(null);

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
    const apiKey = "4200dba8c15f34677364a900779657fc";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const groupedData = data.list.reduce((days, row) => {
          const date = row.dt_txt.split(" ")[0];
          days[date] = [...(days[date] ? days[date] : []), row];
          return days;
        }, {});
        setForecastData(groupedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [latitude, longitude, units]);

  function getMax(arr, attr) {
    return Math.max.apply(
      Math,
      arr.map((item) => item.main[attr])
    );
  }

  function getMin(arr, attr) {
    return Math.min.apply(
      Math,
      arr.map((item) => item.main[attr])
    );
  }

  function getTemperatureForFirstDate(forecastData) {
    // Get the first date from the keys of the forecastData object
    const firstDate = Object.keys(forecastData)[0];

    // Check if forecastData is empty or if there's no data for the first date
    if (
      !firstDate ||
      !forecastData[firstDate] ||
      forecastData[firstDate].length === 0
    ) {
      return null; // Handle this case appropriately
    }

    // Get the temperature from the first forecast object for the first date
    const firstForecast = forecastData[firstDate][0];
    const temp = firstForecast.main.temp;

    return temp;
  }

  // temp = getTemperatureForFirstDate(forecastData);
  // console.log(temp);

  if (!locationAvail) {
    return <h2>Location Unavailable; allow browser to access location</h2>;
  }

  if (!forecastData) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {Object.keys(forecastData).map((date) => (
        <div key={date}>
          <h2>Date: {date}</h2>
          <p>RowCount: {forecastData[date].length}</p>
          <p>MaxTemp: {getMax(forecastData[date], "temp_max")}</p>
          <p>MinTemp: {getMin(forecastData[date], "temp_min")}</p>
          <p>MaxHumidity: {getMax(forecastData[date], "humidity")}</p>
          <p>Temp: {getMax(forecastData[date], "temp")}</p>
          <p>Temp: {getTemperatureForFirstDate(forecastData)};</p>
        </div>
      ))}
    </div>
  );
};

export default App;
