import { ServiceResponses as ServiceResponse } from "./components/ServiceResponse";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
export class HttpClient {
  async post<T extends ServiceResponse>(
    hostname: string,
    port: number,
    payload: any
  ): Promise<T> {
    const url = `http://${hostname}:${port}/post-endpoint`;
    return this.fetchWithAxios<T>(url, payload)
  }

  async fetch<T>(
    url: string,
    payload: any
  ): Promise<any> {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    };
    const handleErrors = (res: any) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res;
    }
    return new Promise((resolve, reject) => {
      fetch(url, request)
        .then(handleErrors)
        .then(async response => {
          const body: any = await response.json();
          resolve(new Success(body));
        })
        .catch((e) => resolve(new Error(e.message)));
    })
  }

  async fetchWithAxios<T extends ServiceResponse>(url: string, payload: any): Promise<T> {
    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "application/json" },
    }
    const res = await axios.post(url, payload, options)
    return res.data
    // .then((response) => {
    //   // `response` is of type `AxiosResponse<ServiceResponses>`
    //   const { data } = response
    //   // `data` is of type ServiceResponses, correctly inferred
    // })
  }
}
class Success {
  constructor(readonly result: any) { }
}
class Error {
  constructor(readonly reason: string) { }
}