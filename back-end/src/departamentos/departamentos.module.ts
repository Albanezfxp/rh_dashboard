import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { DepartamentoController } from './departamentos.controller';
import { DepartamentoService } from './departamentos.service';

@Module({
  controllers: [DepartamentoController],
  providers: [DepartamentoService, PrismaService],
})
export class DepartamentoModule {}