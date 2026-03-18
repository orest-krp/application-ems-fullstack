import { Prisma } from 'generated/prisma/client';

export type AIFindManyQuery = {
  model: 'Event';
  operation: 'findMany';
  params?: Prisma.EventFindManyArgs;
};

export type AIFindFirstQuery = {
  model: 'Event';
  operation: 'findFirst';
  params?: Prisma.EventFindFirstArgs;
};

export type AICountQuery = {
  model: 'Event';
  operation: 'count';
  params?: Prisma.EventCountArgs;
};

export type AIQuery = AIFindManyQuery | AIFindFirstQuery | AICountQuery;
