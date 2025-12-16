import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { useState } from "react";
import { ResultRow } from "./ResultRow";
import stopsData from "../public/stopsData.json";

interface MapModalProps {
  onClose: () => void;
  latitude: number;
  longitude: number;
  busLine: string;
  destination: string;
  stopLatitude?: number;
  stopLongitude?: number;
  stopName?: string;
}

const MapModal = dynamic<MapModalProps>(() => import("./MapModal"), {
  ssr: false,
}) as ComponentType<MapModalProps>;

interface Results {
  prediction: Foli.StopPrediction | undefined;
  isLoading: boolean;
  selectedStop: string;
}

interface SelectedBus {
  __tripref: string;
  line: string;
  destination: string;
  latitude: number;
  longitude: number;
}

export const Results: React.FC<Results> = ({
  isLoading,
  prediction,
  selectedStop,
}) => {
  const [selectedBus, setSelectedBus] = useState<SelectedBus | null>(null);

  // Type assertion for stopsData to allow dynamic access
  const stops = stopsData as Record<
    string,
    {
      stop_code: string;
      stop_name: string;
      stop_lat: number;
      stop_lon: number;
    }
  >;

  const handleMapClick = (bus: SelectedBus) => {
    setSelectedBus(bus);
  };

  const handleCloseMap = () => {
    setSelectedBus(null);
  };

  // Find updated coordinates for selected bus from latest prediction data
  const getUpdatedBusLocation = (): SelectedBus | null => {
    if (!selectedBus || !prediction?.result) return selectedBus;

    const updatedBus = prediction.result.find(
      (res) => res.__tripref === selectedBus.__tripref,
    );

    if (updatedBus?.latitude && updatedBus?.longitude) {
      return {
        ...selectedBus,
        latitude: updatedBus.latitude,
        longitude: updatedBus.longitude,
      };
    }

    return selectedBus;
  };

  const updatedSelectedBus = getUpdatedBusLocation();

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-8">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-cyan-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <title>Loading spinner</title>
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="mt-4 w-full">
          <table className="w-full pr-4">
            <thead className="sticky top-0 bg-white dark:bg-gray-900">
              <tr className="flex w-full mb-2 dark:text-gray-300">
                <th className="w-1/5 text-left">Linja</th>
                <th className="w-2/5 text-left">Päämäärä</th>
                <th className="w-1/5 text-center px-2">Saapuu</th>
                <th className="w-1/5 text-right pr-16 mr-2">Klo</th>
              </tr>
            </thead>
          </table>
          <div className="max-h-[60vh] overflow-y-auto scrollbar-gutter-stable">
            <table className="w-full">
              <tbody>
                {prediction?.result.map((res) => (
                  <ResultRow
                    line={res.lineref}
                    departureTime={res.expecteddeparturetime}
                    key={`${res.lineref}-${res.expecteddeparturetime}-${res.destinationdisplay}`}
                    destination={res.destinationdisplay}
                    longitude={res.longitude}
                    latitude={res.latitude}
                    onMapClick={() => {
                      if (!res.latitude || !res.longitude) return;
                      handleMapClick({
                        line: res.lineref,
                        destination: res.destinationdisplay,
                        latitude: res.latitude,
                        longitude: res.longitude,
                        __tripref: res.__tripref,
                      });
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {updatedSelectedBus && (
        <MapModal
          onClose={handleCloseMap}
          latitude={updatedSelectedBus.latitude}
          longitude={updatedSelectedBus.longitude}
          busLine={updatedSelectedBus.line}
          destination={updatedSelectedBus.destination}
          stopLatitude={stops[selectedStop]?.stop_lat}
          stopLongitude={stops[selectedStop]?.stop_lon}
          stopName={stops[selectedStop]?.stop_name}
        />
      )}
    </>
  );
};
