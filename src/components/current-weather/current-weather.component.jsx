import React from "react";

const CurrentWeather = ({ searchedLocation, city }) => {
  if (searchedLocation && searchedLocation.searchedRadar) {
    const { searchedRadar } = searchedLocation;

    return (
      <>
        <div className="current-weather-container">
          <div className="current-container">
            <div>
              <h2>{searchedLocation ? searchedRadar : city}</h2>
            </div>
          </div>
        </div>
      </>
    );
  } else if (city) {
    return (
      <>
        <div className="current-weather-container">
          <div className="current-container">
            <div>
              <h2>{city}</h2>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default CurrentWeather;
