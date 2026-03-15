import { Controller, Get, Query } from '@nestjs/common';
import { EventsTagsService } from './events-tags.service';
import { ApiOperation } from '@nestjs/swagger';
import { TagsResponseDto } from 'src/utils/dto/events.dto';

@Controller('tags')
export class EventsTagsController {
  constructor(private eventsTags: EventsTagsService) {}
  @ApiOperation({ summary: 'Search for tags' })
  @Get()
  async searchTags(@Query('search') search?: string): Promise<TagsResponseDto> {
    return await this.eventsTags.searchTags(search);
  }
}
