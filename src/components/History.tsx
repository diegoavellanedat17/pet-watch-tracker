import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";

interface PetLocation {
  id: number;
  lat: number;
  lon: number;
  sendDate: string;
}

const createCustomIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <circle cx="12" cy="12" r="10" fill="${color}" />
      </svg>
    `)}`,
    iconSize: [50, 50],
    iconAnchor: [12, 12],
  });
};

const History: React.FC = () => {
  const [locations, setLocations] = useState<PetLocation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = process.env.BASIC_AUTH_USERNAME || "admin";
        const password = process.env.BASIC_AUTH_PASSWORD || "password";
        const token = btoa(`${username}:${password}`);
        const response = await axios.get<PetLocation[]>(
          "https://api.petwatch.tech/coordinates",
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const path: LatLngTuple[] = locations.map((location) => [
    location.lat,
    location.lon,
  ]);
  const gradientColors = path.map(
    (_, index) => `rgba(0, 255, 0, ${index / path.length})`
  );

  return (
    <div>
      <h2>History</h2>
      <MapContainer
        center={[4.4874324, -75.7040919]}
        zoom={16}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lon]}
            icon={createCustomIcon(
              index === locations.length - 1 ? "green" : "red"
            )}
          >
            <Popup>
              {location.sendDate}: Lat: {location.lat}, Lon: {location.lon}
            </Popup>
          </Marker>
        ))}
        <Polyline positions={path} pathOptions={{ color: "blue" }} />
      </MapContainer>
    </div>
  );
};

export default History;
