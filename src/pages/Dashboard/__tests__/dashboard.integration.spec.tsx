import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

import { approved, reproved, review } from "~/mocks/registrations";
import { useChangeStatusRegistration } from "~/hooks/use-change-status-registration";
import { useDeleteRegistration } from "~/hooks/use-delete-registration";
import { wrapper } from "~/tests/wrapper";
import { DashboardPage } from "..";

jest.mock("~/hooks/use-change-status-registration");
jest.mock("~/hooks/use-delete-registration");

const changeStatusRegistration = jest.fn();
const useChangeStatusRegistrationMock: ReturnType<
  typeof useChangeStatusRegistration
> = {
  changeStatusRegistration,
  isPending: false,
};

const deleteRegistration = jest.fn();
const useDeleteRegistrationMock: ReturnType<typeof useDeleteRegistration> = {
  deleteRegistration,
  isPending: false,
};

describe("Dashboard Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useChangeStatusRegistration as jest.Mock).mockReturnValue(
      useChangeStatusRegistrationMock
    );

    (useDeleteRegistration as jest.Mock).mockReturnValue(
      useDeleteRegistrationMock
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("Rendering registrations", () => {
    it("should render approved registrations correctly", async () => {
      const { container } = render(<DashboardPage />, { wrapper });
      expect(await axe(container)).toHaveNoViolations();

      expect(
        await screen.findByTestId("registrations-columns")
      ).toBeInTheDocument();

      expect(
        await screen.findByRole("heading", { name: /aprovado/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByText(approved.employeeName)
      ).toBeInTheDocument();
      expect(await screen.findByText(approved.email)).toBeInTheDocument();
      expect(
        await screen.findByText(approved.admissionDate)
      ).toBeInTheDocument();
    });

    it("should render rejected registrations correctly", async () => {
      const { container } = render(<DashboardPage />, { wrapper });
      expect(await axe(container)).toHaveNoViolations();

      expect(
        await screen.findByTestId("registrations-columns")
      ).toBeInTheDocument();

      expect(
        await screen.findByRole("heading", { name: /reprovado/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByText(reproved.employeeName)
      ).toBeInTheDocument();
      expect(await screen.findByText(reproved.email)).toBeInTheDocument();
      expect(
        await screen.findByText(reproved.admissionDate)
      ).toBeInTheDocument();
    });

    it("should render registrations under review correctly", async () => {
      const { container } = render(<DashboardPage />, { wrapper });
      expect(await axe(container)).toHaveNoViolations();

      expect(
        await screen.findByTestId("registrations-columns")
      ).toBeInTheDocument();

      expect(
        await screen.findByRole("heading", { name: /reprovado/i })
      ).toBeInTheDocument();
      expect(await screen.findByText(review.employeeName)).toBeInTheDocument();
      expect(await screen.findByText(review.email)).toBeInTheDocument();
      expect(await screen.findByText(review.admissionDate)).toBeInTheDocument();
    });
  });

  describe("Interacting with registrations", () => {
    it("should handle approval action correctly", async () => {
      const { container } = render(<DashboardPage />, { wrapper });
      expect(await axe(container)).toHaveNoViolations();

      const reproveButton = await screen.findByRole("button", {
        name: /Reprovar/i,
      });
      await userEvent.click(reproveButton);

      expect(await screen.findByRole("dialog")).toBeInTheDocument();
      expect(
        await screen.findByRole("heading", { name: /confirmar operação/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/Deseja realmente confirmar essa operação?/i)
      ).toBeInTheDocument();

      const yesButton = await screen.findByRole("button", { name: /sim/i });
      await userEvent.click(yesButton);

      await waitFor(() => {
        expect(changeStatusRegistration).toHaveBeenCalledWith({
          status: "REPROVED",
        });
      });
    });
    it("should handle rejection action correctly", async () => {
      const { container } = render(<DashboardPage />, { wrapper });
      expect(await axe(container)).toHaveNoViolations();

      const approveButton = await screen.findByRole("button", {
        name: /aprovar/i,
      });
      await userEvent.click(approveButton);

      expect(await screen.findByRole("dialog")).toBeInTheDocument();
      expect(
        await screen.findByRole("heading", { name: /confirmar operação/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/Deseja realmente confirmar essa operação?/i)
      ).toBeInTheDocument();

      const yesButton = await screen.findByRole("button", { name: /sim/i });
      await userEvent.click(yesButton);

      await waitFor(() => {
        expect(changeStatusRegistration).toHaveBeenCalledWith({
          status: "APPROVED",
        });
      });
    });

    it("should handle review action correctly", async () => {
      const { container } = render(<DashboardPage />, { wrapper });
      expect(await axe(container)).toHaveNoViolations();

      const reviewButton = await screen.findAllByRole("button", {
        name: /revisar novamente/i,
      });
      await userEvent.click(reviewButton[0]);

      expect(await screen.findByRole("dialog")).toBeInTheDocument();
      expect(
        await screen.findByRole("heading", { name: /confirmar operação/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/Deseja realmente confirmar essa operação?/i)
      ).toBeInTheDocument();

      const yesButton = await screen.findByRole("button", { name: /sim/i });
      await userEvent.click(yesButton);

      await waitFor(() => {
        expect(changeStatusRegistration).toHaveBeenCalledWith({
          status: "REVIEW",
        });
      });
    });

    it("should close dialog when cancellation is confirmed", async () => {
      const { container } = render(<DashboardPage />, { wrapper });
      expect(await axe(container)).toHaveNoViolations();

      const deleteButton = await screen.findAllByRole("button", {
        name: /delete-registration/i,
      });

      await userEvent.click(deleteButton[0]);

      expect(await screen.findByRole("dialog")).toBeInTheDocument();
      expect(
        await screen.findByRole("heading", { name: /confirmar operação/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/Deseja realmente confirmar essa operação?/i)
      ).toBeInTheDocument();

      const yesButton = await screen.findByRole("button", { name: /sim/i });
      await userEvent.click(yesButton);

      await waitFor(() => {
        expect(deleteRegistration).toHaveBeenCalled();
      });
    });

    it("should close dialog when cancellation is confirmed", async () => {
      const { container } = render(<DashboardPage />, { wrapper });
      expect(await axe(container)).toHaveNoViolations();

      const approveButton = await screen.findByRole("button", {
        name: /aprovar/i,
      });
      await userEvent.click(approveButton);

      expect(await screen.findByRole("dialog")).toBeInTheDocument();
      expect(
        await screen.findByRole("heading", { name: /confirmar operação/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/Deseja realmente confirmar essa operação?/i)
      ).toBeInTheDocument();

      const noButton = await screen.findByRole("button", { name: /não/i });
      await userEvent.click(noButton);

      await waitFor(async () => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  });
});
