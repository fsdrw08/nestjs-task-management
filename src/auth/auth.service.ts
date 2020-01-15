import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(username: string, password: string): Promise<{ accessToken: string }> {
    const resultUsername = await this.userRepository.validateUserPassword(username, password);
    if (!resultUsername) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payLoad: JwtPayload = { username: resultUsername };
    const accessToken = this.jwtService.sign(payLoad);
    return { accessToken };
  }
}
