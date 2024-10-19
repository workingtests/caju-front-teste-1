import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { getRegistrations } from "~/services/registration-api-service";
import { removeNonNumericCharacters } from "~/utils/strings/remove-non-numeric-characters";

export const useRegistrations = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const cpf = removeNonNumericCharacters(searchParams.get("cpf") ?? "");

  const { data, isLoading } = useQuery({
    queryKey: ["use-registrations", cpf],
    queryFn: () => getRegistrations({ cpf }),
  });

  return {
    registrations: data,
    isLoading,
  };
};
