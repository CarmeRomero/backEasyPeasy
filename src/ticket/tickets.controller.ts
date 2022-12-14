import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ActualizarTicketDto } from './dto/actualizar-ticket.dto';
import { CrearTicketDto } from './dto/crear-ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  AgregarMesa(@Body() ticketDto: CrearTicketDto) {
    console.log(ticketDto);
    return this.ticketsService.crearTicket(ticketDto);
  }

  @Get('/listado-tickets')
  traerTodosLosTickets() {
    return this.ticketsService.traerTodos();
  }
  @Get('/tickets-pagados')
  traerTodosLosTicketsPagados() {
    return this.ticketsService.traerTodosTicketsPagados();
  }

  @Get(':id')
  TraerUnPedido(@Param('id') id: number) {
    return this.ticketsService.traerUno(+id);
  }

  //ACTUALIZAR
  @Put('/actualizar/:id')
  update(
    @Param('id') id: number,
    @Body() actualizarTicket: ActualizarTicketDto,
  ) {
    return this.ticketsService.actualizarTicket(+id, actualizarTicket);
  }

  // REPORTE
  //REPORTE TICKETS DESDE HASTA
  @Get('/listado-tickets/desdeHasta?')
  traerTodosLosTicketsDesdeHasta(
    @Query('desde') desde: Date,
    @Query('hasta') hasta: Date,
  ) {
    return this.ticketsService.traerTicketDesdeHasta(desde, hasta);
  }

  @Get('/concurrencia/fecha?')
  asd(@Query('desde') desde: Date, @Query('hasta') hasta: Date) {
    return this.ticketsService.asd(desde, hasta);
  }
}
