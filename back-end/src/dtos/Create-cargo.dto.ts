import { IsNotEmpty, IsString } from "class-validator";

export class CreateCargoDto {
    @IsString()
    @IsNotEmpty()
    nome: string
    
    @IsString()
    @IsNotEmpty()
    descricao: string
}