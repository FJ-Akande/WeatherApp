import React, { useState, useEffect } from "react";
import "./daily-weather-styles.css";
import { ICON_MAP } from "../../utils/iconmap/iconMap.utils";
import sunIcon from "../../assets/weather-icons/sun.svg";
import cloudIcon from "../../assets/weather-icons/cloud.svg";
import cloudBoltIcon from "../../assets/weather-icons/cloud-bolt.svg";
import cloudShowersIcon from "../../assets/weather-icons/cloud-showers-heavy.svg";
import cloudSunIcon from "../../assets/weather-icons/cloud-sun.svg";
import smogIcon from "../../assets/weather-icons/smog.svg";
import snowFlakeIcon from "../../assets/weather-icons/snowflake.svg";

const DailyWeather = ({ weatherData: { daily } }) => {
  const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
  });

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
    <section className="daily-section-container">
      <h3>7-DAY FORECAST</h3>
      {/* {daily.map((day) => (
        <div key={day.date} className="daily-flex-container">
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
      ))} */}
      {/* <table>
        <tbody>
          {daily.map((day) => (
            <tr key={day.date}>
              <td>{DAY_FORMATTER.format(day.date)}</td>
              <td>
                {getIconPath(day.weatherCode) && (
                  <img
                    src={getIconPath(day.weatherCode).iconPath}
                    alt="Weather Icon"
                    className="icon-img"
                  />
                )}
              </td>
              <td>
                {getIconPath(day.weatherCode) && (
                  <p>{getIconPath(day.weatherCode).iconName}</p>
                )}
              </td>
              <td>
                {day.maxTemperature}/{day.minTemperature}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <table>
        <tbody>
          {daily.map((day, index) => (
            <tr key={day.date} className="daily-flex-container">
              <td>
                <h3>{DAY_FORMATTER.format(day.date)}</h3>
              </td>
              <td>
                {getIconPath(day.weatherCode) && (
                  <img
                    src={getIconPath(day.weatherCode).iconPath}
                    alt="Weather Icon"
                    className="icon-img"
                  />
                )}
              </td>
              <td>
                {getIconPath(day.weatherCode) && (
                  <p>{getIconPath(day.weatherCode).iconName}</p>
                )}
              </td>
              <td>
                <p>
                  {day.maxTemperature}/{day.minTemperature}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default DailyWeather;
