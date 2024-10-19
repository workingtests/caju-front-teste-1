import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRegistration } from "~/services/registration-api-service";

type UseDeleteRegistrationOptions = {
  registrationId: string;
};

export const useDeleteRegistration = ({
  registrationId,
}: UseDeleteRegistrationOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-registration"],
    mutationFn: () => deleteRegistration({ registrationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["use-registrations"] });
    },
  });

  return {
    deleteRegistration: mutate,
    isPending,
  };
};
