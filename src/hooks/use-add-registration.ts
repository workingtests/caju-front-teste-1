import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { toast } from "sonner";

import { routes } from "~/router/routes";

import {
  addRegistration,
  AddRegistrationRequest,
} from "~/services/registration-api-service";
import { useRegistrationsQueryKey } from "./use-registrations";

const useAddRegistrationMutationKey = "add-registration";

export const useAddRegistration = () => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [useAddRegistrationMutationKey],
    mutationFn: (values: AddRegistrationRequest) => addRegistration(values),
    onSuccess: () => {
      toast.success("O registro foi criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: [useRegistrationsQueryKey] });
      history.push(routes.dashboard);
    },
  });

  return {
    addRegistration: mutateAsync,
    isPending,
  };
};
