export const retrieveStops = async (): Promise<Foli.Stop | Message> => {
  try {
    const url = `${process.env.BASE_API_URL}siri/sm/pretty`;
    const response = await fetch(url);
    const result = await response.json();
    return result as Foli.Stop;
  } catch (err) {
    console.error(err);
    return { message: `Failed to fetch stops` };
  }
};

export const retrieveStopPrediction = async (
  key: string
): Promise<Foli.StopPrediction | Message> => {
  try {
    const url = `${process.env.BASE_API_URL}siri/sm/${key}/pretty`;
    const response = await fetch(url);
    const result = await response.json();
    return result as Foli.StopPrediction;
  } catch (err) {
    console.error(err);
    return { message: `Failed to fetch prediction for stop` };
  }
};
