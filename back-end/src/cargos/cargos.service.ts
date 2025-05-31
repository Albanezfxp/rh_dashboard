import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCargoDto } from '../dtos/Create-cargo.dto';
import { UpdateCargoDto } from '../dtos/Update-cargo.dto';

@Injectable()
export class CargoService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.cargo.findMany({
      include: {
        funcionarios: true, // Inclui os funcionários relacionados
      },
    });
  }

  async getById(id: number) {
    const cargo = await this.prisma.cargo.findUnique({
      where: { id },
      include: {
        funcionarios: true,
      },
    });

    if (!cargo) {
      throw new HttpException('Cargo não encontrado', HttpStatus.NOT_FOUND);
    }

    return cargo;
  }

  async getMediaSalarial() {
    return await this.prisma.media_salarial_por_cargo.findMany()
  }

  async create(data: CreateCargoDto) {
    try {
      return await this.prisma.cargo.create({
        data: {
          nome: data.nome,
          descricao: data.descricao,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Erro ao criar cargo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, data: UpdateCargoDto) {
    const cargo = await this.prisma.cargo.findUnique({
      where: { id },
    });

    if (!cargo) {
      throw new HttpException('Cargo não encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.cargo.update({
      where: { id },
      data: {
        nome: data.nome,
        descricao: data.descricao,
      },
    });
  }

  async delete(id: number) {
    try {
      await this.prisma.cargo.delete({
        where: { id },
      });
      return { message: 'Cargo deletado com sucesso' };
    } catch (error) {
      // Se o cargo tiver funcionários vinculados, não pode ser deletado
      throw new HttpException(
        'Não é possível deletar cargo com funcionários vinculados',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}