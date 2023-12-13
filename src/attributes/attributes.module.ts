import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AttributesResolver } from './attributes.resolver';
import { AttributesService } from './attributes.service';

@Module({
    imports: [],
    providers: [PrismaService, AttributesService, AttributesResolver],
})
export class AttributesModule {}
