import * as React from "react";
import { CommandApi } from "./api";
import { CommandServiceResponses } from "./types/response";
import { intKey } from "../../params/Key";
import { WebSocketClient } from "../../webSocket-client";
import { WebSocketCommandMessage } from "./types/WebsocketCommand";
import { GatewayCommand } from "./types/Command";
const commandApi = new CommandApi("localhost", 9999);

export class Commands extends React.Component {
    intKey = intKey("encoder").set([12, 23, 23])
    private readonly newProperty = new Set().add(this.intKey);
    state = {
        commandResponse: { runId: -1, result: this.newProperty }
    };

    async submitCommand() {
        let commandResponse: CommandServiceResponses = await commandApi.submit();
        this.setState({ commandResponse });
    }

    render() {
        const s = new WebSocketClient();
        s.openConnection('localhost', 9999).then(() => {
            const command: WebSocketCommandMessage = {
                "_type": "SubscribeCurrentState",
                "names": ["idle"]
            };
            const componentId: ComponentId = {
                "prefix": "NFIRAOS.SampleAssembly",
                "componentType": "Assembly"
            };
            const gatewayCommand: GatewayCommand = {
                "_type": "ComponentCommand",
                "componentId": componentId,
                "command": command
            };
            s.send(gatewayCommand)
        })

        return (
            <div>
                <button onClick={() => this.submitCommand()}><label> Submit </label></button>
                {this.state.commandResponse.runId !== -1 && <div>
                    result for runid: {this.state.commandResponse.runId}
                </div>}
            </div>
        );
    }
}