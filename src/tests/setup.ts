import { server } from "~/mocks/server";
import "@testing-library/jest-dom";

import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
