export interface Connection {
  componentId: ComponentId
}

export interface ComponentId {
  prefix: string
  componentType: ComponentType
}

export type ComponentType =
  | 'Assembly'
  | 'HCD'
  | 'Sequencer'
  | 'Service'
  | 'assembly'
