import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapDashboard = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialisation de la carte
    mapRef.current = L.map(mapContainerRef.current, {
      center: [48.8566, 2.3522],
      zoom: 13,
      zoomControl: true,
    });

    // Ajout de la couche de tuiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Ajout d'un marqueur
    const marker = L.marker([48.8566, 2.3522])
      .addTo(mapRef.current)
      .bindPopup("Paris")
      .openPopup();

    // Nettoyage
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      id="mapid"
      style={{ height: "400px", width: "100%", position: "relative" }}
    />
  );
};

export default MapDashboard;
