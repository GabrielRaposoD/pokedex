import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { Listbox, Transition } from '@headlessui/react';

import { Fragment } from 'react';

interface SelectInputProps {
  options: { label: string; [key: string]: any }[];
  selected: { label: string; [key: string]: any };
  setSelected: (value) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  selected,
  setSelected,
}) => {
  return (
    <div className='w-72'>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative'>
          <Listbox.Button className='focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 sm:text-sm border-lightGray text-xxs lg:text-sm lg:px-4 lg:py-2 relative w-full px-2 py-1 mt-3 text-left bg-white border rounded-lg shadow-md cursor-default'>
            <span className='block truncate'>{selected.label}</span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <ChevronUpDownIcon
                className='text-darkGray w-5 h-5'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg'>
              {options.map((option, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                    cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                          absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon
                            className='w-5 h-5 text-black'
                            aria-hidden='true'
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectInput;
