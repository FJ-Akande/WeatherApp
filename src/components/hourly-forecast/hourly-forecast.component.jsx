import ForecastCard from "../hourly-forecast-card/forecast-card.component";
import "./hourly-forecast.styles.css";

const HourlyForecast = () => {
  return (
    <section className="hourly-forecast-container">
      <h3>TODAY'S FORECAST</h3>
      <ForecastCard />
    </section>
  );
};

export default HourlyForecast;
