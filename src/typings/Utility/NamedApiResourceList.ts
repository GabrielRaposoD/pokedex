import { pokemonType } from '@typings/pokemon';

export interface INamedApiResource<T> {
  name: string | pokemonType;
  url: string;
}

export interface INamedApiResourceList<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<INamedApiResource<T>>;
}
