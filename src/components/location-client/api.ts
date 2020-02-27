import { http } from "./http";

export class LocationApi {
  private hostname: string;
  private port: number;

  constructor($hostname: string, $port: number) {
    this.hostname = $hostname;
    this.port = $port;
  }

  async list() {
    let payload = {
      _type: "ListEntries"
    };
    return await http<any>(this.hostname, this.port, payload);
  }
}
