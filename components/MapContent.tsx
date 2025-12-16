import { Map as PigeonMap, Marker } from "pigeon-maps";

interface MapContentProps {
  latitude: number;
  longitude: number;
  busLine: string;
  destination: string;
}

const MapContent: React.FC<MapContentProps> = ({
  latitude,
  longitude,
  busLine: _busLine,
  destination: _destination,
}) => {
  // Validate coordinates before rendering
  const hasValidCoordinates =
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    !Number.isNaN(latitude) &&
    !Number.isNaN(longitude) &&
    latitude !== 0 &&
    longitude !== 0;

  if (!hasValidCoordinates) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
        <p>Sijaintitietoja ei saatavilla</p>
      </div>
    );
  }

  return (
    <PigeonMap
      center={[latitude, longitude]}
      zoom={15}
      attribution={false}
      attributionPrefix={false}
    >
      <Marker width={40} anchor={[latitude, longitude]} color="#06b6d4" />
    </PigeonMap>
  );
};

export default MapContent;
