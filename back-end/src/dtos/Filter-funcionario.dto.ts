// src/funcionario/dto/filter-funcionario.dto.ts
import { IsOptional, IsNumber, IsString, IsEnum, IsDateString, IsEmail } from 'class-validator';
import { StatusFuncionario } from 'generated/prisma';

export class FilterFuncionarioDto {
  @IsOptional()
  @IsNumber()
  departamentoId?: number;

  @IsOptional()
  @IsNumber()
  cargoId?: number;

  @IsOptional()
  @IsEnum(StatusFuncionario)
  status?: StatusFuncionario;

  @IsOptional()
  @IsDateString()
  dataAdmissaoInicio?: string;

  @IsOptional()
  @IsDateString()
  dataAdmissaoFim?: string;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string
}