import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { CargoService } from './cargos.service';
import { CreateCargoDto } from '../dtos/Create-cargo.dto';
import { UpdateCargoDto } from '../dtos/Update-cargo.dto';

@Controller('cargos')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Get()
  async getAll() {
    return this.cargoService.getAll();
  }

  @Get('media-salarial')
  async getMediaSalaria() {
    return this.cargoService.getMediaSalarial();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.cargoService.getById(Number(id));
  }


  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateCargoDto) {
    return this.cargoService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCargoDto,
  ) {
    return this.cargoService.update(Number(id), data);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.cargoService.delete(Number(id));
  }
}