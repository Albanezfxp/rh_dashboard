import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from 'src/dtos/Create-departamento.dto';
import { UpdateDepartamentoDto } from 'src/dtos/Update-departamento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartamentoService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.departamento.findMany({
      include: {
        funcionarios: true, 
      },
    });
  }

  async getQuantidadePorDepartamento() {
    return await this.prisma.view_departamentos_com_quantidade.findMany()
  }

  async getById(id: number) {
    const departamento = await this.prisma.departamento.findUnique({
      where: { id },
      include: {
        funcionarios: true,
      },
    });

    if (!departamento) {
      throw new HttpException('Departamento não encontrado', HttpStatus.NOT_FOUND);
    }

    return departamento;
  }

  async create(data: CreateDepartamentoDto) {
    try {
      return await this.prisma.departamento.create({
        data: {
          nome: data.nome,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Erro ao criar departamento',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, data: UpdateDepartamentoDto) {
    const departamento = await this.prisma.departamento.findUnique({
      where: { id },
    });

    if (!departamento) {
      throw new HttpException('Departamento não encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.departamento.update({
      where: { id },
      data: {
        nome: data.nome,
      },
    });
  }

  async delete(id: number) {
    try {
      await this.prisma.departamento.delete({
        where: { id },
      });
      return { message: 'Departamento deletado com sucesso' };
    } catch (error) {
      throw new HttpException(
        'Não é possível deletar departamento com funcionários vinculados',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}