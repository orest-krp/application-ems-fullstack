import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UserResponseDTO, type AuthReq } from '@ems-fullstack/utils';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Fetching logged user' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: AuthReq): Promise<UserResponseDTO> {
    return await this.userService.me(req.user.id);
  }
}
