export const retrieveStops = async (): Promise<Foli.Stop> => {
  try {
    const url = `${process.env.BASE_API_URL}siri/sm/pretty`;
    const response = await fetch(url);
    const result = await response.json();
    return result as Foli.Stop;
  } catch (err) {
    console.error(err);
    return {};
  }
};
