import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./MapComponent";

interface PetLocation {
  id: number;
  lat: number;
  lon: number;
  sendDate: string;
}

const PetTracker: React.FC = () => {
  const [position, setPosition] = useState<[number, number]>([
    4.4874324, -75.7040919,
  ]);
  const [latestPosition, setLatestPosition] = useState<PetLocation | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PetLocation[]>(
          "http://54.173.182.6:3000/api/coordinates"
        );
        const data = response.data;
        if (data.length > 0) {
          const latestPosition = data[data.length - 1];
          setPosition([latestPosition.lat, latestPosition.lon]);
          setLatestPosition(latestPosition);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Fetch data every minute

    return () => clearInterval(intervalId);
  }, []);

  return <MapComponent position={position} latestPosition={latestPosition} />;
};

export default PetTracker;
