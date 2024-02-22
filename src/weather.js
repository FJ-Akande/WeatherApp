const getWeather = async (latitude, longitude, units) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&temperatureUnit=${units}&timeformat=unixtime&timezone=GMT`;

  if (latitude !== null && longitude !== null) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { current, hourly, daily } = await response.json();
      return {
        current,
        hourly,
        daily,
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }
};

export default getWeather;
