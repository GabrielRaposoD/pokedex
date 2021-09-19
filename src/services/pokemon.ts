import { IPokemonSpecies } from '@typings/Pokemon/PokemonSpecies';
import { IPokemon } from '@typings/Pokemon/Pokemon';
import { apiClient, baseClient } from './api';

interface pokeApiQuery {
  offset?: string;
  limit?: string;
}

const getPokemon = async (name: string) =>
  await apiClient.get<IPokemon>(`/pokemon/${name}`);

const getPokemonDescription = async (name: string) =>
  await apiClient.get<IPokemonSpecies>(`/pokemon-species/${name}`);

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

const setCatchedPokemon = async (id: number) => {
  const res = await baseClient.post('/pokemon', {
    pokemonId: id,
  });

  return res;
};

export { getPokemon, getAllPokemons, getPokemonDescription, setCatchedPokemon };
