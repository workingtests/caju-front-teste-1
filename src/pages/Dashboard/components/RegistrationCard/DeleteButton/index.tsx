import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

import { Dialog, DialogContent, DialogOverlay } from "~/components/Dialog";
import { IconButton } from "~/components/IconButton";
import { ButtonSmall } from "~/components/Buttons";
import { useDeleteRegistration } from "~/hooks/use-delete-registration";
import { ActionsContent } from "../ActionButton/styles";

type DeleteButtonProps = {
  registrationId: string;
};

export const DeleteButton = ({ registrationId }: DeleteButtonProps) => {
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const { deleteRegistration } = useDeleteRegistration({
    registrationId,
  });

  const handleConfirmOperation = () => {
    setOpenDialogConfirmation(true);
  };

  const handleCloseConfirmationDialog = () => setOpenDialogConfirmation(false);

  return (
    <>
      <IconButton
        aria-label="delete-registration"
        onClick={handleConfirmOperation}
      >
        <HiOutlineTrash />
      </IconButton>
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
            <ActionsContent>
              <ButtonSmall onClick={handleCloseConfirmationDialog}>
                Não
              </ButtonSmall>
              <ButtonSmall
                bgcolor="rgba(232, 5, 55, 1)"
                color="#fff"
                onClick={deleteRegistration}
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
