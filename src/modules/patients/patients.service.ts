import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { LoginPatientDto } from './dtos/login-patient.dto';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PatientsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const patientExists = await this.prisma.patient.findFirst({
      where: {
        OR: [{ email: createPatientDto.email }, { cpf: createPatientDto.cpf }],
      },
    });

    if (patientExists) {
      throw new ConflictException('Email ou CPF já cadastrado');
    }

    const hashedPassword = await hash(createPatientDto.password, 8);

    const {
      firstName,
      lastName,
      cpf,
      phone,
      email,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
    } = createPatientDto;

    const patient = await this.prisma.patient.create({
      data: {
        firstName,
        lastName,
        cpf,
        phone,
        email,
        password: hashedPassword,
        cep,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
      },
    });

    return {
      patient: {
        ...patient,
        password: undefined,
      },
    };
  }

  async login(loginPatientDto: LoginPatientDto) {
    const patient = await this.prisma.patient.findUnique({
      where: {
        email: loginPatientDto.email,
      },
    });

    if (!patient) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    const passwordMatch = await compare(
      loginPatientDto.password,
      patient.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    const token = this.jwtService.sign(
      {
        sub: patient.id,
        email: patient.email,
        role: 'patient',
      },
      {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET,
      },
    );

    return {
      patient: {
        ...patient,
        password: undefined,
      },
      token,
    };
  }
}
