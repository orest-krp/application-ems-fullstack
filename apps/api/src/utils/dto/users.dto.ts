import { UserResponse } from '@ems-fullstack/utils';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto implements UserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;
}
