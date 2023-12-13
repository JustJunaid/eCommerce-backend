import {
    IsString,
    IsEmail,
    IsOptional,
    MinLength,
    IsNumber,
    IsBoolean,
    IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    [x: string]: any;
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    @ApiProperty()
    @IsString()
    readonly name: string;

    // @ApiProperty()
    // @IsOptional()
    // @IsNumber()
    // confirmationOtp: number;

    // @ApiProperty()
    // @IsOptional()
    // @IsBoolean()
    // isEmailConfirmed: boolean;

    // @ApiProperty()
    // @IsOptional()
    // @IsDate()
    // otpExpiryTime: Date;
}
