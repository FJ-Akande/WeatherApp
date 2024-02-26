import React from "react";
import { ICON_MAP } from "../utils/iconMap";

const CurrentWeather = ({ defaultLocation }) => {
  if (!defaultLocation) {
    return <p>Loading...</p>;
  }
  const { city, data } = defaultLocation;
  const {
    current: { temperature, precipitation, weatherCode },
  } = data;
  const iconFileName = ICON_MAP.get(weatherCode);
  const iconPath = iconFileName ? `../assets/icons/${iconFileName}.svg` : null;

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
