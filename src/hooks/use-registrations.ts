import { useQuery } from "@tanstack/react-query";
import { getRegistrations } from "~/services/registration-api-service";

export const useRegistrations = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["use-registrations"],
    queryFn: () => getRegistrations({ cpf: "" }),
  });

  return {
    registrations: data,
    isLoading,
  };
};
