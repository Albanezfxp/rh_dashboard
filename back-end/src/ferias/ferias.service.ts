import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFeriasDto } from 'src/dtos/Create-ferias.dto';
import { UpdateFeriasDto } from 'src/dtos/Update-ferias.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeriasService {
    constructor(private readonly prisma: PrismaService) {}
    
    async getAll() {
        return await this.prisma.ferias.findMany();
    }

    async getById(id: number) {
        const ferias = await this.prisma.ferias.findFirst({
            where: {id: id}
        })

        if (!ferias) {
            throw new HttpException("Ferias Not Found", HttpStatus.NOT_FOUND)
        }
        return ferias;
    }

    async createFerias(data: CreateFeriasDto) {
        const user = await this.prisma.funcionario.findFirst({
            where: {cpf: data.cpf}
        })
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }

        const ferias = await this.prisma.ferias.create({
            data: {
                dataInicio: data.dataInicio,
                dataFim: data.dataFim,
                funcionarioId: user.id
            }
        })

        return ferias
    }

    async update(id: number, data: UpdateFeriasDto) {
        const ferias = await this.prisma.ferias.findFirst({
            where: {id:id}
        })
        
        if (!ferias) {
            throw new HttpException("Ferias Not Found", HttpStatus.NOT_FOUND)
        }

        const feriasUpdate = await this.prisma.ferias.update({
            where: {id:id},
            data: {
                dataInicio: data.dataInicio,
                dataFim: data.dataFim,
                aprovada: data.aprovada
            }
        })

        return feriasUpdate;
    }

    async delete(id: number) {
        await this.prisma.ferias.delete({
            where:{id:id}
        })
        return "Ferias deletada."
    }

}
