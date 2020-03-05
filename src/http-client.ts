import { ServiceResponses } from "./components/ServiceResponse";

export class HttpClient {
  async post<T extends ServiceResponses>(
    hostname: string,
    port: number,
    payload: any
  ): Promise<T> {
    const url = `http://${hostname}:${port}/post-endpoint`;
    return this.fetch<T>(url, payload)
  }

  async fetch<T>(
    url: string,
    payload: any
  ): Promise<T> {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    };
    const response = await fetch(url, request);

    const body: T = await response.json();
    return body;
  }
}

