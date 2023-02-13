import type { NextApiRequest, NextApiResponse } from 'next';

import { Session } from 'next-auth';
import _ from 'lodash';
import { getSession } from 'next-auth/react';
import { prisma } from 'lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pokemonId } = req.body;

  const session: Session | null = await getSession({ req });

  if (session) {
    let array: number[] = session.user.catchedPokemons ?? [];

    array.includes(pokemonId)
      ? (array = _.remove(array, (i) => {
          return i !== pokemonId;
        }))
      : array.push(pokemonId);

    const result = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        catchedPokemons: {
          set: array,
        },
      },
    });
    return res.json(result);
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
