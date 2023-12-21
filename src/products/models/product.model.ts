import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

@InputType('BrandInput')
@ObjectType()
export class Brand {
    @Field()
    brandName: string;
}

@InputType('CategoryInput')
@ObjectType()
export class Category {
    @Field()
    categoryName: string;
}

@InputType('ProductInput')
@ObjectType()
export class Product {
    @Field()
    productName: string;

    @Field()
    description: string;

    @Field()
    price: string;

    @Field()
    brand: Brand;

    @Field()
    category: Category;

    @Field()
    rating: number;

    @Field()
    review: string;
}
