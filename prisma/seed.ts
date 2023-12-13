import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.users.deleteMany();

    console.log('Seeding...');

    const user1 = await prisma.users.create({
        data: {
            email: 'lisa@simpson.com',
            name: 'Lisa',
            password:
                '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
            confirmationOTP: '31234',
            otpExpiryTime: new Date(),
            isEmailConfirmed: false,
        },
    });

    const user2 = await prisma.users.create({
        data: {
            email: 'junaid@fantoz.tech',
            name: 'Junaid Choudhary',
            password:
                '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
            confirmationOTP: '123432',
            otpExpiryTime: new Date(),
            isEmailConfirmed: false,
        },
    });

    const attribute1 = await prisma.attributes.create({
        data: {
            attributeType: 'WHOLE_NUMBER',
            attributeName: 'Whole number name',
            attributeIconName: 'Icon 1',
            attributeIconUrl: 'laksjdf',
            active: true,
            attributeValue: 'Only one value',
        },
    });

    const attribute2 = await prisma.attributes.create({
        data: {
            attributeType: 'VALUE_LIST',
            attributeName: 'Attribute name',
            attributeIconName: 'Icon 2',
            attributeIconUrl: 'laksjdf',
            attributeValue: '',
            active: true,
            attributeValues: {
                create: [
                    {
                        attributeValueName: 'First Value',
                        iconName: 'String',
                        iconUrl: 'String',
                        index: 0,
                        active: true,
                    },
                    {
                        attributeValueName: 'Second Value',
                        iconName: 'String',
                        iconUrl: 'String',
                        index: 1,
                        active: true,
                    },
                    {
                        attributeValueName: 'Third Value',
                        iconName: 'String',
                        iconUrl: 'String',
                        index: 2,
                        active: true,
                    },
                ],
            },
        },
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
