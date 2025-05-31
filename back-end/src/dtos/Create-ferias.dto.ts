import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateFeriasDto {
    @IsNotEmpty()
    @IsString()
    cpf: string
    @IsNotEmpty()
    @IsDate()
    dataInicio: Date
    @IsNotEmpty()
    @IsDate()
    dataFim: Date
}