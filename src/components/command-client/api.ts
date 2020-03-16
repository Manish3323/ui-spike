import { post } from '../../http-client'
import { Ws } from '../../Ws'
import { CommandMessage, GatewayCommand } from './types/Command'
import { CommandServiceResponses } from './types/response'
import { WebSocketCommandMessage } from './types/WebsocketCommand'
import { Parameter } from '../../params/Parameter'

export class CommandApi {
  private hostname: string
  private port: number

  // fixme: should it also take ComponentId similar to scala?
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

export interface CurrentState {
  prefix: string,
  stateName: string,
  paramSet: Parameter<any>[]
}