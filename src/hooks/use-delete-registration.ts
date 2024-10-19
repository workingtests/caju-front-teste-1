import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
      toast.success("Registro excluído com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["use-registrations"] });
    },
  });

  return {
    deleteRegistration: mutate,
    isPending,
  };
};
