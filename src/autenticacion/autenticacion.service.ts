import { Injectable, BadRequestException } from '@nestjs/common';
// import { UsuariosService } from '../../src/usuarios/usuarios.service';
import { CredencialesDto } from './dto/credencial-usuario';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Rol } from '@prisma/client';
import TokenPayload from './tokenPayload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AutenticacionService {
  constructor(
    private usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  public async obtenerUsuarioAutenticado({
    email,
    //renombramos el atributo del dto como passwordTextoPLano
    password: passwordTextoPlano,
  }: CredencialesDto) {
    try {
      const usuario = await this.usuarioService.traerPorEmail(email);
      await this.verificarPassword(passwordTextoPlano, usuario.password);
      usuario.password = undefined;
      return usuario;
    } catch (error) {
      throw new BadRequestException('Por favor, verificá tus credenciales');
    }
  }

  async verificarPassword(passwordTextoPlano: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      passwordTextoPlano,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Por favor, verificá tus credenciales');
    }
  }

  public getCookieWithJwtAccessToken(id: number, rol: Rol) {
    const payload: TokenPayload = { id, rol };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('El token de confirmación ha expirado');
      }
      throw new BadRequestException('Token de confirmación inválido');
    }
  }

  public async confirmEmail(email: string) {
    const usuario = await this.usuarioService.traerPorEmail(email);
    if (usuario.verificacionEmail) {
      throw new BadRequestException('Este e-mail ya fue confirmado');
    }
    await this.usuarioService.marcarEmailComoConfirmado(email);
    const administradores = await this.usuarioService.buscarAdministradores();
    await this.mailService.notificarAlAdministrador(administradores);
  }

  public getCookiesForLogOut() {
    return ['Authentication=; HttpOnly; Path=/; Max-Age=0'];
  }
}
