/* eslint-disable @next/next/no-img-element */

import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { LoadingScreen, TypeTag } from '@components/index';

import ErrorPage from 'next/error';
import Link from 'next/link';
import Router from 'next/router';
import cs from 'clsx';
import { getColorByType } from 'utils/getColorByType';
import { pokemonType } from '@typings/pokemon';
import { setCatchedPokemon } from '@services/pokemon';
import { usePokemon } from 'hooks/usePokemon';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const PokemonPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const { data: session } = useSession();
  const { data, status } = usePokemon(name as string);

  if (status === 'error') {
    return <ErrorPage statusCode={404} />;
  }

  if (status === 'loading' || !data) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`${
        getColorByType[data.pokemon.types[0].type.name as pokemonType].bg
      } relative min-h-screen lg:h-full lg:max-h-full max-h-screen pb-1.5 flex flex-col`}
    >
      <div className='px-7 flex flex-row items-center w-full pt-5'>
        <Link href='/'>
          <ArrowLeftIcon className='cursor-pointer text-white w-6' />
        </Link>
        <h2 className='md:text-3xl ml-4 text-2xl font-bold text-white capitalize'>
          {data.pokemon.name}
        </h2>
        <p className='md:text-base flex-grow text-xs font-bold leading-8 text-right text-white'>
          #{data.pokemon.id}
        </p>
      </div>
      <img
        src='/images/pokeball.svg'
        alt=''
        className='absolute top-0 right-0 m-2 lg:w-[40%]'
      />
      <div className='justify px-7 mt-36 lg:mt-60 xl:mt-80 relative flex flex-row justify-between'>
        <button
          onClick={() => {
            const id = data.pokemon.id > 1 ? data.pokemon.id - 1 : 897;
            router.replace(`/pokemon/` + id);
          }}
        >
          <ChevronLeftIcon className='w-8 cursor-pointer text-white' />
        </button>
        <img
          src={data.pokemon.sprites.other['official-artwork'].front_default}
          alt=''
          className='left-1/4 md:w-4/12 md:left-1/2 md:transform md:-translate-x-1/2 md:-top-32 absolute w-1/2 top-[-105px] lg:-top-52 xl:top-[-340px] 2xl:w-3/12 max-w-[480px] z-20'
        />

        <button
          onClick={() => {
            const id = data.pokemon.id < 897 ? data.pokemon.id + 1 : 1;
            router.replace(`/pokemon/` + id);
          }}
        >
          <ChevronRightIcon className='w-8 cursor-pointer text-white' />
        </button>
      </div>
      <section className='w-auto h-full mx-1.5 bg-white rounded-lg md:mt-10 mt-4 flex flex-col lg:pb-7 flex-grow relative z-0'>
        <div className='gap-x-4 flex flex-row items-center justify-center w-full mt-20'>
          {data.pokemon.types.map((t, i) => (
            <TypeTag type={t.type.name as pokemonType} key={i} />
          ))}
        </div>
        <p
          className={`text-center font-bold text-sm mt-3 md:text-xl ${
            getColorByType[data.pokemon.types[0].type.name as pokemonType].text
          }`}
        >
          About
        </p>
        <div className='flex flex-row items-center justify-center w-full mt-3 divide-x'>
          <div className='flex flex-col items-center justify-between h-full pr-6 pt-1.5 md:min-h-[60px] min-h-[50px]'>
            <div className='flex flex-row items-center gap-2'>
              <img src='/icons/weigth.svg' alt='' className='md:w-5' />
              <p className='text-darkGray text-xxs md:text-xs'>
                {(data.pokemon.weight / 10).toFixed(1)} KG
              </p>
            </div>
            <p className='text-mediumGray text-xxxs md:text-xs'>Weigth</p>
          </div>
          <div className='flex flex-col items-center justify-between h-full px-6 pt-1.5 md:min-h-[60px] min-h-[50px]'>
            <div className='flex flex-row items-center gap-2'>
              <img src='/icons/ruler.svg' alt='' className='md:w-3' />
              <p className='text-darkGray text-xxs md:text-xs'>
                {(data.pokemon.height / 10).toFixed(1)} M
              </p>
            </div>
            <p className='text-mediumGray text-xxxs md:text-xs'>Height</p>
          </div>
          <div className='flex flex-col items-center justify-between h-full px-6 pt-1.5 md:min-h-[60px] min-h-[50px]'>
            <div className='flex flex-col items-center capitalize'>
              {data.pokemon.abilities.map((a, i) => (
                <p key={i} className='text-darkGray text-xxs md:text-xs'>
                  {a.ability.name.replace('-', ' ')}
                </p>
              ))}
            </div>
            <p className='text-mediumGray text-xxxs md:text-xs'>Abiliities</p>
          </div>
        </div>
        <p className='text-xxs text-darkGray md:text-sm lg:mt-7 px-5 mt-5'>
          {data.description.flavor_text_entries
            .reverse()
            .find((item) => item.language.name === 'en')?.flavor_text ?? ''}
        </p>
        <p
          className={`text-center font-bold text-sm mt-3 lg:mt-5 md:text-xl ${
            getColorByType[data.pokemon.types[0].type.name as pokemonType].text
          }`}
        >
          Base Stats
        </p>
        <div className='flex flex-row w-full px-5 mt-3'>
          <div
            className={`flex flex-col text-right font-bold text-xxs border-r pr-2 md:text-sm ${
              getColorByType[data.pokemon.types[0].type.name as pokemonType]
                .text
            }`}
          >
            <p>HP</p>
            <p>ATK</p>
            <p>DEF</p>
            <p>SATK</p>
            <p>SDEF</p>
            <p>SPD</p>
          </div>
          <div className=' flex flex-col w-full ml-2'>
            {data.pokemon.stats.map((s, i) => (
              <div className='flex flex-row items-center w-full gap-2' key={i}>
                <p className='text-darkGray text-xxs md:text-sm w-5'>
                  {s.base_stat}
                </p>
                <div className='relative w-full'>
                  <div
                    className={`flex h-1 overflow-hidden text-xs bg-opacity-20 ${
                      getColorByType[
                        data.pokemon.types[0].type.name as pokemonType
                      ].bg
                    } rounded`}
                  >
                    <div
                      style={{
                        width: ((s.base_stat / 255) * 100).toString() + '%',
                      }}
                      className={`whitespace-nowrap flex flex-col justify-center text-center text-white ${
                        getColorByType[
                          data.pokemon.types[0].type.name as pokemonType
                        ].bg
                      } shadow-none`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!!session && (
          <button
            onClick={() =>
              setCatchedPokemon(data.pokemon.id).then(() => Router.reload())
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='60px'
              height='60px'
              viewBox='0 0 100 100'
              className={cs('absolute top-0 right-0 cursor-pointer', {
                'opacity-50': !session?.user?.catchedPokemons?.includes(
                  data.pokemon.id
                ),
              })}
            >
              <path
                d='M 30 50 a 1 1 1 0 1 40 0 h-12.5 a 1 1 1 0 0 -15 0 z'
                fill='#f00'
                stroke='#222'
              />
              <circle cx='50' cy='50' r='5' fill='#222' stroke='#222' />
              <path
                d='M 30 50 a 1 1 1 0 0 40 0 h-12.5 a 1 1 1 0 1 -15 0 z'
                fill='#fff'
                stroke='#222'
              />
            </svg>
          </button>
        )}
      </section>
    </div>
  );
};

export default PokemonPage;
