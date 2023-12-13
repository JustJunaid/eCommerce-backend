import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttributesService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        const attributes = await this.prisma.attributes.findMany({
            where: { active: true },
            include: {
                attributeValues: true,
            },
        });
        return attributes;
    }

    async addAttributes(attributes) {
        for (let i = 0; i < attributes.length; i++) {
            await this.prisma.attributes.upsert({
                where : {
                    id: attributes[i].id
                },
                update: {
                    ...attributes[i],
                    attributeValues: {
                        createMany: {
                            data: attributes[i].attributeValues,
                        },
                    },
                },
                create: {
                    ...attributes[i],
                    attributeValues: {
                        createMany: {
                            data: attributes[i].attributeValues,
                        },
                    },
                },
                include: {
                    attributeValues: true,
                },
            });
        }

        return 'Attributes submitted Successfully!';
    }
}
