import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    // @ApiProperty()
    // id: string;

    // @ApiProperty()
    // readonly email: string;

    // @ApiProperty()
    // readonly name: string;

    name: string;
    password: string;
    email: string;
}
