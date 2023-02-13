/* eslint-disable @next/next/no-img-element */

import { ChangeEvent, useCallback, useState } from 'react';
import {
  LoadingScreen,
  Pagination,
  PokemonCard,
  SelectInput,
} from '@components/index';

import Link from 'next/link';
import _ from 'lodash';
import cs from 'clsx';
import { pokemonType } from '@typings/pokemon';
import regions from 'constants/regions';
import { usePokemons } from 'hooks/usePokemons';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [typeFilter, setTypeFilter] = useState<pokemonType[]>([]);
  const [catched, setCatched] = useState<boolean>(false);
  const [reverse, setReverse] = useState<boolean>(false);
  const [region, setRegion] = useState(regions[0]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');

  const PAGE_SIZE = 27;

  const { pokemons, status: fetchStatus } = usePokemons(
    page,
    PAGE_SIZE,
    region.min,
    region.max,
    reverse
  );

  console.log(pokemons);

  const { data: session, status } = useSession();

  const handleRegionFilter = (value: any) => {
    setRegion(value);
    setPage(1);
  };

  const handleTypeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTypeFilter([...typeFilter, e.target.value as pokemonType]);
    } else {
      setTypeFilter(
        _.remove(typeFilter, (value) => {
          return value !== e.target.value;
        })
      );
    }
    setPage(1);
  };

  const filterByText = _.debounce(
    useCallback(
      (text: string) => {
        if (!filter.length) {
          setLastPage(page);
        }

        setFilter(text);

        if (!text.length) {
          setPage(lastPage);
        } else {
          setPage(1);
        }
      },
      [lastPage, page, filter]
    ),
    100
  );

  return (
    <section className='flex flex-col min-h-screen px-5 py-6 overflow-hidden'>
      <header className='md:flex-row md:items-center flex flex-col justify-between w-full'>
        <div className='gap-x-4 flex flex-row items-center'>
          <img src='/icons/pokeball.svg' alt='' className='lg:w-10' />
          <h1 className='text-darkGray lg:text-4xl text-2xl font-bold'>
            Pokédex
          </h1>
        </div>
        <div className='gap-x-10 flex flex-row items-center justify-between'>
          {status === 'authenticated' ? (
            <div className='gap-x-4 md:text-base flex flex-row items-center text-xs'>
              <p>Welcome, {session.user.name}!</p>
              <Link
                href='/api/auth/signout'
                className='border-darkGray w-max px-2 py-1 border rounded-md'
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <Link
              href='/api/auth/signin'
              className='border-darkGray px-2 py-1 border rounded-md'
            >
              Sign In
            </Link>
          )}
        </div>
      </header>
      <form className='flex flex-col w-full'>
        <input
          type='text'
          name=''
          id=''
          className='border-lightGray placeholder-mediumGray text-xxs lg:text-sm lg:px-4 lg:py-2 px-2 py-1 mt-3 bg-white border border-solid rounded-lg shadow-md'
          placeholder='Search Pokemon'
          onChange={(e) => filterByText(e.target.value)}
        />
        <div className='flex flex-row flex-wrap items-center gap-5 my-4'>
          <div className='flex flex-col justify-between h-16'>
            <p className='text-darkGray text-xs font-bold'>Regions</p>
            <SelectInput
              selected={region}
              setSelected={handleRegionFilter}
              options={regions}
            />
          </div>
          <div className='flex flex-col justify-between h-16'>
            <p className='text-darkGray text-xs font-bold'>Sort by Number</p>
            <img
              src='/icons/sort.svg'
              alt=''
              className='w-8 -mb-2 cursor-pointer'
              onClick={() => {
                setReverse((r) => !r);
                setPage(1);
              }}
            />
          </div>
          {status === 'authenticated' && (
            <div className='flex flex-col justify-between h-16'>
              <p className='text-darkGray text-xs font-bold'>Catched Only</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='60px'
                height='60px'
                viewBox='0 0 100 100'
                className={cs('cursor-pointer -mb-3', {
                  'opacity-50': !catched,
                })}
                onClick={() => {
                  setCatched(!catched), setPage(1);
                }}
              >
                <path
                  d='M 30 50
      a 1 1 1 0 1 40 0
      h-12.5
      a 1 1 1 0 0 -15 0
      z'
                  fill='#f00'
                  stroke='#222'
                ></path>
                <circle
                  cx='50'
                  cy='50'
                  r='5'
                  fill='#222'
                  stroke='#222'
                ></circle>
                <path
                  d='M 30 50
      a 1 1 1 0 0 40 0
      h-12.5
      a 1 1 1 0 1 -15 0
      z'
                  fill='#fff'
                  stroke='#222'
                ></path>
              </svg>
            </div>
          )}
        </div>
        <div className='flex flex-row flex-wrap gap-2 my-4'>
          {/* {Object.keys(keyof pokemonType).map((type: pokemonType) => (
            <div className='flex flex-row items-center gap-2' key={type}>
              <input
                type='checkbox'
                name=''
                id=''
                value={type}
                className='rounded-xl'
                onChange={(e) => handleTypeFilter(e)}
              />
              <TypeTag type={type} />
            </div>
          ))} */}
        </div>

        <Pagination
          currentPage={page}
          itemsPerPage={PAGE_SIZE}
          total={region.max - region.min + 1}
          setCurrentPage={setPage}
        />
      </form>
      {fetchStatus !== 'success' ? (
        <LoadingScreen />
      ) : (
        <ol className='flex flex-row flex-wrap justify-center gap-5 py-4 list-none'>
          {pokemons?.map((pokemon, i) => (
            <PokemonCard pokemon={pokemon.name} key={i} />
          ))}
        </ol>
      )}
    </section>
  );
}
