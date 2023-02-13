import { getPokemon } from '@services/pokemon';
import { useQuery } from '@tanstack/react-query';

const usePokemon = (id: string) => {
  const {
    status,
    data: pokemon,
    error,
  } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon(id),
    retry: false,
  });

  return { status, error, pokemon };
};

export { usePokemon };
