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

  const dave = await prisma.user.create({
    data: {
      name: 'Dave Wilson',
      email: 'dave@example.com',
      password: 'password123',
    },
  });

  const emma = await prisma.user.create({
    data: {
      name: 'Emma Davis',
      email: 'emma@example.com',
      password: 'password123',
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: 'React Bootcamp',
      description: 'Intensive React training for developers.',
      dateTime: new Date('2026-04-10T09:00:00Z'),
      location: 'Online',
      capacity: 30,
      visibility: EventVisibility.PUBLIC,
      organizerId: charlie.id,
    },
  });

  const event4 = await prisma.event.create({
    data: {
      title: 'Yoga Retreat',
      description: 'Weekend retreat for relaxation and mindfulness.',
      dateTime: new Date('2026-04-12T08:00:00Z'),
      location: 'Peaceful Valley, Wellness Town',
      capacity: 20,
      visibility: EventVisibility.PRIVATE,
      organizerId: emma.id,
    },
  });

  await prisma.participant.createMany({
    data: [
      { userId: alice.id, eventId: event3.id },
      { userId: bob.id, eventId: event3.id },
      { userId: dave.id, eventId: event3.id },
      { userId: charlie.id, eventId: event4.id },
      { userId: dave.id, eventId: event4.id },
    ],
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
