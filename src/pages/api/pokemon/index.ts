import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { getSession } from 'next-auth/react';
import _ from 'lodash';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pokemonId } = req.body;

  const session: any = await getSession({ req });

  if (session) {
    let array: number[] = session.user.catchedPokemons;

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
