/* eslint-disable @next/next/no-img-element */

import {
  LoadingScreen,
  Pagination,
  PokemonCard,
  SelectInput,
} from '@components/index';

import Link from 'next/link';
import _ from 'lodash';
import cs from 'clsx';
import regions from 'constants/regions';
import { usePokemons } from 'hooks/usePokemons';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [catched, setCatched] = useState<boolean>(false);
  const [reverse, setReverse] = useState<boolean>(false);
  const [region, setRegion] = useState(regions[0]);

  const PAGE_SIZE = 27;

  const { pokemons, status: fetchStatus } = usePokemons(
    page,
    PAGE_SIZE,
    region.min,
    region.max,
    reverse
  );

  const { data: session, status } = useSession();

  const handleRegionFilter = (value: any) => {
    setRegion(value);
    setPage(1);
  };

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
              <p>Welcome, {session?.user.name}!</p>
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
        <ul className='flex flex-row flex-wrap items-center gap-5 my-4'>
          <li className='flex flex-col justify-between h-16'>
            <p className='text-darkGray text-xs font-bold'>Regions</p>
            <SelectInput
              selected={region}
              setSelected={handleRegionFilter}
              options={regions}
            />
          </li>
          <li className='flex flex-col justify-between h-16'>
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
          </li>
        </ul>
        <div className='flex flex-row flex-wrap gap-2 my-4'></div>

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
