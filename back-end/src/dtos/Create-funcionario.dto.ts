import { IsString, IsEmail, IsDateString, IsNotEmpty,  IsNumber } from "class-validator";

export class CreateFuncionarioDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsDateString()
    @IsNotEmpty()
    dataAdmissao: string; 
    
    @IsString()
    @IsNotEmpty()
    cpf: string

    @IsNumber()
    @IsNotEmpty()
    idade: number

     @IsNumber()
    @IsNotEmpty()
    salario: number

    @IsString()
    @IsNotEmpty()
    data_de_nascimento: string

    @IsNotEmpty()
    @IsNumber()
    departamentoId: number
    
    @IsNotEmpty()
    @IsNumber()
    cargoId: number
    
}