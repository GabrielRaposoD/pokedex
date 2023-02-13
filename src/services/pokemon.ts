import { IPokemon, IPokemons } from '@typings/Pokemon/Pokemon';
import { apiClient, baseClient } from './api';

import { IPokemonSpecies } from '@typings/Pokemon/PokemonSpecies';

interface pokeApiQuery {
  offset?: string;
  limit?: string;
}

const getPokemon = async (name: string) => {
  const { data: pokemonData } = await apiClient.get<IPokemon>(
    `/pokemon/${name}`
  );

  const pokemonSpeciesData = await getPokemonDescription(pokemonData.id);

  return { pokemon: pokemonData, description: pokemonSpeciesData };
};

const getPokemonDescription = async (name: string | number) => {
  const { data } = await apiClient.get<IPokemonSpecies>(
    `/pokemon-species/${name}`
  );

  return data;
};

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
