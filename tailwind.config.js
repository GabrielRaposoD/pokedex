module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/{components,pages}/**/*.{js,ts,jsx,tsx}',
      './safelist.txt',
    ],
    options: {
      safelist: [
        'text-dragon',
        'border-dragon',
        'bg-rock',
        'text-rock',
        'border-rock',
        'bg-ghost',
        'text-ghost',
        'border-ghost',
        'bg-steel',
        'text-steel',
        'border-steel',
        'bg-water',
        'text-water',
        'border-water',
        'bg-grass',
        'text-grass',
        'border-grass',
        'bg-psychic',
        'text-psychic',
        'border-psychic',
        'bg-ice',
        'text-ice',
        'border-ice',
        'bg-dark',
        'text-dark',
        'border-dark',
        'bg-fairy',
        'text-fairy',
        'border-fairy',
        'bg-normal',
        'text-normal',
        'border-normal',
        'bg-fighting',
        'text-fighting',
        'border-fighting',
        'bg-flying',
        'text-flying',
        'border-flying',
        'bg-poison',
        'text-poison',
        'border-poison',
        'bg-ground',
        'text-ground',
        'border-ground',
        'bg-bug',
        'text-bug',
        'border-bug',
        'bg-fire',
        'text-fire',
        'border-fire',
        'bg-electric',
        'text-electric',
        'border-electric',
        'bg-dragon',
        'text-dragon',
        'border-dragon',
      ],
    },
  },
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        rock: '#B69e31',
        ghost: '#70559b',
        steel: '#b7b9d0',
        water: '#6493eb',
        grass: '#74cb48',
        psychic: '#fb5584',
        ice: '#9ad6df',
        dark: '#75574c',
        fairy: '#E69EAC',
        normal: '#AAA67F',
        fighting: '#C12239',
        flying: '#A891EC',
        poison: '#A43E9E',
        ground: '#DEC16B',
        bug: '#A7B723',
        fire: '#F57D31',
        electric: '#F9CF30',
        dragon: '#7037FF',
        darkGray: '#212121',
        mediumGray: '#666666',
        lightGray: '#E0E0E0',
        backgroung: '#F7F7F7',
      },
      borderRadius: {
        '2lg': '10px',
      },
      fontSize: {
        xxs: [
          '10px',
          {
            lineHeight: '16px',
          },
        ],
        xxxs: [
          '8px',
          {
            lineHeight: '12px',
          },
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
