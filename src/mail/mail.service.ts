import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import VerificationTokenPayload from './verificationTokenPayload.interface';
import { administradoresDto } from 'src/usuarios/dto/administradores.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendVerificationLink(email: string, nombre: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Equipo Easy Peasy" <support@example.com>', // override default from
      subject: 'Bienvenido a Easy Peasy! Confirmación de e-mail',
      template: 'confirmation',
      context: {
        nombre: nombre,
        url,
      },
    });
  }

  public async enviarEmailParaRecuperacion(email: string, nombre: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const url = `${this.configService.get(
      'RECUPERAR_CONFIRMATION_URL',
    )}?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Equipo Easy Peasy" <support@example.com>', // override default from
      subject: 'Recuperación de contraseña',
      template: 'recuperacion',
      context: {
        nombre: nombre,
        url,
      },
    });
  }

  public async notificarAlAdministrador(administradores: administradoresDto[]) {
    administradores.map(async ({ email, nombre }: administradoresDto) => {
      await this.mailerService.sendMail({
        to: email,
        from: '"Equipo Easy Peasy" <support@example.com>', // override default from
        subject: 'Nuevo registro en Easy Peasy!',
        template: 'notificar',
        context: {
          nombre,
        },
      });
    });
  }
}
