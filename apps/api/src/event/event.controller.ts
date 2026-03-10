import {
  eventApiSchema,
  type AuthReq,
  type OptionalAuthReq,
  ParticipantWithUser,
} from '@ems-fullstack/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { EventService } from './event.service';
import { EventDetailsService } from './event-details.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional.jwt-auth.guard';
import { YupValidationPipe } from 'src/validation.pipe';

import {
  EventCardResponseDto,
  EventDetailsResponseDto,
  EventRequestDto,
  EventResponseDto,
} from 'src/dto/event.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly eventDetailsService: EventDetailsService,
  ) {}

  @ApiOperation({ summary: 'Create a new event' })
  @ApiBearerAuth()
  @UsePipes(new YupValidationPipe(eventApiSchema))
  @UseGuards(JwtAuthGuard)
  @Post()
  async createEvent(
    @Body() event: EventRequestDto,
    @Req() req: AuthReq,
  ): Promise<EventResponseDto> {
    return this.eventService.createEvent(event, req.user.id);
  }

  @ApiOperation({ summary: 'Join an event' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':eventId/join')
  async joinEvent(
    @Param('eventId') eventId: string,
    @Query('token') token: string,
    @Req() req: AuthReq,
  ): Promise<ParticipantWithUser> {
    return this.eventService.joinEvent(eventId, req.user.id, token);
  }

  @ApiOperation({ summary: 'Leave an event' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':eventId/join')
  async leaveEvent(@Param('eventId') eventId: string, @Req() req: AuthReq) {
    return this.eventService.leaveEvent(eventId, req.user.id);
  }

  @ApiOperation({ summary: 'Edit an event' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':eventId')
  async editEvent(
    @Body(new YupValidationPipe(eventApiSchema)) event: EventRequestDto,
    @Param('eventId') eventId: string,
    @Req() req: AuthReq,
  ): Promise<EventResponseDto> {
    return this.eventService.editEvent(event, req.user.id, eventId);
  }

  @ApiOperation({ summary: 'Delete an event' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':eventId')
  async deleteEvent(
    @Param('eventId') eventId: string,
    @Req() req: AuthReq,
  ): Promise<EventResponseDto> {
    return this.eventService.deleteEvent(req.user.id, eventId);
  }

  @ApiOperation({ summary: 'Get all accessible events' })
  @Get()
  async getEvents(
    @Req() req: OptionalAuthReq,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
  ): Promise<{
    events: EventCardResponseDto[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageSizeNumber = pageSize ? parseInt(pageSize, 10) : 10;

    return await this.eventService.getAllAccessible(
      pageNumber,
      pageSizeNumber,
      search,
    );
  }

  @ApiOperation({ summary: 'Get events of the logged-in user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyEvents(@Req() req: AuthReq): Promise<EventCardResponseDto[]> {
    return await this.eventService.getMyEvents(req.user.id);
  }

  @ApiOperation({ summary: 'Get details of a specific event' })
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':eventId')
  async getEventDetails(
    @Param('eventId') eventId: string,
    @Req() req: OptionalAuthReq,
  ): Promise<EventDetailsResponseDto> {
    const userId = req.user?.id || null;
    const email = req.user?.email || null;

    return this.eventDetailsService.getEventDetails(eventId, userId, email);
  }
}
