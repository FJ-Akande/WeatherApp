import { useEffect, useState, useContext } from "react";
import { WeatherDataContext } from "../contexts/weather-data-contexts";
import useDebounce from "../../hooks/debounce/debounce.hooks";
import "../searchbox/searchbox.styles.css";

const SearchBox = () => {
  const { setSearchedLocation } = useContext(WeatherDataContext);
  const [query, setQuery] = useState("");
  const debouncedSearch = useDebounce(query);

  const fetchLocationData = async () => {
    const geoLocationUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`;
    const geoLocationData = await fetch(geoLocationUrl);
    const response = await geoLocationData.json();
    if (response.results && response.results.length > 0) {
      const { latitude, longitude, name } = response.results[0];
      setSearchedLocation({
        searchLat: latitude,
        searchLong: longitude,
        searchedRadar: name,
      });
    }
  };

  useEffect(() => {
    fetchLocationData(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBox;
