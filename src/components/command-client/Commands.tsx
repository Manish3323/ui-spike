import * as React from "react";
import { CommandApi } from "./api";
import { CommandServiceResponses } from "./types/response";
import { intKey } from "../../params/Key";
import { WebSocketClient } from "../../webSocket-client";
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
        s.openConnection().then(() => {
            s.send({
                "_type": "ComponentCommand",
                "componentId": {
                    "prefix": "NFIRAOS.SampleAssembly",
                    "componentType": "Assembly"
                },
                "command": {
                    "_type": "SubscribeCurrentState",
                    "names": ["idle"]
                }
            })
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