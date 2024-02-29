const getWeather = (latitude, longitude, units) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&temperatureUnit=${units}&timeformat=unixtime&timezone=GMT`;

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
        console.error("Error fetching weather data:", error.message);
        return null;
      });
  }
};

// Parsing function for current weather data
const parseCurrentWeather = (data) => {
  const currentWeather = {
    currentTime: data.current.time,
    temperature: Math.round(data.current.temperature_2m),
    apparentTemperature: Math.round(data.current.apparent_temperature),
    precipitation: Math.round(data.current.precipitation * 100) / 100,
    windSpeed: data.current.wind_speed_10m,
    day: data.current.is_day,
    weatherCode: data.current.weather_code,
  };
  return currentWeather;
};

//Parsing function for hourly weather data
const parseHourlyWeather = ({ hourly: hourlyData, current }) => {
  const hourlyWeather = hourlyData.time
    .map((time, index) => ({
      timestamp: time * 1000,
      temperature: Math.round(hourlyData.temperature_2m[index]),
      weatherCode: Math.round(hourlyData.weather_code[index]),
    }))
    .filter(({ timestamp }) => timestamp >= current.time * 1000);

  const fifteenHourlyData = [];
  const currentTime = current.time * 1000;

  for (
    let i = 0;
    i < hourlyWeather.length && fifteenHourlyData.length < 6;
    i += 3
  ) {
    const { timestamp, temperature, weatherCode } = hourlyWeather[i];

    // Calculate the timestamp for the next 15 hours with a 3-hour difference
    const nextTimestamp = currentTime + (i + 1) * 3 * 60 * 60 * 1000;

    // Check if the current timestamp is within the next 15 hours with a 3-hour difference
    if (timestamp < nextTimestamp) {
      fifteenHourlyData.push({ timestamp, temperature, weatherCode });
    }
  }

  return fifteenHourlyData;
};

// Parsing function for daily weather data
const parseDailyWeather = ({ daily: dailyData }) => {
  const dailyWeather = dailyData.time.map((timestamp, index) => ({
    date: timestamp * 1000,
    weatherCode: dailyData.weather_code[index],
    maxTemperature: Math.round(dailyData.temperature_2m_max[index]),
    minTemperature: Math.round(dailyData.temperature_2m_min[index]),
    uvIndexMax: Math.round(dailyData.uv_index_max[0]),
  }));
  return dailyWeather;
};

export default getWeather;
