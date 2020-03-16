import { post } from '../../utils/Http'
import { Subscription, Ws } from '../../utils/Ws'
import { CommandMessage, GatewayCommand } from './types/Command'
import { CommandServiceResponses } from './types/response'
import { WebSocketCommandMessage } from './types/WebsocketCommand'
import { ComponentId } from '../location/types/Connection'
import { Parameter } from '../../params/Parameter'

export interface CommandClient {
  submit(
    componentId: ComponentId,
    command: CommandMessage,
  ): Promise<CommandServiceResponses>

  subscribeCurrentState(
    componentId: ComponentId,
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void,
  ): Subscription
}

export const CommandClient = (
  hostname: string,
  port: number,
): CommandClient => {
  const submit = async (componentId: ComponentId, command: CommandMessage) => {
    const payload: GatewayCommand = {
      _type: 'ComponentCommand',
      componentId: componentId,
      command: command,
    }
    return await post<CommandServiceResponses>(hostname, port, payload)
  }

  const subscribeCurrentState = (
    componentId: ComponentId,
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void,
  ): Subscription => {
    const websocket = new Ws(hostname, port)

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
    const subscription = websocket.subscribe(onStateChange)
    return subscription
  }

  return {
    submit,
    subscribeCurrentState,
  }
}
export interface CurrentState {
  prefix: string
  stateName: string
  paramSet: Parameter<any>[]
}
