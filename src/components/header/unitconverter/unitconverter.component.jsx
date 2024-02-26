import React from "react";
import getWeather from "../../../services/weather";

const UnitConverter = ({ units, setUnits, setDefaultLocation }) => {
  //Come back to these:

  //   const { latitude, longitude } = setDefaultLocation;

  //   const handleCelsuisUnitChange = () => {
  //     setUnits("celsuis");
  //     getWeather(latitude, longitude, units);
  //   };

  //   const handleFahrenUnitChange = () => {
  //     setUnits("fahrenheit");
  //     getWeather(latitude, longitude, units);
  //   };

  return (
    <div>
      <div className="convert-btns">
        <button
          type="button"
          //   onClick={handleCelsuisUnitChange}
        >
          &deg;C
        </button>
        <button
          type="button"
          //   onClick={handleFahrenUnitChange}
        >
          &deg;F
        </button>
      </div>
    </div>
  );
};

export default UnitConverter;
