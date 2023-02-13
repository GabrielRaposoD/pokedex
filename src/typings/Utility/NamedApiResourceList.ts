import { pokemonType } from '@typings/pokemon';

export interface INamedApiResource {
  name: string | pokemonType;
  url: string;
}

export interface INamedApiResourceList {
  count: number;
  next: string;
  previous: string;
  results: Array<INamedApiResource>;
}
