import { Registration } from "~/types/registration";
import { Status } from "~/types/status";

import { RegistrationCard } from "../RegistrationCard";
import * as S from "./styles";

const allColumns: { status: Status; title: string }[] = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type CollumnsProps = {
  registrations?: Registration[];
};

export const Collumns = ({ registrations }: CollumnsProps) => {
  return (
    <S.Container>
      {allColumns.map((column) => {
        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations
                  ?.filter(
                    (registration) => registration.status === column.status
                  )
                  .map((registration) => {
                    return (
                      <RegistrationCard
                        registration={registration}
                        key={registration.id}
                      />
                    );
                  })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
