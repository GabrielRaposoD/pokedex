/* eslint-disable @next/next/no-img-element */

const LoadingScreen: React.FC = () => {
  return (
    <div className='gap-y-10 md:px-48 2xl:px-[700px] xl:px-[500px] lg:px-[300px] flex flex-col items-center justify-center flex-grow h-full'>
      <p className='text-darkGray text-2xl font-bold tracking-wider text-center uppercase'>
        Loading
      </p>
      <div className='relative flex items-center justify-center w-full'>
        <img
          src='/images/pikachu-running.gif'
          alt=''
          className='absolute w-1/2'
        />
        <svg
          className='animate-spin w-full text-red-600'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='2'
          ></circle>
          <path
            strokeWidth='40'
            className='opacity-100'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default LoadingScreen;
