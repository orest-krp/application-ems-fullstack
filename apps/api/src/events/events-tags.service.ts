import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventsTagsService {
  constructor(private prismaService: PrismaService) {}

  async searchTags(search?: string) {
    const tags = await this.prismaService.tag.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take: 10,
      orderBy: {
        name: 'asc',
      },
    });

    return { tags };
  }
}
