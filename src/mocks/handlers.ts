import { http, HttpResponse } from "msw";
import { approved, reproved, review } from "./registrations";

export const handlers = [
  http.get("http://localhost:3000/registrations", () => {
    return HttpResponse.json([approved, review, reproved], { status: 200 });
  }),
];
