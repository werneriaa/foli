export const getPrediction = async (
  key: string,
): Promise<Foli.StopPrediction | undefined> => {
  try {
    const query = new URLSearchParams();
    query.append("key", key);
    const url = `/api/prediction?${query}`;

    const response = await fetch(url);

    if (!response?.ok) throw new Error();
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
