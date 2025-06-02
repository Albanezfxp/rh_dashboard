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
import { DepartamentoService } from './departamentos.service';
import { CreateDepartamentoDto } from 'src/dtos/Create-departamento.dto';
import { UpdateDepartamentoDto } from 'src/dtos/Update-departamento.dto';


@Controller('departamentos')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Get()
  async getAll() {
    return this.departamentoService.getAll();
  }

  @Get("quantidade-por-departamento")
  async getQuantidadePorDepartamento() {
    return this.departamentoService.getQuantidadePorDepartamento()
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.departamentoService.getById(Number(id));
  }

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateDepartamentoDto) {
    return this.departamentoService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateDepartamentoDto,
  ) {
    return this.departamentoService.update(Number(id), data);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.departamentoService.delete(Number(id));
  }
}