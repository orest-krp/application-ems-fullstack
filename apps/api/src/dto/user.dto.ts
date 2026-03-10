import { UserResponse } from '@ems-fullstack/utils';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto implements UserResponse {
  @ApiProperty({ example: 'user_12345' })
  id!: string;

  @ApiProperty({ example: 'John Doe' })
  name!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email!: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2026-03-01T08:00:00Z',
  })
  createdAt!: Date;
}
