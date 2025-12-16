import { Map as PigeonMap, Marker } from "pigeon-maps";

interface MapContentProps {
  vehicleLatitude: number;
  vehicleLongitude: number;
  stopLatitude?: number;
  stopLongitude?: number;
  stopName?: string;
  busLine: string;
  destination: string;
}

const MapContent: React.FC<MapContentProps> = ({
  vehicleLatitude,
  vehicleLongitude,
  stopLatitude,
  stopLongitude,
  busLine: _busLine,
  destination: _destination,
}) => {
  // Validate coordinates before rendering
  const hasValidCoordinates =
    typeof vehicleLatitude === "number" &&
    typeof vehicleLongitude === "number" &&
    !Number.isNaN(vehicleLatitude) &&
    !Number.isNaN(vehicleLongitude) &&
    vehicleLatitude !== 0 &&
    vehicleLongitude !== 0;

  const hasStopLocation =
    typeof stopLatitude === "number" &&
    typeof stopLongitude === "number" &&
    !Number.isNaN(stopLatitude) &&
    !Number.isNaN(stopLongitude) &&
    stopLatitude !== 0 &&
    stopLongitude !== 0;

  if (!hasValidCoordinates) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
        <p>Sijaintitietoja ei saatavilla</p>
      </div>
    );
  }

  return (
    <PigeonMap
      center={[vehicleLatitude, vehicleLongitude]}
      zoom={15}
      attribution={false}
      attributionPrefix={false}
    >
      <Marker
        width={40}
        anchor={[vehicleLatitude, vehicleLongitude]}
        color="#06b6d4"
      />
      {hasStopLocation && (
        <Marker
          width={30}
          anchor={[stopLatitude, stopLongitude]}
          color="#f97316"
        />
      )}
    </PigeonMap>
  );
};

export default MapContent;
