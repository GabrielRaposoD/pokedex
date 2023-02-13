import { getAllPokemons } from '@services/pokemon';
import { useQuery } from '@tanstack/react-query';

const usePokemons = (
  page: number,
  limit: number,
  regionStart: number,
  regionEnd: number,
  reverse = false
) => {
  const {
    status,
    data: pokemons,
    error,
  } = useQuery({
    queryKey: ['pokemons', page, regionStart, regionEnd, reverse],
    queryFn: async () => {
      let offset = (page - 1) * limit + regionStart - 1;

      if (reverse) {
        offset = regionEnd - (page - 1) * limit - limit;

        if (offset <= regionStart) {
          limit = limit + offset - regionStart + 1;
          offset = regionStart - 1;
        }
      }

      if (offset + limit > regionEnd) {
        limit = regionEnd - offset;
      }

      return await getAllPokemons(
        {
          offset: offset.toString(),
          limit: limit.toString(),
        },
        reverse
      );
    },
    retry: false,
    keepPreviousData: true,
  });

  return { status, error, pokemons: pokemons };
};

export { usePokemons };
