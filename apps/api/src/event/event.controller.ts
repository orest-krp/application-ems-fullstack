import {
  type EventApiRequestDto,
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { YupValidationPipe } from 'src/validation.pipe';
import {
  EventApiResponseDTO,
  EventDetailsApiResponseDTO,
} from 'src/dto/event.dto';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional.jwt-auth.guard';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}
  @UsePipes(new YupValidationPipe(eventApiSchema))
  @UseGuards(JwtAuthGuard)
  @Post()
  async createEvent(
    @Body() event: EventApiRequestDto,
    @Req() req: AuthReq,
  ): Promise<EventApiResponseDTO> {
    return await this.eventService.createEvent(event, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':eventId/join')
  async joinEvent(
    @Param('eventId') eventId: string,
    @Query('token') token: string,
    @Req() req: AuthReq,
  ): Promise<ParticipantWithUser> {
    return await this.eventService.joinEvent(eventId, req.user.id, token);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':eventId/join')
  async leaveEvent(@Param('eventId') eventId: string, @Req() req: AuthReq) {
    return await this.eventService.leaveEvent(eventId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':eventId')
  async editEvent(
    @Body(new YupValidationPipe(eventApiSchema)) event: EventApiRequestDto,
    @Param('eventId') eventId: string,
    @Req() req: AuthReq,
  ): Promise<EventApiResponseDTO> {
    return await this.eventService.editEvent(event, req.user.id, eventId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':eventId')
  async deleteEvent(
    @Param('eventId') eventId: string,
    @Req() req: AuthReq,
  ): Promise<EventApiResponseDTO> {
    return await this.eventService.deleteEvent(req.user.id, eventId);
  }

  @Get()
  async getEvents(): Promise<EventApiResponseDTO[]> {
    return await this.eventService.getAllPublic();
  }

  @Get(':eventId')
  @UseGuards(OptionalJwtAuthGuard)
  async getEventDetails(
    @Param('eventId') eventId: string,
    @Req() req: OptionalAuthReq,
  ): Promise<EventDetailsApiResponseDTO> {
    const userId = req.user?.id || null;
    const email = req.user?.email || null;
    return await this.eventService.getEventDetails(eventId, userId, email);
  }
}
