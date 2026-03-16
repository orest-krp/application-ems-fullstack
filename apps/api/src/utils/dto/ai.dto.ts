import { AIRequest, AIResponse } from '@ems-fullstack/utils';
import { ApiProperty } from '@nestjs/swagger';

export class AIRequestDto implements AIRequest {
  @ApiProperty()
  question: string;
}

export class AIResponseDto implements AIResponse {
  @ApiProperty()
  response: string;
}
