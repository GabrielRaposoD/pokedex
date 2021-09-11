import { TypeTag, PokemonCard } from '@components/index';
import { getAllPokemons, getPokemon } from '@services/pokemon';
import { IPokemon } from '@typings/Pokemon/Pokemon';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<IPokemon[]>([]);

  const fetchData = useCallback(async () => {
    const res = await getAllPokemons();
    setData(res);
  }, []);

  console.log(data);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='flex flex-row flex-wrap items-center justify-center min-h-screen gap-5 py-2'>
      {data.map((item, i) => (
        <PokemonCard pokemon={item} key={i} />
      ))}
    </div>
  );
}
