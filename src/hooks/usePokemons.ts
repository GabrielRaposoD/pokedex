import { getAllPokemons } from '@services/pokemon';
import { useQuery } from '@tanstack/react-query';

const usePokemons = (
  page: number,
  limit: number,
  regionStart: number,
  regionEnd: number
) => {
  const {
    status,
    data: pokemons,
    error,
  } = useQuery({
    queryKey: ['pokemons', page, regionStart, regionEnd],
    queryFn: async () => {
      let offset = page * limit - limit + regionStart - 1;

      if (offset + limit > regionEnd) {
        limit = regionEnd - offset;
      }

      return await getAllPokemons({
        offset: offset.toString(),
        limit: limit.toString(),
      });
    },
    retry: false,
    keepPreviousData: true,
  });

  return { status, error, pokemons };
};

export { usePokemons };
