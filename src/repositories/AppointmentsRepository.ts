import prisma from '../database/prisma';

class AppointmentsRepository {
  public async findByDate(date: Date) {
    const appointment = await prisma.appointment.findFirst({
      where: { date },
    });

    return appointment;
  }
}

export default new AppointmentsRepository();
