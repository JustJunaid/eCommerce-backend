import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.users.deleteMany();
    await prisma.products.deleteMany()
    await prisma.brands.deleteMany()
    await prisma.categories.deleteMany()

    console.log('Seeding...');

    await prisma.users.createMany({
        data: [
            {
                email: 'lisa@simpson.com',
                name: 'Lisa',
                password:
                    '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
                confirmationOTP: '31234',
                otpExpiryTime: new Date(),
                isEmailConfirmed: true,
                role: 'SELLER'
            },
            {
                email: 'junaid@fantoz.tech',
                name: 'Junaid Choudhary',
                password:
                    '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
                confirmationOTP: '123432',
                otpExpiryTime: new Date(),
                isEmailConfirmed: true,
                role: 'SELLER'
            }
        ]
    });

    await prisma.brands.createMany({
        data: ["Puma",
            "Reebok",
            "Adidas",
            "Woodland",
            "Lee Cooper",
            "Nike"].map((el, index) => ({ brandName: el, id: `${index + 1}` }))
    })

    await prisma.categories.createMany({
        data: ["Footwear",
            "Apparel",
            "Perfumes",
            "Accessories",
            "Personal Care",
            "Collectibles"].map((el, index) => ({ categoryName: el, id: `${index + 1}` }))
    })

    await prisma.products.createMany({
        data: [...Array(6)].map((_, index) => ({
            productName: `Product ${index + 1}`,
            description: `Product Number ${index + 1}: A very good product everyone should buy it.`,
            price: `${Math.random() * 1000}`,
            brandsId: `${index + 1}`,
            categoriesId: `${index + 1}`,
        })),
    })
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
