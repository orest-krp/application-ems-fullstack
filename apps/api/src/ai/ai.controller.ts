import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AIService } from './ai.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import type { AuthReq } from '@ems-fullstack/utils';
import { AIRequestDto, AIResponseDto } from 'src/utils/dto/ai.dto';

@Controller('ask')
export class AIController {
  constructor(private aiService: AIService) {}
  @ApiOperation({ summary: 'Ask ai assistant' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async askAI(
    @Body() aiRequest: AIRequestDto,
    @Req() req: AuthReq,
  ): Promise<AIResponseDto> {
    return this.aiService.ask(req.user.id, aiRequest.question);
  }
}
