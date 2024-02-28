import React, { useState, useEffect } from "react";
import { ICON_MAP } from "../utils/iconmap/iconMap.utils";
import sunIcon from "../../assets/weather-icons/sun.svg";
import cloudIcon from "../../assets/weather-icons/cloud.svg";
import cloudBoltIcon from "../../assets/weather-icons/cloud-bolt.svg";
import cloudShowersIcon from "../../assets/weather-icons/cloud-showers-heavy.svg";
import cloudSunIcon from "../../assets/weather-icons/cloud-sun.svg";
import smogIcon from "../../assets/weather-icons/smog.svg";
import snowFlakeIcon from "../../assets/weather-icons/snowflake.svg";

const ForecastCard = ({ weatherData: { hourly } }) => {
  const [iconFileName, setIconFileName] = useState("");
  const [iconPath, setIconPath] = useState("");

  const { weatherCode } = hourly;

  const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
  });

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

  return (
    <div>
      {hourly.map((hour) => (
        <div key={hour}>
          <h4>{HOUR_FORMATTER.format(hour.time)}</h4>
          {iconPath && (
            <img src={iconPath} alt="Weather Icon" className="icon-img" />
          )}
          <h2>{hour.temperature}</h2>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;
