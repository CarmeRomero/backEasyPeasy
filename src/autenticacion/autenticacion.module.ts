import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    UsuariosModule,
    MailerModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({}),
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, UsuariosService, JwtStrategy],
})
export class AutenticacionModule {}
