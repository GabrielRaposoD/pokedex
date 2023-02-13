import { IApiResource } from './ApiResourceList';
import { ILanguage } from './Language';
import { IMachine } from '../Machines/Machine';
import { INamedApiResource } from './NamedApiResourceList';
import { IVersion } from '../Games/Version';
import { IVersionGroup } from '../Games/VersionGroup';

export interface ICacheableResource {
  id: number;
  name: string;
}

export interface IDescription {
  description: string;
  language: INamedApiResource;
}

export interface IEffect {
  effet: string;
  language: INamedApiResource;
}

export interface IEncounter {
  min_level: number;
  max_level: number;
  condition_values: Array<INamedApiResource>;
  chance: number;
  method: INamedApiResource;
}

export interface IFlavorText {
  flavor_text: string;
  language: INamedApiResource;
  version: INamedApiResource;
}

export interface IGenerationGameIndex {
  game_index: number;
  generation: INamedApiResource;
}

export interface IMachineVersionDetail {
  machine: IApiResource<IMachine>;
  version_group: INamedApiResource;
}

export interface IName {
  name: string;
  language: INamedApiResource;
}

export interface IVerboseEffect {
  effect: string;
  short_effect: string;
  language: INamedApiResource;
}

export interface IVersionEncounterDetail {
  version: INamedApiResource;
  max_chance: number;
  encounter_details: IEncounter[];
}

export interface IVersionGameIndex {
  game_index: number;
  version: INamedApiResource;
}

export interface IVersionGroupFlavorText {
  text: string;
  language: INamedApiResource;
  version_group: INamedApiResource;
}
