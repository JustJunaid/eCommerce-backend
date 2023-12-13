import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

@InputType('AttributesInput')
@ObjectType('Attributes')
export class Attributes {
    @Field()
    id?: string;

    @Field()
    attributeType: String;

    @Field()
    attributeName: string;

    @Field()
    attributeIconName: string;

    @Field()
    attributeIconUrl: string;

    @Field()
    active: Boolean;

    @Field()
    attributeValue: string;

    @Field(type => [AttributeValues])
    attributeValues: AttributeValues[];
}

@InputType('AttributeValuesInput')
@ObjectType('AttributeValues')
export class AttributeValues {
    @Field()
    id?: string;

    @Field()
    attributeValueName: string;

    @Field()
    iconName: string;

    @Field()
    iconUrl: string;

    @Field(type => Int)
    index: number;

    @Field()
    active: Boolean;

    @Field(type => Int, { nullable: true })
    attributesId?: number;
}
