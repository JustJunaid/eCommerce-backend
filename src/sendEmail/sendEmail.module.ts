import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { SendEmailService } from './sendEmail.service';
import { join } from 'path';

@Global()
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                logger: true,
                debug: true,
                ignoreTLS: false,
                auth: {
                    type: 'OAUTH2',
                    user: process.env.MAILER_USER,
                    serviceClient: process.env.MAILER_SERVICE_CLIENT,
                    privateKey: process.env.MAILER_PRIVATE_KEY.replace(
                        /\\n/g,
                        '\n',
                    ),
                },
            },
            defaults: {
                from: `"No Reply" <noreply@eCommerce.com>`,
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [SendEmailService],
    exports: [SendEmailService], // 👈 export for DI
})
export class SendEmailModule {}
