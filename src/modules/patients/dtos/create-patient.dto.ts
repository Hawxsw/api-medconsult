import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreatePatientSchema = z.object({
  firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos'),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, 'Telefone deve conter 10 ou 11 dígitos'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  cep: z.string().regex(/^\d{8}$/, 'CEP deve conter 8 dígitos numéricos'),
  street: z.string().min(3, 'Rua deve ter pelo menos 3 caracteres'),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro deve ter pelo menos 2 caracteres'),
  city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres'),
});

type CreatePatientSchemaType = z.infer<typeof CreatePatientSchema>;
export class CreatePatientDto
  extends createZodDto(CreatePatientSchema)
  implements CreatePatientSchemaType {}
