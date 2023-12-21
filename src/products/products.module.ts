import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';

@Module({
    imports: [],
    providers: [PrismaService, ProductsResolver, ProductsService],
})

export class ProductsModule { }
