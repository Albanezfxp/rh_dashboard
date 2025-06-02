import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFuncionarioDto } from 'src/dtos/Create-funcionario.dto';
import { FilterFuncionarioDto } from 'src/dtos/Filter-funcionario.dto';
import { UpdateFuncionarioDto } from 'src/dtos/Update-funcionario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FuncionarioService {

    constructor(private readonly prisma: PrismaService) {}
    

    async getAll() {
        return await this.prisma.funcionario.findMany({
            include: {
                  cargo: {select: {
                    nome: true,
                }},
                departamento: {select: {
                    nome: true
                }},
            }
        })
    }
 async getById(id: number) {
    const user = await this.prisma.funcionario.findUnique({
        where: { id: Number(id) },
        include: {
            cargo: { select: { nome: true } },
            departamento: { select: { nome: true } },
            ferias: true
        }
    });

    if (!user) {
        throw new HttpException("Funcionario não encontrado", HttpStatus.NOT_FOUND);
    }

    return user;
}

async getTempoDeCasa() {
    return await this.prisma.tempo_de_casa.findMany()
}

async getAniversarianteDoMes() {
    try {
        // Obter mês atual formatado com dois dígitos (01-12)
        const mesAtual = (new Date().getMonth() + 1).toString().padStart(2, '0');
        
        // Verificar se a view existe
        const viewExists = await this.prisma.$queryRaw<{ exists: boolean }[]>`
            SELECT EXISTS (
                SELECT FROM information_schema.views 
                WHERE table_name = 'aniversariantes_mes_atual'
            ) as exists
        `;
        
        if (!viewExists[0].exists) {
            throw new Error('View não encontrada no banco de dados');
        }

        // Consultar a view
        const aniversariantes = await this.prisma.aniversariantes_mes_atual.findMany({
            where: {
                mes_aniversario: mesAtual
            },
            orderBy: {
                dia_aniversario: 'asc'
            }
        });

        return aniversariantes;
        
    } catch (error) {
        console.error('Erro detalhado:', error);
        throw new HttpException(
            'Falha ao buscar aniversariantes: ' + error.message,
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
    async getWithFilter(filter: FilterFuncionarioDto) {
        const where: any = {};

        if (filter.departamentoId ) {
            where.departamentoId = filter.departamentoId
        }
        if (filter.cargoId) {
            where.cargoId = filter.cargoId
        }
        if (filter.status) {
            where.status = filter.status
        }
        if (filter.nome) {
            where.nome = {
                contains: filter.nome,
                mode: 'insensitive'
            }
        }
        if (filter.dataAdmissaoInicio || filter.dataAdmissaoFim) {
            where.dataAdmissao = {};
        }
        if (filter.dataAdmissaoFim) {
            where.dataAdmissao.lte = new Date(filter.dataAdmissaoFim)
        }

        return this.prisma.funcionario.findMany({
            where,
            include: {
                  cargo: {select: {
                    nome: true,
                }},
                departamento: {select: {
                    nome: true
                }},
            },
            orderBy: {
                nome: 'asc'
            }
        })
        
    }

    async create(data: CreateFuncionarioDto) {
        if (data.idade < 18 ) {
            throw new HttpException("Usuario menor de idade", HttpStatus.BAD_REQUEST)
        } else if(data.idade > 65) {
            throw new HttpException("Usuario com a idade excedida", HttpStatus.BAD_REQUEST)
        }
        const newFuncionario = await this.prisma.funcionario.create({
            data: {
                nome: data.nome,
                email: data.email,
                data_de_nascimento: data.data_de_nascimento,
                idade: data.idade,
                cpf: data.cpf,
                salario: data.salario,
                dataAdmissao: data.dataAdmissao,
                departamentoId: data.departamentoId,
                cargoId: data.cargoId
            }, select: {
                nome: true,
                idade: true,
                salario: true,
                cpf: true
            }
        })

        if (!newFuncionario) {
                        throw new HttpException("Erro em criar usuario", HttpStatus.BAD_REQUEST)
        }

        return newFuncionario
    }

    async update(id: number, data: UpdateFuncionarioDto) {
        const user = await this.prisma.funcionario.findFirst({
            where: {id: id}
        })
        if (!user) {
            throw new HttpException("Funcionario não encontrado", HttpStatus.NOT_FOUND)
        }
        const userUpdate = await this.prisma.funcionario.update({
            where:{ id: id},
             data: {
                nome: data.nome,
                email: data.email,
                data_de_nascimento: data.data_de_nascimento,
                idade: data.idade,
                cpf: data.cpf,
                salario: data.salario,
                dataAdmissao: data.dataAdmissao,
                departamentoId: data.departamentoId,
                cargoId: data.cargoId
            }
        })

        return userUpdate
    }
    async desligamento(id: number) {
    const idNumber = Number(id);

    const user = await this.prisma.funcionario.findFirst({
        where: { id: idNumber } 
    });

    if (!user) {
        throw new HttpException("Funcionário não encontrado", HttpStatus.NOT_FOUND);
    }

    const userUpdate = await this.prisma.funcionario.update({
        where: { id: idNumber },
        data: {
            status: "INATIVO"
        }
    });

    return userUpdate;
}
    async delete(id: number) {
        await this.prisma.funcionario.delete({
            where: {id: id}
        })
        return "Funcionario deletado!"
    }
}
