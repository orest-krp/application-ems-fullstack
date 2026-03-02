import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { type AuthReq } from '@ems-fullstack/types';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Fetching logged user' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: AuthReq) {
    return await this.userService.me(req.user.id);
  }
}
