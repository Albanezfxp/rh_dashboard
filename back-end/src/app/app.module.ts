import { Module } from '@nestjs/common';
import { CargoController } from 'src/cargos/cargos.controller';
import { CargoModule } from 'src/cargos/cargos.module';
import { CargoService } from 'src/cargos/cargos.service';
import { DepartamentoController } from 'src/departamentos/departamentos.controller';
import { DepartamentoModule } from 'src/departamentos/departamentos.module';
import { DepartamentoService } from 'src/departamentos/departamentos.service';
import { FeriasController } from 'src/ferias/ferias.controller';
import { FeriasModule } from 'src/ferias/ferias.module';
import { FeriasService } from 'src/ferias/ferias.service';
import { FuncionarioController } from 'src/funcionario/funcionario.controller';
import { FuncionarioModule } from 'src/funcionario/funcionario.module';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [
    PrismaModule,
    FuncionarioModule,
    DepartamentoModule,
    CargoModule, FeriasModule
  ],
  controllers: [FuncionarioController, DepartamentoController, CargoController, FeriasController],
  providers: [FuncionarioService, DepartamentoService, CargoService, FeriasService],
})
export class AppModule {}