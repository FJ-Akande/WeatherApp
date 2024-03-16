import { useContext } from "react";
import { WeatherDataContext } from "../contexts/weather-data-contexts";
import "../unitconverter/unitconverter.styles.css";

const UnitConverter = () => {
  const { setUnits } = useContext(WeatherDataContext);

  const handleCelsuisUnitChange = () => {
    setUnits("celsius");
  };

  const handleFahrenUnitChange = () => {
    setUnits("fahrenheit");
  };

  return (
    <div>
      <div className="convert-btns">
        <button
          className="celsius-btn"
          type="button"
          onClick={handleCelsuisUnitChange}
        >
          &deg;C
        </button>
        <button
          className="fahrenheit-btn"
          type="button"
          onClick={handleFahrenUnitChange}
        >
          &deg;F
        </button>
      </div>
    </div>
  );
};

export default UnitConverter;
