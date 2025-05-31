import { Module } from '@nestjs/common';
import { FeriasController } from './ferias.controller';
import { FeriasService } from './ferias.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FeriasController],
  providers: [FeriasService, PrismaService]
})
export class FeriasModule {}
