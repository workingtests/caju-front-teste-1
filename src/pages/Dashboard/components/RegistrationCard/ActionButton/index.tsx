import { ReactNode, useState } from "react";

import { ButtonSmall } from "~/components/Buttons";
import { Dialog, DialogContent, DialogOverlay } from "~/components/Dialog";
import { useChangeStatusRegistration } from "~/hooks/use-change-status-registration";
import { Registration } from "~/types/registration";
import { Status } from "~/types/status";
import * as S from "./styles";

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
            <Dialog.Title>Confirmar operação</Dialog.Title>
            <Dialog.Description>
              Deseja realmente confirmar essa operação?
            </Dialog.Description>
            <S.ActionsContent>
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
            </S.ActionsContent>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
