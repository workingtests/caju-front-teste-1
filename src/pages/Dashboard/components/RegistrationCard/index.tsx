import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";

import { Registration } from "~/types/registration";

import * as S from "./styles";
import { ActionButton } from "./ActionButton";
import { DeleteButton } from "./DeleteButton";

type RegistrationCardProps = {
  registration: Registration;
};

export const RegistrationCard = ({ registration }: RegistrationCardProps) => {
  const isReview = registration.status === "REVIEW";

  return (
    <>
      <S.Card aria-labelledby={`registration-${registration.id}`}>
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
                  aria-label="Reprovar registro"
                >
                  Reprovar
                </ActionButton>
                <ActionButton
                  status="APPROVED"
                  color="rgb(155, 229, 155)"
                  registration={registration}
                  aria-label="Aprovar registro"
                >
                  Aprovar
                </ActionButton>
              </>
            ) : (
              <ActionButton
                status="REVIEW"
                color="#ff8858"
                registration={registration}
                aria-label="Revisar registro novamente"
              >
                Revisar novamente
              </ActionButton>
            )}
          </S.ActionsButton>
          <DeleteButton registrationId={registration.id} />
        </S.Actions>
      </S.Card>
    </>
  );
};
