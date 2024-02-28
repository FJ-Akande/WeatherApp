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
const parseHourlyWeather = ({ hourly: hourlyData }) => {
  const currentTime = Math.floor(Date.now() * 1000);

  let currentIndex = hourlyData.time.findIndex((time) => time >= currentTime);

  if (currentIndex === -1) {
    currentIndex = 0;
  }

  const parsedHourlyWeather = [];
  for (
    let i = currentIndex;
    i < currentIndex + 16 && i < hourlyData.time.length;
    i += 3
  ) {
    parsedHourlyWeather.push({
      time: hourlyData.time[i],
      temperature: Math.round(hourlyData.temperature_2m[i]),
      weatherCode: Math.round(hourlyData.weather_code[i]),
    });
  }

  return parsedHourlyWeather;
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
