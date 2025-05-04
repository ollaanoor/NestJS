import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.services';
import { SignInDto, SignUpDto } from 'src/dtos/user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('/users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/all')
  getAllUsers(@Req() req: Request) {
    const user = req['user'];
    return this.service.getAllUsers(user);
  }

  @Get('/my-profile')
  getProfile(@Req() req: Request) {
    const user = req['user'];
    return this.service.getProfile(user);
  }

  @Post('/sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.service.signUp(dto);
  }

  @Post('/sign-in')
  signIn(@Body() dto: SignInDto) {
    return this.service.signIn(dto);
  }
}
