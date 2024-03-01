import React, { useState, useEffect } from "react";
import { ICON_MAP } from "../../utils/iconmap/iconMap.utils";
import sunIcon from "../../assets/weather-icons/sun.svg";
import cloudIcon from "../../assets/weather-icons/cloud.svg";
import cloudBoltIcon from "../../assets/weather-icons/cloud-bolt.svg";
import cloudShowersIcon from "../../assets/weather-icons/cloud-showers-heavy.svg";
import cloudSunIcon from "../../assets/weather-icons/cloud-sun.svg";
import smogIcon from "../../assets/weather-icons/smog.svg";
import snowFlakeIcon from "../../assets/weather-icons/snowflake.svg";

const ForecastCard = ({ weatherData: { hourly } }) => {
  const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
  });

  const getIconPath = (weatherCode) => {
    const iconName = ICON_MAP.get(weatherCode);
    switch (iconName) {
      case "sun":
        return sunIcon;
      case "cloud-bolt":
        return cloudBoltIcon;
      case "cloud-showers-heavy":
        return cloudShowersIcon;
      case "cloud":
        return cloudIcon;
      case "cloud-sun":
        return cloudSunIcon;
      case "smog":
        return smogIcon;
      case "snowflake":
        return snowFlakeIcon;
      default:
        return "";
    }
  };

  return (
    <div>
      {hourly.map((hour, index) => (
        <div key={index}>
          <h4>{HOUR_FORMATTER.format(hour.timestamp)}</h4>
          {getIconPath(hour.weatherCode) && (
            <img
              src={getIconPath(hour.weatherCode)}
              alt="Weather Icon"
              className="icon-img"
            />
          )}
          <h2>{hour.temperature}</h2>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;
