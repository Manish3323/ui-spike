import { HttpClient } from "../../http-client";
import { ControlCommand, GatewayCommand, CommandMessage } from "./types/Command";
import { Parameter } from "../../params/Parameter";
import { IntKey, intKey, stringKey, StringKey } from "../../params/Key";
import { CommandResponse } from "./types/response";

export class CommandApi {
    private hostname: string;
    private port: number;
    private httpClient = new HttpClient()

    constructor($hostname: string, $port: number) {
        this.hostname = $hostname;
        this.port = $port;
    }

    async submit() {
        const intParam: Parameter<IntKey> = intKey("someInt").set([12, 233, 3, 3])
        const sParam: Parameter<StringKey> = stringKey("someInt").set(["12,233,3,3"])
        const parameters: Parameter<any>[] = [intParam, sParam];
        let setupCommand: ControlCommand = {
            "_type": "Setup",
            "source": "TCS.filter.wheel",
            "commandName": "move",
            "maybeObsId": ["obs001"],
            "paramSet": parameters
        }

        let submit: CommandMessage = {
            "_type": "Submit",
            "controlCommand": setupCommand
        }

        let assembly: ComponentId = {
            "prefix": "NFIRAOS.SampleAssembly",
            "componentType": "Assembly"
        }
        let payload: GatewayCommand = {
            "_type": "ComponentCommand",
            "componentId": assembly,
            command: submit
        }
        return await this.httpClient.post<CommandResponse>(this.hostname, this.port, payload);
    }
}
