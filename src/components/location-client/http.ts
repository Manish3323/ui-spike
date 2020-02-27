export async function http<T>(
  hostname: string,
  port: number,
  payload: any
): Promise<T> {
  const url = `http://${hostname}:${port}/post-endpoint`;

  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  };

  const response = await fetch(url, request);
  const body = await response.json();
  return body;
}
