export const getStops = async (): Promise<Foli.Stop> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/stops`
    );
    if (!response?.ok) throw new Error();
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const getPrediction = async (
  key: string
): Promise<Foli.StopPrediction | undefined> => {
  try {
    const query = new URLSearchParams();
    query.append("key", key);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/prediction?${query}`;

    const response = await fetch(url);

    if (!response?.ok) throw new Error();
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
