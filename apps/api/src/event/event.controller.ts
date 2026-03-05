import {
  createEventApiSchema,
  type AuthReq,
  type CreateEventDto,
} from '@ems-fullstack/utils';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { EventService } from './event.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { YupValidationPipe } from 'src/validation.pipe';
import { EventApiResponseDTO } from 'src/dto/event.dto';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}
  @UsePipes(new YupValidationPipe(createEventApiSchema))
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createEvent(
    @Body() event: CreateEventDto,
    @Req() req: AuthReq,
  ): Promise<EventApiResponseDTO> {
    return await this.eventService.createEvent(event, req.user.id);
  }

  @Get()
  async getEvents(): Promise<EventApiResponseDTO[]> {
    return await this.eventService.getAllPublic();
  }
}
