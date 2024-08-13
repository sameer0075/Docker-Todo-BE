import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, IsEmail, Matches } from "class-validator";

export class CreateUserRequestDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
            'Password too weak. Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
    password: string;
}

export class UpdateUserRequestDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;
}

export class LoginUserRequestDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
            'Password too weak. Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
    password: string;
}