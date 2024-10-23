import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "~/components/TextField";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/IconButton";
import { useAddRegistration } from "~/hooks/use-add-registration";
import { routes } from "~/router/routes";

import * as S from "./styles";
import { userResolver } from "./resolver";

type UserFormValues = z.infer<typeof userResolver>;

const NewUserPage = () => {
  const history = useHistory();
  const { addRegistration } = useAddRegistration();

  const form = useForm<UserFormValues>({
    mode: "all",
    resolver: zodResolver(userResolver),
  });

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const disableSubmitButton =
    !form.formState.isDirty ||
    !form.formState.isValid ||
    form.formState.isSubmitting;

  return (
    <S.Form onSubmit={form.handleSubmit(addRegistration)}>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          {...form.register("employeeName")}
          placeholder="Nome"
          label="Nome"
          error={form.formState.errors.employeeName?.message}
        />
        <TextField
          {...form.register("email")}
          placeholder="Email"
          label="Email"
          type="email"
          error={form.formState.errors.email?.message}
        />
        <TextField
          {...form.register("cpf")}
          placeholder="CPF"
          label="CPF"
          error={form.formState.errors.cpf?.message}
        />
        <TextField
          {...form.register("admissionDate")}
          label="Data de admissão"
          type="date"
          error={form.formState.errors.admissionDate?.message}
        />
        <Button type="submit" disabled={disableSubmitButton}>
          Cadastrar
        </Button>
      </S.Card>
    </S.Form>
  );
};

export default NewUserPage;
