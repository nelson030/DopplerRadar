import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

function FlyMapTo() {
  const [center, setCenter] = useState<[number, number]>();
  const map = useMap();

  useEffect(() => {
    const updateCoordinates = () => {
      navigator.geolocation.getCurrentPosition(success, error);
    };

    const success = (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCenter([latitude, longitude]);
    };

    const error = () => {
      console.error(
        "Unable to retrieve your location. Check location sharing permissions in your browser."
      );
    };

    updateCoordinates();
  }, []);
  useEffect(() => {
    if (center !== undefined) map.flyTo(center);
  }, [center]);

  return null;
}

export default FlyMapTo;
