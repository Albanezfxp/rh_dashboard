import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionarioDto } from "./Create-funcionario.dto";

export class UpdateFuncionarioDto extends PartialType(CreateFuncionarioDto) {}