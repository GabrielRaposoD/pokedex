/* eslint-disable @next/next/no-img-element */

import { IPokemon } from '@typings/Pokemon/Pokemon';
import Link from 'next/link';
import { getColorByType } from 'utils/getColorByType';

interface PokemonCardProps {
  pokemon: IPokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <li>
      <Link
        href={`/pokemon/${pokemon.name}`}
        className={`shadow-xl flex flex-col relative items-center text-right bg-white border border-solid rounded-lg lg:h-48 lg:w-44 md:h-44 md:w-40 h-28 w-24 justify-between overflow-hidden cursor-pointer ${
          getColorByType[
            pokemon.types[0].type.name as keyof typeof getColorByType
          ].border
        }`}
      >
        <p
          className={`text-xxxs md:text-xxs right-0 p-1 absolute ${
            getColorByType[
              pokemon.types[0].type.name as keyof typeof getColorByType
            ].text
          }`}
        >
          #{pokemon.id}
        </p>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt=''
          className='lg:w-11/12'
        />
        <div className=' w-full'>
          <p
            className={`text-xxs md:text-xs lg:text-sm text-center text-white capitalize ${
              getColorByType[
                pokemon.types[0].type.name as keyof typeof getColorByType
              ].bg
            }`}
          >
            {pokemon.name}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default PokemonCard;
