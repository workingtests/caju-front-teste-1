import { Registration } from "~/types/registration";
import { createURLWithParams } from "~/utils/query-string/create-url-with-params";

type GetRegistrationsResponse = Registration[];

type GetRegistrationsRequest = {
  cpf: string;
};

export async function getRegistrations({
  cpf,
}: GetRegistrationsRequest): Promise<GetRegistrationsResponse> {
  const url = createURLWithParams("http://localhost:3000/registrations", {
    cpf,
  });

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const { error } = (await res.json()) as { error: string };
    throw new Error(error);
  }

  return res.json();
}
