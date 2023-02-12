import NextAuth, { AuthOptions, Session } from 'next-auth';

import DiscordProvider from 'next-auth/providers/discord';
import GitHubProvider from 'next-auth/providers/github';
import { NextApiHandler } from 'next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID ?? '',
      clientSecret: process.env.DISCORD_SECRET ?? '',
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
  },

  secret: process.env.SECRET,
};
