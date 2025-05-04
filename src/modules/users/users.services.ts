import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInDto, SignUpDto } from 'src/dtos/user.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private configService: ConfigService,
  ) {}

  getAllUsers(user) {
    return this.UserModel.find({ email: { $ne: user } }).select(
      'fullName age mobileNumber -_id',
    );
  }

  getProfile(user) {
    return this.UserModel.findOne({ email: user }).select(
      'fullName age mobileNumber -_id',
    );
  }

  async signUp(dto: SignUpDto) {
    let user = await this.UserModel.findOne({ email: dto.email });

    if (user) {
      throw new ConflictException('Email already exists');
    }

    user = await this.UserModel.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });

    const { password: _password, ...newUser } = user.toJSON();
    return newUser;
  }

  async signIn(dto: SignInDto) {
    const user = await this.UserModel.findOne({ email: dto.email }).exec();

    if (!user) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const match = await bcrypt.compare(dto.password, user.password);

    if (!match) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const token = jwt.sign(
      user.email,
      this.configService.getOrThrow<string>('JWT_SECRET'),
    );

    return token;
  }
}
