import {
  IMachineVersionDetail,
  IName,
  IVerboseEffect,
} from '../Utility/CommonModels';

import { IAbilityEffectChange } from '../Pokemon/Ability';
import { IApiResource } from '../Utility/ApiResourceList';
import { IContestEffect } from '../Contests/ContestEffect';
import { INamedApiResource } from '../Utility/NamedApiResourceList';
import { ISuperContestEffect } from '../Contests/SuperContestEffect';

export interface IMove {
  id: number;
  name: string;
  accuracy: number;
  effect_chance: number;
  pp: number;
  priority: number;
  power: number;
  contest_combos: IContestComboSets;
  contest_type: INamedApiResource;
  contest_effect: IApiResource<IContestEffect>;
  damage_class: INamedApiResource;
  effect_entries: IVerboseEffect[];
  effect_changes: IAbilityEffectChange[];
  flavor_text_entries: IMoveFlavorText[];
  generation: INamedApiResource;
  machines: IMachineVersionDetail[];
  meta: IMoveMetaData;
  names: IName[];
  past_values: IPastMoveStatValues[];
  stat_changes: IMoveStatChange[];
  super_contest_effect: IApiResource<ISuperContestEffect>;
  target: INamedApiResource;
  type: INamedApiResource;
}

export interface IContestComboSets {
  normal: IContestComboDetail;
  super: IContestComboDetail;
}

export interface IContestComboDetail {
  use_before: Array<INamedApiResource>;
  use_after: Array<INamedApiResource>;
}

export interface IMoveFlavorText {
  flavor_text: string;
  language: INamedApiResource;
  version_group: INamedApiResource;
}

export interface IMoveMetaData {
  ailment: INamedApiResource;
  category: INamedApiResource;
  min_hits: number;
  max_hits: number;
  min_turns: number;
  max_turns: number;
  drain: number;
  healing: number;
  crit_rate: number;
  ailment_chance: number;
  flinch_chance: number;
  stat_chance: number;
}

export interface IMoveStatChange {
  change: number;
  stat: INamedApiResource;
}

export interface IPastMoveStatValues {
  accuracy: number;
  effect_chance: number;
  power: number;
  pp: number;
  effect_entries: IVerboseEffect[];
  type: INamedApiResource;
  version_group: INamedApiResource;
}
