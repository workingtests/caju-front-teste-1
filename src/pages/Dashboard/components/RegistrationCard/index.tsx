import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { ButtonSmall } from "~/components/Buttons";
import { Registration } from "~/types/registration";

import * as S from "./styles";
import { useChangeStatusRegistration } from "~/hooks/use-change-status-registration";
import { useDeleteRegistration } from "~/hooks/use-delete-registration";

type RegistrationCardProps = {
  registration: Registration;
};

export const RegistrationCard = ({ registration }: RegistrationCardProps) => {
  const { changeStatusRegistration } = useChangeStatusRegistration({
    registration,
  });

  const { deleteRegistration } = useDeleteRegistration({
    registrationId: registration.id,
  });

  const isReview = registration.status === "REVIEW";

  return (
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
              <ButtonSmall
                bgcolor="rgb(255, 145, 154)"
                onClick={() => changeStatusRegistration({ status: "REPROVED" })}
              >
                Reprovar
              </ButtonSmall>
              <ButtonSmall
                bgcolor="rgb(155, 229, 155)"
                onClick={() => changeStatusRegistration({ status: "APPROVED" })}
              >
                Aprovar
              </ButtonSmall>
            </>
          ) : (
            <ButtonSmall
              bgcolor="#ff8858"
              onClick={() => changeStatusRegistration({ status: "REVIEW" })}
            >
              Revisar novamente
            </ButtonSmall>
          )}
        </S.ActionsButton>
        <HiOutlineTrash onClick={() => deleteRegistration()} />
      </S.Actions>
    </S.Card>
  );
};
