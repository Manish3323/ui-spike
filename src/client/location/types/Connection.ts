export interface Connection {
  _type: 'AkkaConnection' | 'HttpConnection' | 'TcpConnection'
  componentId: ComponentId
}

export interface ComponentId {
  prefix: string
  componentType: ComponentType
}

export type ComponentType =
  | 'HCD'
  | 'Assembly'
  | 'Service'
  | 'Container'
  | 'Sequencer'
  | 'SequenceComponent'
  | 'Machine'
