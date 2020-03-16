import * as React from 'react'
import { CommandApi, CurrentState } from './api'
import { CommandServiceResponses } from './types/response'
import { intKey, StringKey, IntKey, stringKey } from '../../params/Key'
import { WebSocketCommandMessage } from './types/WebsocketCommand'
import {
    GatewayCommand,
    HttpMessageControlCommand,
    CommandMessage,
} from './types/Command'
import { Ws } from '../../Ws'
import { Parameter } from '../../params/Parameter'
const commandApi = new CommandApi('localhost', 9999)

export class Commands extends React.Component {
    intKey = intKey('encoder').set([12, 23, 23])
    private readonly newProperty = new Set().add(this.intKey)
    state = {
        commandResponse: { runId: -1, result: this.newProperty },
    }

    async componentDidMount() {
        const websocket = new Ws('localhost', 52489)
        websocket.socket.then(() => {
            const command: WebSocketCommandMessage = {
                _type: 'SubscribeCurrentState',
                names: ['stateName1'],
            }
            const componentId: ComponentId = {
                prefix: 'ESW.test',
                componentType: 'assembly',
            }
            const gatewayCommand: GatewayCommand = {
                _type: 'ComponentCommand',
                componentId: componentId,
                command: command,
            }
            websocket.send(gatewayCommand)
            websocket.subscribe<CurrentState>((message) => console.log(message))
        })
    }

    async submitCommand() {
        const intParam: Parameter<IntKey> = intKey('someInt').set([12, 233, 3, 3])
        const sParam: Parameter<StringKey> = stringKey('someInt').set([
            '12,233,3,3',
        ])
        const parameters: Parameter<any>[] = [intParam, sParam]
        let setupCommand: HttpMessageControlCommand = {
            _type: 'Setup',
            source: 'TCS.filter.wheel',
            commandName: 'move',
            maybeObsId: ['obs001'],
            paramSet: parameters,
        }

        let submit: CommandMessage = {
            _type: 'Submit',
            controlCommand: setupCommand,
        }

        let assembly: ComponentId = {
            prefix: 'NFIRAOS.SampleAssembly',
            componentType: 'Assembly',
        }

        let commandResponse: CommandServiceResponses = await commandApi.submit(
            assembly,
            submit,
        )
        this.setState({ commandResponse })
    }

    render() {
        return (
            <div>
                <button onClick={() => this.submitCommand()}>
                    <label> Submit </label>
                </button>
                {this.state.commandResponse.runId !== -1 && (
                    <div>result for runid: {this.state.commandResponse.runId}</div>
                )}
            </div>
        )
    }
}
