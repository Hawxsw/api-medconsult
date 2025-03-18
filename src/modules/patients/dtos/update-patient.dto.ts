import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UpdatePatientSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .optional(),
  lastName: z
    .string()
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
    .optional(),
  cpf: z
    .string()
    .regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos')
    .optional(),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, 'Telefone deve conter 10 ou 11 dígitos')
    .optional(),
  email: z.string().email('Email inválido').optional(),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .optional(),
  cep: z
    .string()
    .regex(/^\d{8}$/, 'CEP deve conter 8 dígitos numéricos')
    .optional(),
  street: z.string().min(3, 'Rua deve ter pelo menos 3 caracteres').optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z
    .string()
    .min(2, 'Bairro deve ter pelo menos 2 caracteres')
    .optional(),
  city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres').optional(),
  state: z.string().length(2, 'Estado deve ter 2 caracteres').optional(),
});

type UpdatePatientSchemaType = z.infer<typeof UpdatePatientSchema>;
export class UpdatePatientDto
  extends createZodDto(UpdatePatientSchema)
  implements UpdatePatientSchemaType {}
