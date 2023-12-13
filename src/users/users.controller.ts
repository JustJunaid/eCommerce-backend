import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    Delete,
    Req,
    UseGuards,
    Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { SendEmailService } from '../sendEmail/sendEmail.service';
import moment from 'moment';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';

@Controller()
@ApiTags('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly sendEmailService: SendEmailService,
    ) {}

    @Post('register')
    @ApiOkResponse({ type: UserLoginResponseDto })
    async register(@Body() createUserDto: any): Promise<any> {
        const Otp: any = Math.floor(100000 + Math.random() * 9000);
        createUserDto.confirmationOTP = Otp.toString();
        createUserDto.isEmailConfirmed = false;
        createUserDto.otpExpiryTime = moment()
            .add(6, 'h')
            .toDate();
        const user: any = await this.usersService.create(createUserDto);

        if (user) {
            await this.sendEmailService.sendUserConfirmation(
                createUserDto as any,
                Otp,
            );
        }
        return { success: true, user: { ...user.userData } };
    }

    @Post('login')
    @HttpCode(200)
    @ApiOkResponse({ type: UserLoginResponseDto })
    login(@Body() userLoginRequestDto: any): any {
        return this.usersService.login(userLoginRequestDto);
    }

    @Get('users')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [UserDto] })
    findAll(): Promise<UserDto[]> {
        console.log('user request');
        return this.usersService.findAll();
    }

    // @Get('me')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    // @ApiOkResponse({ type: UserDto })
    // async getUser(@Req() request): Promise<UserDto> {
    //     console.log('user request');
    //     return this.usersService.getUser(request.user.id);
    // }

    // @Put('me')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    // @ApiOkResponse({ type: UserDto })
    // update(
    //     @Body() updateUserDto: UpdateUserDto,
    //     @Req() request,
    // ): Promise<UserDto> {
    //     return this.usersService.update(request.user.id, updateUserDto);
    // }

    // @Delete('me')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    // @ApiOkResponse({ type: UserDto })
    // delete(@Req() request): Promise<UserDto> {
    //     return this.usersService.delete(request.user.id);
    // }

    @Post('resend-otp')
    @ApiOkResponse({})
    async resendOtp(@Body() UserData: any): Promise<any> {
        const token: any = Math.floor(100000 + Math.random() * 9000);
        UserData.confirmationOTP = token.toString();
        UserData.otpExpiryTime = moment()
            .add(6, 'h')
            .toDate();
        const user = await this.usersService.updateOtp(UserData);
        if (user) {
            await this.sendEmailService.sendUserConfirmation(
                UserData as any,
                token,
            );
            return {
                error: false,
                message: `The OTP is sent to ${UserData.email}. Please enter the OTP to verify the email.`,
                email: UserData.email,
            };
        } else {
            return {
                error: true,
                message: 'Some error occured. Please try again!',
            };
        }
    }
}
