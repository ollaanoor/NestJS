import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsInt, IsNotEmpty, IsNumberString, IsString, Matches, Max, Min, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'olla@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Olla1234',
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class SignUpDto extends SignInDto {
  @ApiProperty({
    example: 'Olla A.',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 24,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(16)
  @Max(60)
  age: number;

  @ApiProperty({
    example: '01112345678',
  })
  @IsNumberString()
  @IsNotEmpty()
  @Matches(/^01\d{9}$/, { message: 'Mobile number must be 11 digits and starts with 01' })
  mobileNumber: string;
}
