export const getStops = async (): Promise<Foli.Stop> => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/stops`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return {};
  }
};
