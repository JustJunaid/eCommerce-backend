import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { SendEmailModule } from './sendEmail/sendEmail.module';
import { AuthModule } from './auth/auth.module';
import { AttributesModule } from './attributes/attributes.module';
import config from './config';

@Module({
    imports: [
        GraphQLModule.forRoot(config.graphql),
        AuthModule,
        UsersModule,
        SharedModule,
        SendEmailModule,
        AttributesModule,
    ],
})
export class AppModule {}
