import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      catchedPokemons: number[];
      email: string;
      image: string;
      name: string;
    };
  }
}
