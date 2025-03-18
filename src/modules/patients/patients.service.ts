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
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { PaginationService } from '../pagination/pagination.service';
import { DefaultPaginationDto } from '../dto/default-pagination.dto';

@Injectable()
export class PatientsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private paginationService: PaginationService,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    console.log('Tentando criar novo paciente:', { email: createPatientDto.email, cpf: createPatientDto.cpf });
    
    const patientExists = await this.prisma.patient.findFirst({
      where: {
        OR: [{ email: createPatientDto.email }, { cpf: createPatientDto.cpf }],
      },
    });

    if (patientExists) {
      console.log('Paciente já existe:', { email: createPatientDto.email, cpf: createPatientDto.cpf });
      throw new ConflictException('Email ou CPF já cadastrado');
    }

    const hashedPassword = await hash(createPatientDto.password, 8);
    console.log('Senha hasheada com sucesso');

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

    console.log('Paciente criado com sucesso:', {
      id: patient.id,
      email: patient.email,
    });
    return {
      patient: {
        ...patient,
        password: undefined,
      },
    };
  }

  async login(loginPatientDto: LoginPatientDto) {
    console.log('Tentando login:', { email: loginPatientDto.email });
    
    const patient = await this.prisma.patient.findUnique({
      where: {
        email: loginPatientDto.email,
      },
    });

    if (!patient) {
      console.log('Paciente não encontrado:', { email: loginPatientDto.email });
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    const passwordMatch = await compare(
      loginPatientDto.password,
      patient.password,
    );

    if (!passwordMatch) {
      console.log('Senha incorreta para o paciente:', {
        email: loginPatientDto.email,
      });
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

    console.log('Login realizado com sucesso:', {
      id: patient.id,
      email: patient.email,
      token: token.substring(0, 20) + '...',
    });

    return {
      patient: {
        ...patient,
        password: undefined,
      },
      token,
    };
  }

  async findAll(queries: DefaultPaginationDto) {
    const { take, skip } = this.paginationService.getPageParams(queries);

    const [patients, total] = await Promise.all([
      this.prisma.patient.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          cpf: true,
          phone: true,
          email: true,
          cep: true,
          street: true,
          number: true,
          complement: true,
          neighborhood: true,
          city: true,
          state: true,
        },
        take,
        skip,
        orderBy: {
          created_at: 'desc',
        },
      }),
      this.prisma.patient.count(),
    ]);

    return {
      data: patients,
      meta: {
        total,
        page: Number(queries.page),
        pageSize: Number(queries.pageSize),
        totalPages: Math.ceil(total / take),
      },
    };
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        cpf: true,
        phone: true,
        email: true,
        cep: true,
        street: true,
        number: true,
        complement: true,
        neighborhood: true,
        city: true,
        state: true,
      },
    });

    if (!patient) {
      throw new UnauthorizedException('Paciente não encontrado');
    }

    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new UnauthorizedException('Paciente não encontrado');
    }

    const updatedPatient = await this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        cpf: true,
        phone: true,
        email: true,
        cep: true,
        street: true,
        number: true,
        complement: true,
        neighborhood: true,
        city: true,
        state: true,
      },
    });

    return updatedPatient;
  }

  async remove(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new UnauthorizedException('Paciente não encontrado');
    }

    await this.prisma.patient.delete({
      where: { id },
    });

    return { message: 'Paciente removido com sucesso' };
  }
}
