const getWeather = (latitude, longitude, units) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&temperatureUnit=${units}&timeformat=unixtime&timezone=GMT`;

  if (latitude !== null && longitude !== null) {
    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return {
          current: parseCurrentWeather(data),
          hourly: parseHourlyWeather(data),
          daily: parseDailyWeather(data),
        };
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        return null;
      });
  }
};

// Parsing function for current weather data
const parseCurrentWeather = (data) => {
  const currentWeather = {
    temperature: data.current.temperature_2m,
    apparentTemperature: data.current.apparent_temperature,
    precipitation: data.current.precipitation,
    windSpeed: data.current.wind_speed_10m,
  };
  return currentWeather;
};

// Parsing function for hourly weather data
const parseHourlyWeather = ({ hourly: hourlyData }) => {
  const parsedHourlyWeather = hourlyData.time.map((timestamp, index) => ({
    time: timestamp,
    temperature: hourlyData.temperature_2m[index],
    weatherCode: hourlyData.weather_code[index],
  }));
  return parsedHourlyWeather;
};

// Parsing function for daily weather data
const parseDailyWeather = ({ daily: dailyData }) => {
  const dailyWeather = dailyData.time.map((timestamp, index) => ({
    date: timestamp,
    weatherCode: dailyData.weather_code[index],
    maxTemperature: dailyData.temperature_2m_max[index],
    minTemperature: dailyData.temperature_2m_min[index],
    uvIndexMax: dailyData.uv_index_max[0],
  }));
  return dailyWeather;
};

export default getWeather;
