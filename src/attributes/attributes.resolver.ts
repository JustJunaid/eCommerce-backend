import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { Attributes } from './models/attribute.model';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { CurrentUser } from '../users/users.decorator';

@Resolver()
export class AttributesResolver {
    constructor(private attributesService: AttributesService) {}

    @Query(() => [Attributes])
    @UseGuards(new GqlAuthGuard('jwt'))
    getAttributes(@CurrentUser() user: typeof CurrentUser) {
        return this.attributesService.findAll();
    }

    @Mutation(() => String!)
    addAttributes(
        @Args({ name: 'data', type: () => [Attributes] })
        data,
    ) {
        console.log('data', data);
        return this.attributesService.addAttributes(data);
    }
}
