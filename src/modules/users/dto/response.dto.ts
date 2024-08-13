export class UserDto {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly phone: string;

    constructor(
        id: number,
        name: string,
        email: string,
        phone: string,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

export class UserResponseDto {
    readonly data: UserDto;
    readonly token: string;

    constructor(
        data: UserDto,
        token: string,
    ) {
        this.data = data;
        this.token = token;
    }
}

export class UserLogout {
    readonly message: string;

    constructor(
        message: string,
    ) {
        this.message = message;
    }
}