import { Parameter, ParameterKeyType } from "../../../params/Parameter";

export interface Command {
    source: string,
    commandName: string,
    maybeObsId?: string,
    paramSet: Set<Parameter<ParameterKeyType>>
}

export interface ControlCommand extends Command {
    _type: "Setup" | "Observe",
}

export interface SequenceCommand extends Command {
    _type: "Setup" | "Observe" | "Wait",
}