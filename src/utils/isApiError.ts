export function isApiError(response: unknown): boolean | string {
  return (response as HttpErrorBody)?.reason ?? false;
}

type HttpErrorBody = {
  reason?: string;
}
