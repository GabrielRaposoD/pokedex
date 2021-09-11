/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { getPokemon } from '@services/pokemon';
import { useCallback, useEffect, useState } from 'react';
import { IPokemon } from '@typings/Pokemon/Pokemon';
import { getColorByType } from 'utils/getColorByType';
import { TypeTag } from '@components/index';
import ErrorPage from 'next/error';
import Link from 'next/link';

const PokemonPage = () => {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const { name } = router.query;

  const [data, setData] = useState<IPokemon>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await getPokemon(name as string);
      setData(res.data);
    } catch (error) {
      setError(true);
    }
  }, [name]);

  useEffect(() => {
    if (name) {
      fetchData();
    }
  }, [fetchData, name]);

  if (error) {
    return <ErrorPage statusCode={404} />;
  }

  if (!data) {
    return <p>loading</p>;
  }

  return (
    <div
      className={`${
        getColorByType[data.types[0].type.name].bg
      } relative h-screen`}
    >
      <div className='px-7 flex flex-row items-center w-full pt-5'>
        <Link href='/'>
          <a>
            <img
              src='/icons/arrow-left.svg'
              alt=''
              className='cursor-pointer'
            />
          </a>
        </Link>
        <p className='ml-4 text-2xl font-bold text-white capitalize'>
          {data.name}
        </p>
        <p className='flex-grow text-xs font-bold leading-8 text-right text-white'>
          #{data.id}
        </p>
      </div>
      <img
        src='/images/pokeball.svg'
        alt=''
        className='absolute top-0 right-0 m-2'
      />
      <div className='justify px-7 mt-36 relative flex flex-row justify-between'>
        <img
          src='/icons/chevron-left.svg'
          alt=''
          className='cursor-pointer'
          onClick={() => {
            const id = data.id > 1 ? data.id - 1 : 897;
            router.replace(`/pokemon/` + id);
          }}
        />
        <img
          src={data.sprites.other['official-artwork'].front_default}
          alt=''
          className='left-1/4 absolute w-1/2'
          style={{
            top: '-105px',
          }}
        />
        <img
          src='/icons/chevron-left.svg'
          alt=''
          className='transform rotate-180 cursor-pointer'
          onClick={() => {
            const id = data.id < 897 ? data.id + 1 : 1;
            router.replace(`/pokemon/` + id);
          }}
        />
      </div>
      <section className='w-auto h-full mx-1.5 bg-white rounded-lg mt-4 flex flex-col'>
        <div className='gap-x-4 mt-14 flex flex-row items-center justify-center w-full'>
          {data.types.map((t, i) => (
            <TypeTag type={t.type.name} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PokemonPage;
