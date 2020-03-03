import { Parameter, ParameterType } from "../../../params/Parameter";

export interface Command {
    source: string,
    commandName: string,
    maybeObsId?: Array<string>,
    paramSet: Parameter<ParameterType>[]
}

export interface GatewayCommand {
    _type: "ComponentCommand" | "SequencerCommand"
    componentId: ComponentId,
    command: CommandMessage
}
export interface CommandMessage {
    _type: "Submit" | "Validate" | "Oneway"
    controlCommand: ControlCommand
}

export interface ControlCommand extends Command {
    _type: "Setup" | "Observe",
}

export interface SequenceCommand extends Command {
    _type: "Setup" | "Observe" | "Wait",
}