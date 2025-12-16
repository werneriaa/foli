import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import MapContent from "./MapContent";

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

const MapModal: React.FC<MapModalProps> = ({
  onClose,
  latitude,
  longitude,
  busLine,
  destination,
  stopLatitude,
  stopLongitude,
  stopName,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Backdrop click to close modal
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full sm:w-[90%] sm:max-w-2xl h-[75vh] sm:h-[70vh] bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-xl animate-slide-up sm:animate-fade-in overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Linja {busLine} - Tämän hetkinen sijainti
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {destination}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Sulje kartta"
          >
            <MdClose className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Map */}
        <div className="h-[calc(100%-80px)]">
          <MapContent
            vehicleLatitude={latitude}
            vehicleLongitude={longitude}
            busLine={busLine}
            destination={destination}
            stopLatitude={stopLatitude}
            stopLongitude={stopLongitude}
            stopName={stopName}
          />
        </div>

        {/* Live indicator */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Live</span>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
