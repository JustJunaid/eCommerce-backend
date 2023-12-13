import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResponseDto extends UserDto {
    @ApiProperty()
    token: string;

    // @ApiProperty()
}
