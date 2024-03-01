import React from "react";
import getWeather from "../../../services/weather/weather.services";

const UnitConverter = ({ units, setUnits, setDefaultLocation }) => {
  const { latitude, longitude } = setDefaultLocation;

  const handleCelsuisUnitChange = () => {
    setUnits("celsius");
  };

  const handleFahrenUnitChange = () => {
    setUnits("fahrenheit");
  };

  return (
    <div>
      <div className="convert-btns">
        <button type="button" onClick={handleCelsuisUnitChange}>
          &deg;C
        </button>
        <button type="button" onClick={handleFahrenUnitChange}>
          &deg;F
        </button>
      </div>
    </div>
  );
};

export default UnitConverter;
