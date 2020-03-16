import { ComponentId } from '../location/types/Connection'
import { intKey, IntKey, StringKey, stringKey } from '../../params/Key'
import { Parameter } from '../../params/Parameter'
import { CommandClient } from './CommandClient'
import { CommandMessage, HttpMessageControlCommand } from './types/Command'

test('http', async () => {
  const intParam: Parameter<IntKey> = intKey('someInt').set([12, 233, 3, 3])
  const sParam: Parameter<StringKey> = stringKey('someInt').set(['12,233,3,3'])
  const parameters: Parameter<any>[] = [intParam, sParam]
  const setupCommand: HttpMessageControlCommand = {
    _type: 'Setup',
    source: 'CSW.ncc.trombone',
    commandName: 'immediate',
    maybeObsId: ['obs001'],
    paramSet: parameters,
  }

  const submit: CommandMessage = {
    _type: 'Submit',
    controlCommand: setupCommand,
  }

  const assembly: ComponentId = {
    prefix: 'CSW.ncc.trombone',
    componentType: 'HCD',
  }
  const commandClient = CommandClient('localhost', 8090, assembly)

  console.log('Submitting command ...')
  const response = await commandClient.submit(submit)

  console.log(response)
})

test('websocket', async () => {
  const componentId: ComponentId = {
    prefix: 'CSW.ncc.trombone',
    componentType: 'HCD',
  }
  const commandClient = CommandClient('localhost', 8090, componentId)

  console.log('Subscribing to current state ...')
  commandClient.subscribeCurrentState(new Set(), console.log)

  await sleep(100000)
}, 100000)

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
