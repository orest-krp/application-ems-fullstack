import { PrismaPg } from '@prisma/adapter-pg';
import { EventVisibility, PrismaClient } from 'generated/prisma/client';
import { Pool } from 'pg';
import argon2 from 'argon2';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_PASSWORD = 'password';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function clearDatabase() {
  await prisma.participant.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('All data cleared!');
}

async function main() {
  await clearDatabase();
  const userData = [
    { name: 'Alice Johnson', email: 'alice@example.com' },
    { name: 'Bob Smith', email: 'bob@example.com' },
    { name: 'Charlie Brown', email: 'charlie@example.com' },
  ];

  const users = await Promise.all(
    userData.map(async (u) => {
      const hashedPassword = await argon2.hash(DEFAULT_PASSWORD);
      return prisma.user.create({
        data: {
          ...u,
          password: hashedPassword,
        },
      });
    }),
  );

  const tagNames = ['tech', 'cooking', 'fitness', 'wellness', 'business'];

  const tags = await Promise.all(
    tagNames.map((name) =>
      prisma.tag.create({
        data: { name },
      }),
    ),
  );

  const eventData = [
    {
      title: 'Node.js Workshop',
      description: 'Learn Node.js from scratch!',
      location: 'Online',
      capacity: 50,
      visibility: EventVisibility.PUBLIC,
    },
    {
      title: 'Cooking Masterclass',
      description: 'Cook like a pro!',
      location: 'Culinary Studio',
      capacity: 15,
      visibility: EventVisibility.PRIVATE,
    },
    {
      title: 'React Bootcamp',
      description: 'Advanced React training.',
      location: 'Online',
      capacity: 30,
      visibility: EventVisibility.PUBLIC,
    },
    {
      title: 'Yoga Retreat',
      description: 'Relax and recharge.',
      location: 'Mountain Resort',
      capacity: 20,
      visibility: EventVisibility.PRIVATE,
    },
    {
      title: 'Startup Meetup',
      description: 'Networking for entrepreneurs.',
      location: 'City Hub',
      capacity: 100,
      visibility: EventVisibility.PUBLIC,
    },
  ];

  const events = await Promise.all(
    eventData.map((event, i) =>
      prisma.event.create({
        data: {
          ...event,
          dateTime: new Date(Date.now() + (i + 1) * ONE_DAY_MS),
          organizerId: users[i % users.length].id,

          tags: {
            connect: [
              { id: tags[i % tags.length].id },
              { id: tags[(i + 1) % tags.length].id },
            ],
          },
        },
      }),
    ),
  );

  const participantsData: { userId: string; eventId: string }[] = [];

  for (const event of events) {
    const shuffledUsers = [...users].sort(() => Math.random() - 0.5);

    participantsData.push({
      userId: event.organizerId,
      eventId: event.id,
    });

    const otherUsers = shuffledUsers.filter((u) => u.id !== event.organizerId);

    const extraCount = Math.floor(Math.random() * otherUsers.length);

    const selectedUsers = otherUsers.slice(0, extraCount);

    for (const user of selectedUsers) {
      participantsData.push({
        userId: user.id,
        eventId: event.id,
      });
    }
  }

  const uniqueParticipants = Array.from(
    new Map(
      participantsData.map((p) => [`${p.userId}-${p.eventId}`, p]),
    ).values(),
  );

  await prisma.participant.createMany({
    data: uniqueParticipants,
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
