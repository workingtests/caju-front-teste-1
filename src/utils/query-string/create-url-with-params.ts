const isValidValue = (value: string) => !['', 'null', 'undefined'].includes(value);

export function createURLWithParams(baseUrl: string, params: Record<string, unknown>): string {
  const url = new URL(baseUrl);
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    const stringValue = String(value);

    if (isValidValue(stringValue)) {
      searchParams.append(key, stringValue);
    }
  });

  url.search = searchParams.toString();
  return url.toString();
}
