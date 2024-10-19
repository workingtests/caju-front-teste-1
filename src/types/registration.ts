export type Registration = {
  id: string;
  email: string;
  employeeName: string;
  cpf: string;
  status: "APROVED" | "REVIEW" | "REPROVED";
  admissionDate: string;
};
