import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) { }

    async getProdcuts() {
        const products = await this.prisma.products.findMany({
            include: {
                brand: true,
                category: true
            },
        });
        return products
    }

    async addProduct(product: Product) {
        const addedProduct = await this.prisma.products.create({
            data: {
                productName: product.productName,
                description: product.description,
                price: product.price,
                brand: {
                    create: {
                        brandName: product.brand.brandName
                    }
                },
                category: {
                    create: {
                        categoryName: product.category.categoryName
                    }
                }
            },
            include: {
                brand: true,
                category: true
            },
        });

        return addedProduct;
    }
}
