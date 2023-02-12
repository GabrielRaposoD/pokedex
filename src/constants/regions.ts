import { regions } from '@typings/regions';

const regions: { label: regions; min: number; max: number }[] = [
  { label: 'All', min: 1, max: 897 },
  { label: 'Kanto', min: 1, max: 151 },
  { label: 'Johto', min: 152, max: 251 },
  { label: 'Hoenn', min: 252, max: 386 },
  { label: 'Sinnoh', min: 387, max: 493 },
  { label: 'Unova', min: 494, max: 649 },
  { label: 'Kalos', min: 650, max: 721 },
  { label: 'Alola', min: 722, max: 809 },
  { label: 'Galar', min: 810, max: 897 },
];

export default regions;
