/* eslint-disable @next/next/no-img-element */
import { PokemonCard, LoadingScreen } from '@components/index';
import { getAllPokemons } from '@services/pokemon';
import { IPokemon } from '@typings/Pokemon/Pokemon';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

export default function Home() {
  const [data, setData] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');

  const fetchData = useCallback(async () => {
    const res = await getAllPokemons({ limit: '897' }).then((r) => {
      setIsLoading(false);
      return r;
    });
    setData(res);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filterByText = _.debounce(
    useCallback((text) => {
      setFilter(text);
    }, []),
    100
  );

  return (
    <section className='flex flex-col min-h-screen px-5 py-6 overflow-hidden'>
      <div className='flex flex-row justify-between w-full'>
        <div className='gap-x-4 flex flex-row items-center'>
          <img src='/icons/pokeball.svg' alt='' className='lg:w-10' />
          <h1 className='text-darkGray lg:text-4xl text-2xl font-bold'>
            Pokédex
          </h1>
        </div>
        <img
          src='/icons/sort.svg'
          alt=''
          className='lg:w-8 cursor-pointer'
          onClick={() => {
            setData([...data.reverse()]);
          }}
        />
      </div>
      <input
        type='text'
        name=''
        id=''
        className='bg-backgroung border-lightGray placeholder-mediumGray text-xxs lg:text-sm lg:px-4 lg:py-2 px-2 py-1 mt-3 border border-solid rounded-lg'
        placeholder='Search'
        onChange={(e) => filterByText(e.target.value)}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ol className='flex flex-row flex-wrap justify-center gap-5 py-4 list-none'>
          {data
            .filter((item) => item.name.includes(filter))
            .map((item, i) => (
              <PokemonCard pokemon={item} key={i} />
            ))}
        </ol>
      )}
    </section>
  );
}
