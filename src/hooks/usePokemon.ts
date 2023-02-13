import { getPokemon } from '@services/pokemon';
import { useQuery } from '@tanstack/react-query';

const usePokemon = (id: string) => {
  const { status, data, error } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon(id),
    retry: false,
    enabled: !!id,
  });

  return { status, error, data };
};

export { usePokemon };
