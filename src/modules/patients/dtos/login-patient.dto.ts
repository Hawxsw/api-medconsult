import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const LoginPatientSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type LoginPatientSchemaType = z.infer<typeof LoginPatientSchema>;
export class LoginPatientDto
  extends createZodDto(LoginPatientSchema)
  implements LoginPatientSchemaType {}
