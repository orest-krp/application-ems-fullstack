import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.quard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { setTokens } from 'src/utils/helpers';
import { YupValidationPipe } from 'src/utils/validation.pipe';
import {
  type AuthReq,
  registerUserShema,
  loginUserSchema,
  type RegisterUserDto,
} from '@ems-fullstack/types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @UsePipes(new YupValidationPipe(registerUserShema))
  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }

  @ApiOperation({ summary: 'User login' })
  @UsePipes(new YupValidationPipe(loginUserSchema))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: AuthReq, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.generateTokens(
      req.user.id,
      req.user.email,
    );
    setTokens(res, tokens);
    return tokens;
  }

  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: 'Logout user' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { message: 'Logged out successfully' };
  }

  @ApiCookieAuth('refreshToken')
  @ApiOperation({ summary: 'Refresh access token' })
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refresh(
    @Req() req: AuthReq,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.generateTokens(
      req.user.id,
      req.user.email,
    );
    setTokens(res, tokens);
    return tokens;
  }
}
