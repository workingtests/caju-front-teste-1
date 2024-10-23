import { z } from "zod";
import { validateCpf } from "~/utils/strings/cpf";

export const userResolver = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  employeeName: z
    .string()
    .min(2, { message: "Nome deve ter no mínimo 2 caracteres" })
    .regex(/^[^0-9]/, { message: "Primeira letra não pode ser um número" })
    .regex(/\s+/, {
      message: "Nome completo deve conter pelo menos um espaço",
    }),
  cpf: z
    .string()
    .refine((cpf) => validateCpf(cpf), { message: "CPF inválido" }),
  admissionDate: z.coerce
    .date({ message: "Data inválida" })
    .transform((date) => {
      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const year = date.getUTCFullYear();

      return `${day}/${month}/${year}`;
    }),
});
