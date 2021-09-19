/* eslint-disable @next/next/no-img-element */
import { PokemonCard, LoadingScreen, Pagination } from '@components/index';
import { getAllPokemons } from '@services/pokemon';
import { IPokemon } from '@typings/Pokemon/Pokemon';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

export default function Home() {
  const [data, setData] = useState<IPokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');
  const PAGE_SIZE = 27;

  const { data: session, status } = useSession();

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
      <div className='flex flex-row items-center justify-between w-full'>
        <div className='gap-x-4 flex flex-row items-center'>
          <img src='/icons/pokeball.svg' alt='' className='lg:w-10' />
          <h1 className='text-darkGray lg:text-4xl text-2xl font-bold'>
            Pokédex
          </h1>
        </div>
        <div className='gap-x-10 flex flex-row items-center'>
          {status === 'authenticated' ? (
            <div className='gap-x-4 flex flex-row items-center'>
              <p>Welcome, {session.user.name}!</p>
              <Link href='/api/auth/signin'>
                <a className='border-darkGray w-max px-2 py-1 border rounded-md'>
                  Sign Out
                </a>
              </Link>
            </div>
          ) : (
            <Link href='/api/auth/signin'>
              <a className='border-darkGray px-2 py-1 border rounded-md'>
                Sign In
              </a>
            </Link>
          )}
          <img
            src='/icons/sort.svg'
            alt=''
            className='lg:w-8 cursor-pointer'
            onClick={() => {
              setData([...data.reverse()]);
            }}
          />
        </div>
      </div>
      <form className='flex flex-col w-full'>
        <input
          type='text'
          name=''
          id=''
          className='bg-backgroung border-lightGray placeholder-mediumGray text-xxs lg:text-sm lg:px-4 lg:py-2 px-2 py-1 mt-3 border border-solid rounded-lg'
          placeholder='Search'
          onChange={(e) => filterByText(e.target.value)}
        />
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          itemsPerPage={PAGE_SIZE}
          total={
            data.filter((item) =>
              item.name.toLowerCase().includes(filter.toLowerCase())
            ).length
          }
        />
      </form>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ol className='flex flex-row flex-wrap justify-center gap-5 py-4 list-none'>
          {data
            .filter((item) =>
              item.name.toLowerCase().includes(filter.toLowerCase())
            )
            .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
            .map((item, i) => (
              <PokemonCard pokemon={item} key={i} />
            ))}
        </ol>
      )}
    </section>
  );
}
