import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('confirm')
    @ApiOkResponse({})
    async verifyOtp(@Body() UserData: any): Promise<any> {
        const { confirmationOtp, email } = UserData;
        return await this.authService.verifyOtp(confirmationOtp, email);
    }
}
