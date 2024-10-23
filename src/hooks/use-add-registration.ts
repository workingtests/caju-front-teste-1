import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { toast } from "sonner";

import { routes } from "~/router/routes";

import {
  addRegistration,
  AddRegistrationRequest,
} from "~/services/registration-api-service";

export const useAddRegistration = () => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["add-registration"],
    mutationFn: (values: AddRegistrationRequest) => addRegistration(values),
    onSuccess: () => {
      toast.success("O registro foi criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["use-registrations"] });
      history.push(routes.dashboard);
    },
  });

  return {
    addRegistration: mutateAsync,
    isPending,
  };
};
