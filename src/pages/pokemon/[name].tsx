/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { getPokemon, getPokemonDescription } from '@services/pokemon';
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
  const [description, setDescription] = useState<string>('');

  console.log(description);

  const fetchData = useCallback(async () => {
    try {
      const res = await getPokemon(name as string);
      const desc = await getPokemonDescription(name as string);

      setDescription(
        desc.data.flavor_text_entries
          .reverse()
          .find((item) => item.language.name === 'en').flavor_text
      );

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
      <section className='w-auto h-full mx-1.5 mb-1.5 bg-white rounded-lg mt-4 flex flex-col'>
        <div className='gap-x-4 mt-14 flex flex-row items-center justify-center w-full'>
          {data.types.map((t, i) => (
            <TypeTag type={t.type.name} key={i} />
          ))}
        </div>
        <p
          className={`text-center font-bold text-sm mt-3 ${
            getColorByType[data.types[0].type.name].text
          }`}
        >
          About
        </p>
        <div className='flex flex-row items-center justify-center w-full mt-3 divide-x'>
          <div className='flex flex-col items-center justify-between h-full pr-6 pt-1.5'>
            <div className='flex flex-row items-center gap-2'>
              <img src='/icons/weigth.svg' alt='' />
              <p className='text-darkGray text-xxs'>
                {(data.weight / 10).toFixed(1)} KG
              </p>
            </div>
            <p className='text-mediumGray text-xxxs'>Weigth</p>
          </div>
          <div className='flex flex-col items-center justify-between h-full px-6 pt-1.5'>
            <div className='flex flex-row items-center gap-2'>
              <img src='/icons/ruler.svg' alt='' />
              <p className='text-darkGray text-xxs'>
                {(data.height / 10).toFixed(1)} M
              </p>
            </div>
            <p className='text-mediumGray text-xxxs'>Height</p>
          </div>
          <div className='flex flex-col items-center justify-center h-full pl-6'>
            <div className='flex flex-col items-center capitalize'>
              {data.abilities.map((a, i) => (
                <p key={i} className='text-darkGray text-xxs'>
                  {a.ability.name.replace('-', ' ')}
                </p>
              ))}
            </div>
            <p className='text-mediumGray text-xxxs'>Abiliities</p>
          </div>
        </div>
        <p className='text-xxs text-darkGray px-5 mt-3'>{description}</p>
        <p
          className={`text-center font-bold text-sm mt-3 ${
            getColorByType[data.types[0].type.name].text
          }`}
        >
          Base Stats
        </p>
        <div className='flex flex-row w-full px-5 mt-3'>
          <div
            className={`flex flex-col text-right font-bold text-xxs border-r pr-2 ${
              getColorByType[data.types[0].type.name].text
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
            {data.stats.map((s, i) => (
              <div className='flex flex-row items-center w-full gap-2' key={i}>
                <p className='text-darkGray text-xxs w-5'>{s.base_stat}</p>
                <div className='relative w-full'>
                  <div
                    className={`flex h-1 overflow-hidden text-xs bg-opacity-20 ${
                      getColorByType[data.types[0].type.name].bg
                    } rounded`}
                  >
                    <div
                      style={{
                        width: ((s.base_stat / 255) * 100).toString() + '%',
                      }}
                      className={`whitespace-nowrap flex flex-col justify-center text-center text-white ${
                        getColorByType[data.types[0].type.name].bg
                      } shadow-none`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PokemonPage;
