import React from "react";
import "./current-details.styles.css";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const CurrentWeatherDetails = ({ weatherData }) => {
  const { current, daily } = weatherData;
  const { uvIndexMax } = daily[0];

  return (
    <footer>
      <h3 className="footer-header-text">AIR CONDITIONS</h3>
      <div className="conditions-grid-container">
        <div>
          <h3>
            <span>
              <ThermostatIcon />
            </span>
            Real Feel
          </h3>
          <p>{current.apparentTemperature}&deg;</p>
        </div>
        <div>
          <h3>
            <span>
              <WaterDropIcon />
            </span>
            Chance of rain
          </h3>
          <p>{current.precipitation}%</p>
        </div>
        <div>
          <h3>
            <span>
              <AirIcon />
            </span>
            Wind
          </h3>
          <p>{current.windSpeed}km/h</p>
        </div>
        <div>
          <h3>
            <span>
              <Brightness7Icon />
            </span>
            UV Index
          </h3>
          <p>{uvIndexMax}</p>
        </div>
      </div>
    </footer>
  );
};

export default CurrentWeatherDetails;
