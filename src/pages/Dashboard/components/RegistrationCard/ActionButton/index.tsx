import { ReactNode, useState } from "react";
import { ButtonSmall } from "~/components/Buttons";
import { Dialog, DialogContent, DialogOverlay } from "~/components/Dialog";
import { useChangeStatusRegistration } from "~/hooks/use-change-status-registration";
import { Registration } from "~/types/registration";
import { ActionsContent } from "./styles";
import { Status } from "~/types/status";

type ActionButtonProps = {
  registration: Registration;
  children: ReactNode;
  color?: string;
  status: Status;
};

export const ActionButton = ({
  registration,
  children,
  color,
  status,
}: ActionButtonProps) => {
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const { changeStatusRegistration } = useChangeStatusRegistration({
    registration,
  });

  const handleConfirmOperation = () => {
    setOpenDialogConfirmation(true);
  };

  const handleCloseConfirmationDialog = () => setOpenDialogConfirmation(false);

  return (
    <>
      <ButtonSmall bgcolor={color} onClick={handleConfirmOperation}>
        {children}
      </ButtonSmall>
      <Dialog.Root
        open={openDialogConfirmation}
        onOpenChange={setOpenDialogConfirmation}
      >
        <Dialog.Portal>
          <DialogOverlay />
          <DialogContent>
            <Dialog.Title>Confirmar alteração</Dialog.Title>
            <Dialog.Description>
              Deseja realmente confirmar essa alteração?
            </Dialog.Description>
            <ActionsContent>
              <ButtonSmall onClick={handleCloseConfirmationDialog}>
                Não
              </ButtonSmall>
              <ButtonSmall
                bgcolor="rgba(232, 5, 55, 1)"
                color="#fff"
                onClick={() => changeStatusRegistration({ status })}
              >
                Sim
              </ButtonSmall>
            </ActionsContent>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
