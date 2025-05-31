import { PartialType } from "@nestjs/mapped-types";
import { CreateDepartamentoDto } from "./Create-departamento.dto";

export class UpdateDepartamentoDto extends PartialType(CreateDepartamentoDto) {}