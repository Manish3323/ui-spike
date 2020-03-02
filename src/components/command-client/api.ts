import { HttpClient } from "../../http-client";
import { ControlCommand } from "./types/Command";
import { Completed } from "./types/response";

export class CommandApi {
    private hostname: string;
    private port: number;
    private httpClient = new HttpClient()

    constructor($hostname: string, $port: number) {
        this.hostname = $hostname;
        this.port = $port;
    }

    async submit() {
        let payload = {
            "_type": "ComponentCommand",
            "componentId": {
                "prefix": "NFIRAOS.SampleAssembly",
                "componentType": "assembly"
            },
            "command": {
                "_type": "Submit",
                "controlCommand": {
                    "_type": "Setup",
                    "source": "TCS.filter.wheel",
                    "commandName": "move",
                    "maybeObsId": ["obs001"],
                    "paramSet": new Array()
                }
            }
        }

        return await this.httpClient.post<Completed>(this.hostname, this.port, payload);
    }
}
