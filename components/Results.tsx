import { ResultRow } from "./ResultRow";

interface Results {
  prediction: Foli.StopPrediction | undefined;
  isLoading: boolean;
}

export const Results: React.FC<Results> = ({ isLoading, prediction }) => {
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
                <th className="w-full text-left">Linja</th>
                <th className="w-full text-left pl-4">Päämäärä</th>
                <th className="w-full text-right pr-4">Arvioitu lähtöaika</th>
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
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
