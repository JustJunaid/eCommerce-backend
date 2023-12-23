import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { CurrentUser } from '../users/users.decorator';
import { ProductsService } from './products.service';
import { Product } from 'src/products/models/product.model';

@Resolver()
export class ProductsResolver {
    constructor(private productsService: ProductsService) { }

    @UseGuards(new GqlAuthGuard('jwt'))
    @Query(() => [Product])
    getProducts(@CurrentUser() user: typeof CurrentUser) {
        return this.productsService.getProdcuts();
    }

    @UseGuards(new GqlAuthGuard('jwt'))
    @Mutation(() => Product)
    addProduct(
        @Args({ name: 'product', type: () => Product })
        data: Product,
    ) {
        return this.productsService.addProduct(data);
    }
}
