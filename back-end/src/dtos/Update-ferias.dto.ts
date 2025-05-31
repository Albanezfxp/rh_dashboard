import { PartialType } from "@nestjs/mapped-types";
import { CreateFeriasDto } from "./Create-ferias.dto";
import { IsBoolean } from "class-validator";

export class UpdateFeriasDto extends PartialType(CreateFeriasDto) {
    @IsBoolean()
    aprovada: boolean
}