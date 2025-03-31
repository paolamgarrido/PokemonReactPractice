import axios from "axios";

export const getPokemonData = async (url) => {
  const res = await axios.get(url);
  const results = await Promise.all(
    res.data.results.map(async (item) => {
      const response = await axios.get(item.url);
      return response.data;
    })
  );
  results.sort((a, b) => a.id - b.id);
  return {
    data: results,
    next: res.data.next,
    prev: res.data.previous,
  };
};