import { Inject, Injectable } from '@nestjs/common';
import moment from 'moment';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async verifyOtp(confirmationOTP: string, email: string) {
        const user = await this.prisma.users.findFirst({
            where: {
                email,
                otpExpiryTime: {
                    gte: moment()
                        .utc()
                        .toDate(),
                },
            },
        });
        if (user) {
            const otpCheck = await this.prisma.users.findFirst({
                where: { email, confirmationOTP },
            });
            if (otpCheck) {
                await this.prisma.users.update({
                    where: { email },
                    data: { isEmailConfirmed: true },
                });
                return {
                    success: true,
                    message: 'Email Verified Successfully!',
                };
            } else {
                return {
                    success: false,
                    message: 'Incorrect Otp Entered. Please try again.',
                };
            }
        } else {
            return {
                success: false,
                message:
                    'Otp expired! Please resend new Otp to verify the email address',
                otpExpired: true,
            };
        }
    }
}
