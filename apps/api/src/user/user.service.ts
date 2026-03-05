import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import argon2 from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto, UserResponseDTO } from '@ems-fullstack/utils';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async create(user: RegisterUserDto): Promise<UserResponseDTO> {
    const isUserExist = Boolean(await this.findByEmail(user.email));

    if (isUserExist) {
      throw new BadRequestException('User with the same email already exists');
    }

    const hashedPassword = await argon2.hash(user.password);

    return await this.prismaService.user.create({
      data: { ...user, password: hashedPassword },
      omit: { password: true, updatedAt: true },
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findById(userId: string) {
    return await this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }

  async me(userId: string): Promise<UserResponseDTO> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      omit: { password: true, updatedAt: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
