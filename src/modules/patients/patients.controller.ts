import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { LoginPatientDto } from './dtos/login-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { DefaultPaginationDto } from '../dto/default-pagination.dto';

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

  @Get()
  findAll(@Query() queries: DefaultPaginationDto) {
    return this.patientsService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
