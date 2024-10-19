import { useEffect, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory, useLocation } from "react-router-dom";

import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import { TextField } from "~/components/TextField";
import { routes } from "~/router/routes";
import { toCpfCallback, validateCpf } from "~/utils/strings/cpf";
import { removeNonNumericCharacters } from "~/utils/strings/remove-non-numeric-characters";

import * as S from "./styles";

const getCpfFromSearchParams = (location: ReturnType<typeof useLocation>) => {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get("cpf") ?? undefined;
};

export const SearchBar = () => {
  const history = useHistory();
  const location = useLocation();
  const [cpf, setCpf] = useState(() => getCpfFromSearchParams(location));

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleChangeCpf = (cpf: string) => setCpf(cpf);

  const cpfInvalidMessage = () => {
    if (!cpf) return "";

    return validateCpf(cpf)
      ? ""
      : "O CPF informado não é válido. Por favor, verifique e tente novamente.";
  };

  useEffect(() => {
    const searchParams = new URLSearchParams();

    cpf && validateCpf(cpf)
      ? searchParams.set("cpf", removeNonNumericCharacters(cpf))
      : searchParams.delete("cpf");

    history.replace(`${history.location.pathname}?${searchParams.toString()}`);
  }, [cpf, history]);

  return (
    <S.Container>
      <TextField
        value={cpf}
        onChange={toCpfCallback(handleChangeCpf)}
        placeholder="Digite um CPF válido"
        error={cpfInvalidMessage()}
      />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
