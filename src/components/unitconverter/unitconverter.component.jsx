import "../unitconverter/unitconverter.styles.css";

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
