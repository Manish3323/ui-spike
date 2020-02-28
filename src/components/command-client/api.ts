import { HttpClient } from "../../http-client";
import { ControlCommand } from "./types/Command";

export class CommandApi {
    private hostname: string;
    private port: number;
    private httpClient = new HttpClient()

    constructor($hostname: string, $port: number) {
        this.hostname = $hostname;
        this.port = $port;
    }

    async submit() {
        let payload: ControlCommand = {
            _type: "Observe",
            source: "TCS.filter.wheel",
            commandName: "move",
            paramSet: new Set()
        };
        return await this.httpClient.post<SubmitResponse>(this.hostname, this.port, payload);
    }
}
