import { createContext, useState } from "react";

export const WeatherDataContext = createContext({
  weatherData: null,
  setWeatherData: () => null,
  units: "",
  setUnits: () => null,
  searchedLocation: null,
  setsearchedLocation: () => null,
});

export const WeatherDataProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState("fahrenheit");
  const [searchedLocation, setSearchedLocation] = useState(null);
  const value = {
    weatherData,
    setWeatherData,
    units,
    setUnits,
    searchedLocation,
    setSearchedLocation,
  };

  return (
    <WeatherDataContext.Provider value={value}>
      {children}
    </WeatherDataContext.Provider>
  );
};
