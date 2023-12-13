import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { User } from '../users/user.entity';

@Injectable()
export class SendEmailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(user: any, token: string) {
        await this.mailerService.sendMail({
            to: user.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Welcome to Advanced eCommerce App! Confirm your Email',
            template: './confirmation', // `.hbs` extension is appended automatically
            context: {
                // ✏️ filling curly brackets with content
                name: (user as any).firstName,
                token,
            },
        });
    }
}
