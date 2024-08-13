import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class TaskRequestDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string;
}