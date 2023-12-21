import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { SendEmailModule } from './sendEmail/sendEmail.module';
import { AuthModule } from './auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/schema.gql',
        }),
        AuthModule,
        UsersModule,
        SharedModule,
        SendEmailModule,
        ProductsModule
    ],
})
export class AppModule { }
