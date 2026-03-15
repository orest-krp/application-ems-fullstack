import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { type AuthReq } from '@ems-fullstack/utils';
import { UserResponseDto } from 'src/utils/dto/users.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Fetching logged user' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: AuthReq): Promise<UserResponseDto> {
    return await this.userService.me(req.user.id);
  }
}
