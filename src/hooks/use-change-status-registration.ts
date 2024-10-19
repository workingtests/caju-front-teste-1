import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { changeStatusRegistration } from "~/services/registration-api-service";
import { Registration } from "~/types/registration";
import { Status } from "~/types/status";

const messages: Record<Status, string> = {
  APPROVED: "O registro foi aprovado com sucesso!",
  REPROVED: "O registro foi reprovado. Por favor, revise as informações.",
  REVIEW: "O registro foi enviado para revisão. Aguarde a análise.",
};

type UseChangeStatusRegistrationOptions = {
  registration: Registration;
};

export const useChangeStatusRegistration = ({
  registration,
}: UseChangeStatusRegistrationOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["use-change-status-registration", registration.id],
    mutationFn: ({ status }: { status: Status }) =>
      changeStatusRegistration({ registration: { ...registration, status } }),
    onSuccess: (_, { status }) => {
      toast.success(messages[status]);
      queryClient.invalidateQueries({ queryKey: ["use-registrations"] });
    },
  });

  return {
    changeStatusRegistration: mutate,
    isPending,
  };
};
