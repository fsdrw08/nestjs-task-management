import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signUp')
  /*@UsePipes(ValidationPipe)*/
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    await this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(username, password);
  }

  /*
  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  test(@GetUser() user: User) {
    console.log(user);
  }
  */
}
