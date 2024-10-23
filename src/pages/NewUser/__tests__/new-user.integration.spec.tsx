import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useAddRegistration } from "~/hooks/use-add-registration";
import { admissionDateInput, user } from "~/mocks/user";
import { wrapper } from "~/tests/wrapper";
import { NewUserPage } from "..";
import { axe } from "jest-axe";

jest.mock("~/hooks/use-add-registration");

const addRegistration = jest.fn();

describe("NewUserPage Integration Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    (useAddRegistration as jest.Mock).mockReturnValue({
      addRegistration: addRegistration,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should render the form and submit valid data", async () => {
    const { container } = render(<NewUserPage />, { wrapper });
    expect(await axe(container)).toHaveNoViolations();

    const employeeName = screen.getByLabelText(/nome/i);
    const email = screen.getByLabelText(/email/i);
    const cpf = screen.getByLabelText(/cpf/i);
    const admissionDate = screen.getByLabelText(/data de admissão/i);

    expect(employeeName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(cpf).toBeInTheDocument();
    expect(admissionDate).toBeInTheDocument();

    await userEvent.type(employeeName, user.employeeName);
    await userEvent.type(email, user.email);
    await userEvent.type(cpf, user.cpf);
    await userEvent.type(admissionDate, admissionDateInput);

    await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
      expect(addRegistration).toHaveBeenCalledWith(user);
    });
  });

  it("should not submit the form with invalid data", async () => {
    const { container } = render(<NewUserPage />, { wrapper });
    expect(await axe(container)).toHaveNoViolations();

    await userEvent.click(screen.getByLabelText(/nome/i));
    await userEvent.type(screen.getByLabelText(/email/i), user.email);
    await userEvent.type(screen.getByLabelText(/cpf/i), user.cpf);
    await userEvent.type(
      screen.getByLabelText(/data de admissão/i),
      admissionDateInput
    );

    await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
      expect(addRegistration).not.toHaveBeenCalled();
    });

    expect(
      screen.getByText(/nome deve ter no mínimo 2 caracteres/i)
    ).toBeInTheDocument();
  });
});
