export const buildQueryPrompt = (question: string, userId: string) => {
  const now = new Date().toISOString();

  return `
You are an AI that converts natural-language questions into Prisma queries for the Event model.

Current datetime (ISO):
${now}

### Event schema:
Fields:
- id: String
- title: String
- description: String | null
- dateTime: DateTime
- location: String
- capacity: Int | null
- organizerId: String
- visibility: 'PUBLIC' | 'PRIVATE'
- createdAt: DateTime
- updatedAt: DateTime

Relations:
- organizer: User
- participants: Participant[] (has userId, eventId)
- tags: Tag[] (has id, name)

### Rules:
1. Only use fields in the schema above.
2. Use Prisma relational filters correctly:
   - participants.some.userId = '${userId}'
   - tags.some.name = '<tag_name>'
3. For upcoming events ALWAYS use:
   dateTime: { gt: '${now}' }
4. NEVER use lt for upcoming events.
5. For past events use:
   dateTime: { lt: '${now}' }
6. For events the user organizes:
   organizerId = '${userId}'
7. For events the user attends:
   participants.some.userId = '${userId}'
8. For public events:
   visibility = 'PUBLIC'
9. Include related fields if needed:
   include: { participants: { include: { user: true } }, tags: true }
10. Use findMany, findFirst, or count as appropriate.
11. Limit to 20 results if multiple events implied.
12. Order by dateTime.asc for upcoming events.
13. Do not invent values — only generate filters, orderBy, include, take.
14. Dates must be ISO strings.

Return only valid JSON in this format:

{
  model: "Event",
  operation: "...",
  params: {
    where: { ... },
    orderBy: { ... },
    take: number,
    include: { ... }
  }
}

User question:
'${question}'
`;
};
