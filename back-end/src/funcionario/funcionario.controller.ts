import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from '../dtos/Create-funcionario.dto';
import { UpdateFuncionarioDto } from '../dtos/Update-funcionario.dto';
import { FilterFuncionarioDto } from 'src/dtos/Filter-funcionario.dto';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Get()
  async getAll() {
    try {
      return await this.funcionarioService.getAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('tempo-de-casa')
  async getTempoDeCasa() {
    return this.funcionarioService.getTempoDeCasa();
  }
  @Get('aniversariante-mes-atual')
  async getAniversariantesDoMes() {
   return await this.funcionarioService.getAniversarianteDoMes()
  }
  
  @Get(':id')
  async getById(@Param('id') id: number) {
    try {
      return await this.funcionarioService.getById(+id);
    } catch (error) {
      throw error;
    }
  }
  @Get('filter')
  async filter(@Query() filter: FilterFuncionarioDto) {
    return this.funcionarioService.getWithFilter(filter)
  }

  @Post()
  async create(@Body() data: CreateFuncionarioDto) {
    try {
      return await this.funcionarioService.create(data);
    } catch (error) {
      throw error;
    }
  }
  @Put('desligamento/:id')
  async desligamento(@Param('id') id:number) {
    return this.funcionarioService.desligamento(id)
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateFuncionarioDto,
  ) {
    try {
      return await this.funcionarioService.update(+id, data);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.funcionarioService.delete(+id);
    } catch (error) {
      throw error;
    }
  }
}