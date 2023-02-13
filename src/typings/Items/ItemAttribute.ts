import { IDescription, IName } from '../Utility/CommonModels';

import { IItem } from './Item';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IItemAttribute {
  id: number;
  name: string;
  items: Array<INamedApiResource>;
  names: IName[];
  descriptions: IDescription[];
}
