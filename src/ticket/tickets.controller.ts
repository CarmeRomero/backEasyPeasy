import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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
}
