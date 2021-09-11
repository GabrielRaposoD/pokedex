/* eslint-disable @next/next/no-img-element */
import { IPokemon } from '@typings/Pokemon/Pokemon';
import { getColorByType } from 'utils/getColorByType';
import Link from 'next/link';

interface PokemonCardProps {
  pokemon: IPokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <li>
      <Link href={`/pokemon/${pokemon.name}`}>
        <a
          className={`flex flex-col text-right bg-white border border-black border-solid rounded-lg h-28 w-24 justify-between overflow-hidden cursor-pointer ${
            getColorByType[pokemon.types[0].type.name].border
          }`}
        >
          <p
            className={`text-xxxs mx-2 mt-1 ${
              getColorByType[pokemon.types[0].type.name].text
            }`}
          >
            #{pokemon.id}
          </p>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt=''
            className='w-full h-20'
          />
          <div className=''>
            <p
              className={`text-xxs text-center text-white capitalize ${
                getColorByType[pokemon.types[0].type.name].bg
              }`}
            >
              {pokemon.name}
            </p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PokemonCard;
