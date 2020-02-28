import { HttpClient } from "./http-client";
import { TypedLocation } from "./types/Location";

export class LocationApi {
  private hostname: string;
  private port: number;
  private httpClient = new HttpClient()

  constructor($hostname: string, $port: number) {
    this.hostname = $hostname;
    this.port = $port;
  }

  async list() {
    let payload = { _type: "ListEntries" };
    return await this.httpClient.msocketPost<Array<TypedLocation>>(this.hostname, this.port, payload);
  }

}
