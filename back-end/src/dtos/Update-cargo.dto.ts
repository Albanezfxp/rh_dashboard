import { PartialType } from "@nestjs/mapped-types"
import { CreateCargoDto } from "./Create-cargo.dto"

export class UpdateCargoDto extends PartialType(CreateCargoDto){}