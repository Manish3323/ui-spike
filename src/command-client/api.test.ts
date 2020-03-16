import { ComponentId } from '../components/location-client/types/Connection'
import { intKey, IntKey, StringKey, stringKey } from '../params/Key'
import { Parameter } from '../params/Parameter'
import { Ws } from '../utils/Ws'
import { CommandClient, CurrentState } from './api'
import {
  CommandMessage,
  GatewayCommand,
  HttpMessageControlCommand,
} from './types/Command'
import { WebSocketCommandMessage } from './types/WebsocketCommand'

const commandClient = CommandClient('localhost', 9999)

test('http', async () => {
  const intParam: Parameter<IntKey> = intKey('someInt').set([12, 233, 3, 3])
  const sParam: Parameter<StringKey> = stringKey('someInt').set(['12,233,3,3'])
  const parameters: Parameter<any>[] = [intParam, sParam]
  const setupCommand: HttpMessageControlCommand = {
    _type: 'Setup',
    source: 'TCS.filter.wheel',
    commandName: 'move',
    maybeObsId: ['obs001'],
    paramSet: parameters,
  }

  const submit: CommandMessage = {
    _type: 'Submit',
    controlCommand: setupCommand,
  }

  const assembly: ComponentId = {
    prefix: 'NFIRAOS.SampleAssembly',
    componentType: 'Assembly',
  }

  console.log('Submitting command ...')
  const response = await commandClient.submit(assembly, submit)

  console.log(response)
})

test('websocket', () => {
  const websocket = new Ws('localhost', 52489)

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

  console.log('Sending websocket request ...')
  websocket.send(gatewayCommand)

  console.log('Subscribing to current state ...')
  websocket.subscribe<CurrentState>(message => console.log(message))
})
