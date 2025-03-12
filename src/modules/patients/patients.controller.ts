import { Controller, Post, Body } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { LoginPatientDto } from './dtos/login-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Post('login')
  login(@Body() loginPatientDto: LoginPatientDto) {
    return this.patientsService.login(loginPatientDto);
  }
}
