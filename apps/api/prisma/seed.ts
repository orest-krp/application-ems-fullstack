import { PrismaPg } from '@prisma/adapter-pg';
import { EventVisibility, PrismaClient } from 'generated/prisma/client';
import { Pool } from 'pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const alice = await prisma.user.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: 'password123',
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: 'password123',
    },
  });

  const charlie = await prisma.user.create({
    data: {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      password: 'password123',
    },
  });

  const event1 = await prisma.event.create({
    data: {
      title: 'Node.js Workshop',
      description: 'Learn Node.js from scratch!',
      dateTime: new Date('2026-04-01T10:00:00Z'),
      location: 'Online',
      capacity: 50,
      visibility: EventVisibility.PUBLIC,
      organizerId: alice.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Private Cooking Class',
      description: 'Exclusive cooking event for selected guests.',
      dateTime: new Date('2026-04-05T15:00:00Z'),
      location: '123 Culinary St, Foodtown',
      capacity: 10,
      visibility: EventVisibility.PRIVATE,
      organizerId: bob.id,
    },
  });

  await prisma.participant.createMany({
    data: [
      { userId: bob.id, eventId: event1.id },
      { userId: charlie.id, eventId: event1.id },
      { userId: alice.id, eventId: event2.id },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
