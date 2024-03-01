import React, { useState, useEffect } from "react";
import { ICON_MAP } from "../utils/iconmap/iconMap.utils";
import sunIcon from "../../assets/weather-icons/sun.svg";
import cloudIcon from "../../assets/weather-icons/cloud.svg";
import cloudBoltIcon from "../../assets/weather-icons/cloud-bolt.svg";
import cloudShowersIcon from "../../assets/weather-icons/cloud-showers-heavy.svg";
import cloudSunIcon from "../../assets/weather-icons/cloud-sun.svg";
import smogIcon from "../../assets/weather-icons/smog.svg";
import snowFlakeIcon from "../../assets/weather-icons/snowflake.svg";

const DailyWeather = ({ weatherData: { daily } }) => {
  const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" });

  const getIconPath = (weatherCode) => {
    const iconName = ICON_MAP.get(weatherCode);
    let iconPath = "";
    switch (iconName) {
      case "sun":
        iconPath = sunIcon;
        break;
      case "cloud-bolt":
        iconPath = cloudBoltIcon;
        break;
      case "cloud-showers-heavy":
        iconPath = cloudShowersIcon;
        break;
      case "cloud":
        iconPath = cloudIcon;
        break;
      case "cloud-sun":
        iconPath = cloudSunIcon;
        break;
      case "smog":
        iconPath = smogIcon;
        break;
      case "snowflake":
        iconPath = snowFlakeIcon;
        break;
      default:
        break;
    }

    return { iconName, iconPath };
  };

  return (
    <article>
      <div>
        <h3>7-DAY FORECAST</h3>
        {daily.map((day) => (
          <div key={day.date}>
            <p>{DAY_FORMATTER.format(day.date)}</p>
            {getIconPath(day.weatherCode) && (
              <>
                <img
                  src={getIconPath(day.weatherCode).iconPath}
                  alt="Weather Icon"
                  className="icon-img"
                />
                <p>{getIconPath(day.weatherCode).iconName}</p>
              </>
            )}
            <p>
              {day.maxTemperature}/{day.minTemperature}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default DailyWeather;
