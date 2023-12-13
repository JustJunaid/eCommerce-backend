import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { JwtPayload } from '../guards/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import config from '../config';

@Injectable()
export class UsersService {
    private readonly jwtPrivateKey: string;

    constructor(private readonly prisma: PrismaService) {
        this.jwtPrivateKey = config.jwtPrivateKey;
    }

    async getUserByEmail(email) {
        return this.prisma.users.findFirst({
            where: { email, isEmailConfirmed: true },
        });
    }

    async findAll() {
        return await this.prisma.users.findMany();
    }

    // async getUser(id: string) {
    //     const user = await this.usersRepository.findByPk<User>(id);
    //     if (!user) {
    //         throw new HttpException(
    //             'User with given id not found',
    //             HttpStatus.NOT_FOUND,
    //         );
    //     }
    //     return new UserDto(user);
    // }

    async create(payload: any) {
        const { password } = payload;
        try {
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            const userData = await this.prisma.users.create({
                data: { ...payload, password: hashedPassword },
            });

            // when registering then log user in automatically by returning a token
            // const token = await this.signToken(userData);
            return { userData };
        } catch (err) {
            console.log('error', err);
            if (err.original.constraint === 'user_email_key') {
                return {
                    success: false,
                    message: `User with email '${err.errors[0].value}' already exists`,
                };
            }

            return {
                success: false,
                message: err.errors[0],
            };
        }
    }

    async login(userLoginRequestDto: UserLoginRequestDto) {
        const email = userLoginRequestDto.email;

        const userByEmail = await this.prisma.users.findFirst({
            where: { email },
        });

        if (!userByEmail) {
            return {
                success: false,
                message: 'User does not exist!',
            };
        }

        const { isEmailConfirmed, password } = userByEmail;

        if (!isEmailConfirmed)
            return {
                success: false,
                data: {email},
                message: 'Email is not verified!',
                redirect: true,
                emailVerified: false
            };

        const isMatch = await compare(userLoginRequestDto.password, password);
        if (!isMatch)
            return {
                success: false,
                message: 'Invalid email or password!',
            };

        const token = await this.signToken(userByEmail);
        return { success: true, user: userByEmail, token };
    }

    // async update(id: string, updateUserDto: UpdateUserDto) {
    //     const user = await this.usersRepository.findByPk<User>(id);
    //     if (!user) {
    //         throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    //     }

    //     user.name = updateUserDto.name || user.name;

    //     try {
    //         const data = await user.save();
    //         return new UserDto(data);
    //     } catch (err) {
    //         throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async delete(id: string) {
    //     const user = await this.usersRepository.findByPk<User>(id);
    //     await user.destroy();
    //     return new UserDto(user);
    // }

    async signToken(user: any) {
        const payload: JwtPayload = {
            email: user.email,
        };

        return sign(payload, this.jwtPrivateKey, {});
    }

    async updateOtp(userData: any) {
        const user = await this.prisma.users.findFirst({
            where: { email: userData.email },
        });

        if (user) {
            await this.prisma.users.update({
                where: { email: userData.email },
                data: userData,
            });
            return true;
        } else {
            return false;
        }
    }
}
