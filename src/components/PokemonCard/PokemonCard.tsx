/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { getColorByType } from 'utils/getColorByType';
import { pokemonType } from '@typings/pokemon';
import { usePokemon } from 'hooks/usePokemon';

interface PokemonCardProps {
  pokemon: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { data } = usePokemon(pokemon);

  if (!data) {
    return <></>;
  }

  return (
    <li>
      <Link
        href={`/pokemon/${data?.pokemon.name}`}
        className={`shadow-xl flex flex-col relative items-center text-right bg-white border border-solid rounded-lg lg:h-48 lg:w-44 md:h-44 md:w-40 h-28 w-24 justify-between overflow-hidden cursor-pointer ${
          getColorByType[data?.pokemon.types[0].type.name as pokemonType].border
        }`}
      >
        <p
          className={`text-xxxs md:text-xxs right-0 p-1 absolute ${
            getColorByType[data?.pokemon.types[0].type.name as pokemonType].text
          }`}
        >
          #{data?.pokemon.id}
        </p>
        <img
          src={data?.pokemon.sprites.other['official-artwork'].front_default}
          alt=''
          className='lg:w-11/12'
        />
        <div className=' w-full'>
          <p
            className={`text-xxs md:text-xs lg:text-sm text-center text-white capitalize ${
              getColorByType[data?.pokemon.types[0].type.name as pokemonType].bg
            }`}
          >
            {data?.pokemon.name}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default PokemonCard;
