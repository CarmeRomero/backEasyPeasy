import { Module } from '@nestjs/common';
import { FormasPagoService } from './formas_pago.service';
import { FormasPagoController } from './formas_pago.controller';

@Module({
  controllers: [FormasPagoController],
  providers: [FormasPagoService]
})
export class FormasPagoModule {}
