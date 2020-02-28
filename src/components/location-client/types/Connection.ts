interface Connection{
    componentId: ComponentId,
}

interface ComponentId {
    prefix: string,
    componentType: ComponentType
}


type ComponentType = "Assembly" | "HCD" | "Sequencer" | "Service"