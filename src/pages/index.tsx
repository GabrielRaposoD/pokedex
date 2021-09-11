import { TypeTag } from '@components/index';
import { getAllPokemons, getPokemon } from '@services/pokemon';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await getAllPokemons();
    setData(res);
  }, []);

  console.log(data);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <TypeTag type='Bug' />
    </div>
  );
}
