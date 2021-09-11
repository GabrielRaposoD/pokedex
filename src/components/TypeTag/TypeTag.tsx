import { pokemonType } from '@typings/pokemon';
import { getColorByType } from 'utils/getColorByType';

interface TypeTagProps {
  type: pokemonType;
}

const TypeTag: React.FC<TypeTagProps> = ({ type }) => {
  return (
    <div
      className={`rounded-2lg ${getColorByType[type].bg} text-white py-0.5 px-2 font-bold text-xxs capitalize`}
    >
      {type}
    </div>
  );
};

export default TypeTag;
