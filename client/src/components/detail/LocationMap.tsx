import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import { motion } from "framer-motion";
import { Location } from "@/types/location";
import { Wifi, AirVent, CigaretteOff, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";


delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

interface LocationMapProps {
  location: Location;
}

function MapEvents({ onMapReady }: { onMapReady: () => void }) {
  const map = useMapEvents({});

  useEffect(() => {
    if (map) {
      onMapReady();
    }
  }, [map, onMapReady]);

  return null;
}

export function LocationMap({ location }: LocationMapProps) {
  const markerRef = useRef<L.Marker>(null);

  console.log("LocationMap rendering for:", location.name);

  const position: LatLngTuple = location.coordinates?.coordinates
    ? [location.coordinates.coordinates[1], location.coordinates.coordinates[0]]
    : [10.776, 106.701];

  const handleMapReady = () => {
    if (markerRef.current && !markerRef.current.isPopupOpen()) {
      markerRef.current.openPopup();
    } else {
      console.log("Marker ref:", markerRef.current, "Popup open state:", markerRef.current?.isPopupOpen());
    }
  };

  useEffect(() => {
    const openPopup = () => {
      if (markerRef.current && !markerRef.current.isPopupOpen()) {
        markerRef.current.openPopup();
      }
    };

    const intervalId = setInterval(openPopup, 100);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [location.name]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[220px] sm:h-[300px] md:h-[450px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gradient-to-r from-primary/20 to-transparent map-container"
    >
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='© <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MapEvents onMapReady={handleMapReady} />
        <Marker position={position} ref={markerRef} icon={customIcon}>
          <Popup maxWidth={320}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-[280px] sm:max-w-[300px]"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">{location.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">{location.address}</p>
              {location.openingHours && (
                <p className="text-xs sm:text-sm text-gray-600 mb-3">Giờ mở cửa: {location.openingHours}</p>
              )}
              <div className="space-y-2">
                {location.wifi && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                    <Wifi className="w-4 h-4 text-primary" />
                    <span>Wi-Fi miễn phí</span>
                  </div>
                )}
                {location.airConditioning && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                    <AirVent className="w-4 h-4 text-primary" />
                    <span>Điều hòa</span>
                  </div>
                )}
                {location.noSmoking && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                    <CigaretteOff className="w-4 h-4 text-primary" />
                    <span>Không hút thuốc</span>
                  </div>
                )}
              </div>
              {location.coordinates?.coordinates && (
                <Button
                  asChild
                  size="sm"
                  className="mt-3 w-full bg-primary text-white hover:bg-primary/90 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Chỉ đường đến quán
                  </a>
                </Button>
              )}
            </motion.div>
          </Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
}