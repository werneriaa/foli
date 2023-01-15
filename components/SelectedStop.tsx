import { useEffect, useState } from "react";
import { getPrediction } from "../functions/client";
import { ResultRow } from "./ResultRow";

interface SelectedStop {
  selectedStop: string;
  stop_name: string;
}

export const SelectedStop: React.FC<SelectedStop> = ({
  selectedStop,
  stop_name,
}) => {
  const [prediction, setPrediction] = useState<Foli.StopPrediction | undefined>(
    undefined
  );

  const [error, setError] = useState("");

  useEffect(() => {
    const retrieve = async () => {
      try {
        if (selectedStop) {
          const res = await getPrediction(selectedStop);
          if (!res?.status || res.status !== "OK") throw new Error();
          setPrediction(res);
        } else {
          setPrediction(undefined);
        }
      } catch (err) {
        setError("Virhe. Tarkista pysäkin numero ja verkkoyhteytesi");
        setPrediction(undefined);
      }
    };
    retrieve();
  }, [selectedStop]);

  return (
    <div className="mt-4">
      <h1 className="text-2xl text-gray-500 font-extralight w-full text-center">
        <span className="text-cyan-500 font-bold">{selectedStop}</span>
        {" - "}
        {stop_name}
      </h1>
      {error ? (
        <p className="w-full py-2 text-center">{error}</p>
      ) : (
        <table className="mt-4 w-full grid">
          <thead>
            <tr className="flex w-full mb-2">
              <th className="w-full text-left">Linja</th>
              <th className="w-full text-left pl-4">Päämäärä</th>
              <th className="w-full text-right">Arvioitu lähtöaika</th>
            </tr>
          </thead>
          <tbody>
            {prediction?.result.map((res, i) => (
              <ResultRow
                line={res.lineref}
                departureTime={res.expecteddeparturetime}
                key={res.lineref + i}
                destination={res.destinationdisplay}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
