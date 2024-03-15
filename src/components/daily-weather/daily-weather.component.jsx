import { useContext } from "react";
import { WeatherDataContext } from "../contexts/weather-data-contexts";
import { ICON_MAP } from "../../utils/iconmap/iconMap.utils";
import sunIcon from "../../assets/weather-icons/sun.svg";
import cloudIcon from "../../assets/weather-icons/cloud.svg";
import cloudBoltIcon from "../../assets/weather-icons/cloud-bolt.svg";
import cloudShowersIcon from "../../assets/weather-icons/cloud-showers-heavy.svg";
import cloudSunIcon from "../../assets/weather-icons/cloud-sun.svg";
import smogIcon from "../../assets/weather-icons/smog.svg";
import snowFlakeIcon from "../../assets/weather-icons/snowflake.svg";
import "./daily-weather-styles.css";

const DailyWeather = () => {
  const {
    weatherData: { daily },
  } = useContext(WeatherDataContext);

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
