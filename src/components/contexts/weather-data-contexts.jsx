import { createContext, useState } from "react";

export const WeatherDataContext = createContext({
  weatherData: null,
  setWeatherData: () => null,
});

export const WeatherDataProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const value = { weatherData, setWeatherData };

  return (
    <WeatherDataContext.Provider value={value}>
      {children}
    </WeatherDataContext.Provider>
  );
};
