import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapComponent.css";
import petImage from "../assets/pet1.png";
interface MapComponentProps {
  position: [number, number];
  latestPosition: { lat: number; lon: number } | null;
}

// Adjust the path to your image and make sure it is correct

const petIcon = new L.Icon({
  iconUrl: petImage,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  className: "custom-icon",
});

const MapComponent: React.FC<MapComponentProps> = ({
  position,
  latestPosition,
}) => {
  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapUpdater position={position} />
      {latestPosition && (
        <Marker
          position={[latestPosition.lat, latestPosition.lon]}
          icon={petIcon}
        >
          <Popup>
            Pet Location: Lat: {latestPosition.lat}, Lon: {latestPosition.lon}
          </Popup>
          {/* Ensure the border is positioned correctly around the icon */}
          <div
            className="animated-border"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid green",
              animation: "pulse 1s infinite",
            }}
          />
        </Marker>
      )}
    </MapContainer>
  );
};

const MapUpdater: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 16, {
      animate: true,
      duration: 1,
    });
  }, [position, map]);

  return null;
};

export default MapComponent;
