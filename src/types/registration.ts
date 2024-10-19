import { Status } from "./status";

export type Registration = {
  id: string;
  email: string;
  employeeName: string;
  cpf: string;
  status: Status;
  admissionDate: string;
};
