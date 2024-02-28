import React from "react";
import ForecastCard from "../forecast-card/forecast-card.component";

const HourlyForecast = ({ weatherData }) => {
  return (
    <section>
      <h3>TODAY'S FORECAST</h3>
      <ForecastCard weatherData={weatherData} />
    </section>
  );
};

export default HourlyForecast;
