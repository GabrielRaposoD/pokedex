import { IPokemon } from './../typings/Pokemon/Pokemon';
import { apiClient } from './api';

interface pokeApiQuery {
  offset?: string;
  limit?: string;
}

const getPokemon = async (name: string) =>
  await apiClient.get(`/pokemon/${name}`);

const getAllPokemons = async (query?: pokeApiQuery) => {
  const res: IPokemon[] = await apiClient
    .get('/pokemon', {
      params: query,
    })
    .then((r) => {
      return Promise.all(
        r.data.results.map(async (p) => {
          return (await getPokemon(p.name)).data;
        })
      );
    });

  return res;
};

export { getPokemon, getAllPokemons };
