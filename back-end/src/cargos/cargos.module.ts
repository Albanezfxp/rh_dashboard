import { Module } from '@nestjs/common';
import { CargoService } from './cargos.service';
import { CargoController } from './cargos.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CargoController],
  providers: [CargoService, PrismaService],
})
export class CargoModule {}