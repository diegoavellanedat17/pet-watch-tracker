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
    <MapContainer center={position} zoom={16} className="map-container">
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
          <div className="animated-border" />
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
