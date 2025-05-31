import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';

@Module({
  controllers: [FuncionarioController],
  providers: [FuncionarioService, PrismaService],
})
export class FuncionarioModule {}