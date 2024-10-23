import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteRegistration } from "~/services/registration-api-service";
import { useRegistrationsQueryKey } from "./use-registrations";

type UseDeleteRegistrationOptions = {
  registrationId: string;
};

const useDeleteRegistrationMutationKey = "delete-registration";

export const useDeleteRegistration = ({
  registrationId,
}: UseDeleteRegistrationOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: [useDeleteRegistrationMutationKey],
    mutationFn: () => deleteRegistration({ registrationId }),
    onSuccess: () => {
      toast.success("Registro excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: [useRegistrationsQueryKey] });
    },
  });

  return {
    deleteRegistration: mutate,
    isPending,
  };
};
