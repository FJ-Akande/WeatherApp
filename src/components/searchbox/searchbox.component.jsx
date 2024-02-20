import React, { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
import getWeather from "../../weather";

const SearchBox = ({ units }) => {
  const [query, setQuery] = useState("");

  const handleCitySearch = (event) => {
    setQuery(event.target.value);
    // setTimeout(() => {
    //   handleSearch(value);
    // }, 300);
  };

  // Function to handle user search
  useEffect(() => {
    const handleSearch = async (query) => {
      // Call the geocoding service to get latitude and longitude
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        query
      )}&key=AIzaSyCtXQpaYxqLXENvxMp8lgodk3i-wsNixdM`;

      try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        console.log(data);
        // const { lat, lng } = data.results[0].geometry.location;

        // Fetch weather data based on latitude and longitude
        // const weatherData = await getWeather(lat, lng, units);

        // Display weather information to the user
        // console.log(weatherData);
      } catch (error) {
        console.error("Error processing search:", error);
      }
    };
    handleSearch("London");
  }, [query, units]);
  return (
    <div>
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={handleCitySearch}
      />
      {/* <SearchIcon /> */}
    </div>
  );
};

export default SearchBox;
