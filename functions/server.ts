export const retrieveStops = async (): Promise<Foli.Stop> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}siri/sm/pretty`;
    const response = await fetch(url);
    const result = await response.json();
    return result as Foli.Stop;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const retrieveStopPrediction = async (
  key: string
): Promise<Foli.StopPrediction | Message> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}siri/sm/${key}/pretty`;
    const response = await fetch(url);
    const result = await response.json();
    return result as Foli.StopPrediction;
  } catch (err) {
    console.error(err);
    return { message: `Failed to fetch prediction for stop` };
  }
};
