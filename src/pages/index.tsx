/* eslint-disable @next/next/no-img-element */
import { PokemonCard } from '@components/index';
import { getAllPokemons } from '@services/pokemon';
import { IPokemon } from '@typings/Pokemon/Pokemon';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

export default function Home() {
  const [data, setData] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');

  console.log(isLoading);

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
        <div className='gap-x-4 flex flex-row'>
          <img src='/icons/pokeball.svg' alt='' />
          <h1 className='text-darkGray text-2xl font-bold'>Pokédex</h1>
        </div>
        <img
          src='/icons/sort.svg'
          alt=''
          className='cursor-pointer'
          onClick={() => {
            setData([...data.reverse()]);
          }}
        />
      </div>
      <input
        type='text'
        name=''
        id=''
        className='bg-backgroung border-lightGray placeholder-mediumGray text-xxs px-2 py-1 mt-3 border border-solid rounded-lg'
        placeholder='Search'
        onChange={(e) => filterByText(e.target.value)}
      />
      {isLoading ? (
        <div className='gap-y-10 md:px-48 flex flex-col items-center justify-center flex-grow h-full'>
          <p className='text-darkGray text-2xl font-bold tracking-wider text-center uppercase'>
            Loading
          </p>
          <div className='relative flex items-center justify-center w-full'>
            <img
              src='/images/pikachu-running.gif'
              alt=''
              className='absolute w-1/2'
            />
            <svg
              className='animate-spin w-full text-red-600'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='2'
              ></circle>
              <path
                strokeWidth='40'
                className='opacity-100'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          </div>
        </div>
      ) : (
        <ol className='flex flex-row flex-wrap gap-5 py-4 list-none'>
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
