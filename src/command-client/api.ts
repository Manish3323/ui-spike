import { post } from '../utils/http-client'
import { Subscription, Ws } from '../utils/Ws'
import { CommandMessage, GatewayCommand } from './types/Command'
import { CommandServiceResponses } from './types/response'
import { WebSocketCommandMessage } from './types/WebsocketCommand'
import { ComponentId } from '../components/location-client/types/Connection'

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

// fixme
export interface CurrentState {
  name: string
}
