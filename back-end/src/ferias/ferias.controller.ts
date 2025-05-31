import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FeriasService } from './ferias.service';
import { CreateFeriasDto } from 'src/dtos/Create-ferias.dto';
import { UpdateFeriasDto } from 'src/dtos/Update-ferias.dto';

@Controller('ferias')
export class FeriasController {
  constructor(private readonly feriasService: FeriasService) {}

  @Get()
  async getAll() {
    return this.feriasService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.feriasService.getById(id);
  }

  @Post()
  async create(@Body() data: CreateFeriasDto) {
    return this.feriasService.createFerias(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFeriasDto,
  ) {
    return this.feriasService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.feriasService.delete(id);
  }
}
