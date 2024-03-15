import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");
  const [locationAvailable, setLocationAvailable] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              // Use reverse geocoding to get the city name
              const reverseGeocodingUrl = `https://geocode.xyz/${latitude},${longitude}?json=1&auth=377704178113329620849x13998`;
              const reverseGeocodingResponse = await fetch(reverseGeocodingUrl);
              const reverseGeocodingData =
                await reverseGeocodingResponse.json();
              const city = reverseGeocodingData.city;

              setLocation({
                latitude,
                longitude,
                city,
              });
              setCity(city);
              setLocationAvailable(true);
            },
            (error) => {
              console.error("Error getting location:", error);
              setLocationAvailable(false);
            }
          );
        } else {
          setLocationAvailable(false);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        setLocationAvailable(false);
      }
    };
    fetchLocation();
  }, []);

  return { location, city, locationAvailable };
};

export default useGeolocation;
