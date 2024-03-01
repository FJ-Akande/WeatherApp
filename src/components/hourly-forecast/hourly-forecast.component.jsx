import React from "react";
import ForecastCard from "../hourly-forecast-card/forecast-card.component";
import "./hourly-forecast.styles.css";

const HourlyForecast = ({ weatherData }) => {
  return (
    <section className="hourly-forecast-container">
      <h3>TODAY'S FORECAST</h3>
      <ForecastCard weatherData={weatherData} />
    </section>
  );
};

export default HourlyForecast;
