import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { Registration } from "~/types/registration";

import * as S from "./styles";
import { useDeleteRegistration } from "~/hooks/use-delete-registration";

import { ActionButton } from "./ActionButton";

type RegistrationCardProps = {
  registration: Registration;
};

export const RegistrationCard = ({ registration }: RegistrationCardProps) => {
  const { deleteRegistration } = useDeleteRegistration({
    registrationId: registration.id,
  });

  const isReview = registration.status === "REVIEW";

  return (
    <>
      <S.Card>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{registration.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{registration.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{registration.admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          <S.ActionsButton>
            {isReview ? (
              <>
                <ActionButton
                  status="REPROVED"
                  color="rgb(255, 145, 154)"
                  registration={registration}
                >
                  Reprovar
                </ActionButton>
                <ActionButton
                  status="APPROVED"
                  color="rgb(155, 229, 155)"
                  registration={registration}
                >
                  Aprovar
                </ActionButton>
              </>
            ) : (
              <ActionButton
                status="REVIEW"
                color="#ff8858"
                registration={registration}
              >
                Revisar novamente
              </ActionButton>
            )}
          </S.ActionsButton>
          <HiOutlineTrash onClick={() => deleteRegistration()} />
        </S.Actions>
      </S.Card>
    </>
  );
};
