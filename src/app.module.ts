import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { SendEmailModule } from './sendEmail/sendEmail.module';
import { AuthModule } from './auth/auth.module';
import { AttributesModule } from './attributes/attributes.module';
import config from './config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql'
          }),
        AuthModule,
        UsersModule,
        SharedModule,
        SendEmailModule,
        AttributesModule,
    ],
})
export class AppModule {}
