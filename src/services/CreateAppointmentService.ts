import { startOfHour } from 'date-fns';
import prisma from '../database/prisma';
import AppError from '../errors/AppError';

interface Request {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, providerId }: Request) {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await prisma.appointment.findFirst({
      where: {
        date: appointmentDate,
      },
    });

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await prisma.appointment.create({
      data: {
        provider_id: providerId,
        date: appointmentDate,
      },
    });

    return appointment;
  }
}

export default CreateAppointmentService;
