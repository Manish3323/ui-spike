import { post } from "../../http-client";
import { WebSocketClient } from "../../webSocket-client";
import { HttpMessageControlCommand, GatewayCommand, CommandMessage } from "./types/Command";
import { Parameter } from "../../params/Parameter";
import { IntKey, intKey, stringKey, StringKey } from "../../params/Key";
import { CommandServiceResponses } from "./types/response";

export class CommandApi {
    private hostname: string;
    private port: number;
           
    private ws: WebSocket;
    constructor($hostname: string, $port: number) {
        this.hostname = $hostname;
        this.port = $port;
        this.createWebSocketConnection();
    }

    private createWebSocketConnection() {
        const ws = new WebSocketClient();
        ws.openConnection('localhost', 9999).then((webSocket) => {
            this.ws = webSocket;
        });
        this.ws.onopen = () => {
            console.log
        }
        this.ws.subscribeToCurrentState();

    }

    async submit() {
        const intParam: Parameter<IntKey> = intKey("someInt").set([12, 233, 3, 3])
        const sParam: Parameter<StringKey> = stringKey("someInt").set(["12,233,3,3"])
        const parameters: Parameter<any>[] = [intParam, sParam];
        let setupCommand: HttpMessageControlCommand = {
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
        return await post<CommandServiceResponses>(this.hostname, this.port, payload);
    }

    async subscribeCurrentState() {
        return await track<CommandServiceResponses>(this.hostname, this.port, payload);
    }
}
