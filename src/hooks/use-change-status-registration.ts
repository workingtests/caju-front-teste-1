import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeStatusRegistration } from "~/services/registration-api-service";
import { Registration } from "~/types/registration";
import { Status } from "~/types/status";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["use-registrations"] });
    },
  });

  return {
    changeStatusRegistration: mutate,
    isPending,
  };
};
