import React from "react";
import { useMemo } from "react";
import { ICON_MAP } from "../utils/iconmap/iconMap.utils";
// import "../../assets/icons"
// import "../../assets/weather-icons"

const CurrentWeather = ({ defaultLocation }) => {
  if (!defaultLocation) {
    return <p>Loading...</p>;
  }
  const { city, data } = defaultLocation;
  const {
    current: { temperature, precipitation, weatherCode },
  } = data;
  // const iconFileName = ICON_MAP.get(weatherCode);
  const iconFileName = useMemo(() => ICON_MAP.get(weatherCode), [weatherCode]);
  const iconPath = iconFileName
    ? `../../assets/weather-icons/${iconFileName}.svg`
    : null;

  return (
    <>
      <div className="current-weather-container">
        <div className="current-container">
          <div>
            <h2>{city}</h2>
            <p>Chance of rain: {precipitation}%</p>
            <h1>{temperature}&deg;</h1>
            {iconPath && <img src={iconPath} alt="Weather Icon" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
