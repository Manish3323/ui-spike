import { post } from '../../http-client'
import { Ws } from '../../ws'
import {
  HttpMessageControlCommand,
  GatewayCommand,
  CommandMessage,
  Command,
} from './types/Command'
import { Parameter } from '../../params/Parameter'
import { IntKey, intKey, stringKey, StringKey } from '../../params/Key'
import { CommandServiceResponses } from './types/response'
import { WebSocketCommandMessage } from './types/WebsocketCommand'

export class CommandApi {
  private hostname: string
  private port: number

  constructor($hostname: string, $port: number) {
    this.hostname = $hostname
    this.port = $port
  }

  async submit(componentId: ComponentId, command: CommandMessage) {
    const payload: GatewayCommand = {
      _type: 'ComponentCommand',
      componentId: componentId,
      command: command,
    }
    return await post<CommandServiceResponses>(
      this.hostname,
      this.port,
      payload,
    )
  }

  async subscribeCurrentState(
    componentId: ComponentId,
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void,
  ) {
    const websocket = new Ws(this.hostname, this.port)

    const command: WebSocketCommandMessage = {
      _type: 'SubscribeCurrentState',
      names: Array.from(stateNames.values()),
    }

    const gatewayCommand: GatewayCommand = {
      _type: 'ComponentCommand',
      componentId: componentId,
      command: command,
    }

    websocket.send(gatewayCommand)
    websocket.subscribe(onStateChange)
  }
}

interface CurrentState {
  name: string
}
