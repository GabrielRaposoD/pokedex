import { pokemonType } from '@typings/pokemon';
import { colorByType } from 'utils/getColorByType';

interface TypeTagProps {
  type: pokemonType;
}

const TypeTag: React.FC<TypeTagProps> = ({ type }) => {
  return (
    <div
      className={`rounded-2lg ${colorByType[type].bg} text-white py-0.5 px-2 font-bold text-xxs`}
    >
      {type}
    </div>
  );
};

export default TypeTag;
