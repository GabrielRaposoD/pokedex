import { IPokemon, IPokemons } from '@typings/Pokemon/Pokemon';
import { apiClient, baseClient } from './api';

import { IPokemonSpecies } from '@typings/Pokemon/PokemonSpecies';

interface pokeApiQuery {
  offset?: string;
  limit?: string;
}

const getPokemon = async (name: string) => {
  const { data } = await apiClient.get<IPokemon>(`/pokemon/${name}`);

  return data;
};

const getPokemonDescription = async (name: string) =>
  await apiClient.get<IPokemonSpecies>(`/pokemon-species/${name}`);

const getAllPokemons = async (
  query: pokeApiQuery = { offset: '0', limit: '27' }
) => {
  const { data } = await apiClient.get<IPokemons>('/pokemon', {
    params: query,
  });

  console.log(data);

  return data.results;
};

const setCatchedPokemon = async (id: number) => {
  const res = await baseClient.post('/pokemon', {
    pokemonId: id,
  });

  return res;
};

export { getPokemon, getAllPokemons, getPokemonDescription, setCatchedPokemon };
