import React, { useEffect, useState } from "react";
import "./current-weather.styles.css";
import { ICON_MAP } from "../../utils/iconmap/iconMap.utils";
import sunIcon from "../../assets/weather-icons/sun.svg";
import cloudIcon from "../../assets/weather-icons/cloud.svg";
import cloudBoltIcon from "../../assets/weather-icons/cloud-bolt.svg";
import cloudShowersIcon from "../../assets/weather-icons/cloud-showers-heavy.svg";
import cloudSunIcon from "../../assets/weather-icons/cloud-sun.svg";
import smogIcon from "../../assets/weather-icons/smog.svg";
import snowFlakeIcon from "../../assets/weather-icons/snowflake.svg";

const CurrentWeather = ({ defaultLocation, weatherData }) => {
  const [iconFileName, setIconFileName] = useState("");
  const [iconPath, setIconPath] = useState("");
  const { city } = defaultLocation;
  const {
    current: { temperature, precipitation, weatherCode },
  } = weatherData;

  useEffect(() => {
    if (weatherCode) {
      const iconName = ICON_MAP.get(weatherCode);
      setIconFileName(iconName);
      switch (iconName) {
        case "sun":
          setIconPath(sunIcon);
          break;
        case "cloud-bolt":
          setIconPath(cloudBoltIcon);
          break;
        case "cloud-showers-heavy":
          setIconPath(cloudShowersIcon);
          break;
        case "cloud":
          setIconPath(cloudIcon);
          break;
        case "cloud-sun":
          setIconPath(cloudSunIcon);
          break;
        case "smog":
          setIconPath(smogIcon);
          break;
        case "snowflake":
          setIconPath(snowFlakeIcon);
          break;
        default:
          setIconPath("");
      }
    }
  }, [weatherCode]);

  if (!defaultLocation && !weatherData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="current-weather-container">
        <div className="current-container">
          <h2>{city}</h2>
          <p>Chance of rain: {precipitation}%</p>
          <h1>{temperature}&deg;</h1>
        </div>
        {iconPath && (
          <img src={iconPath} alt="Weather Icon" className="current-icon-img" />
        )}
      </div>
    </>
  );
};

export default CurrentWeather;
