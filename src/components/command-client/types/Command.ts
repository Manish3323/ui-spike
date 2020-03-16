import { Key } from '../../../params/Key'
import { Parameter } from '../../../params/Parameter'
import { WebSocketCommandMessage } from './WebsocketCommand'
export interface Command {
  source: string
  commandName: string
  maybeObsId?: Array<string>
  paramSet: Parameter<Key>[]
}
export interface GatewayCommand {
  _type: 'ComponentCommand' | 'SequencerCommand'
  componentId: ComponentId
  command: CommandMessage | WebSocketCommandMessage
}
export interface CommandMessage {
  _type:
    | 'Submit'
    | 'Validate'
    | 'Oneway'
    | 'QueryFinal'
    | 'SubscribeCurrentState'
  controlCommand: HttpMessageControlCommand
}
export interface HttpMessageControlCommand extends Command {
  _type: 'Setup' | 'Observe'
}
export interface SequenceCommand extends Command {
  _type: 'Setup' | 'Observe' | 'Wait'
}
