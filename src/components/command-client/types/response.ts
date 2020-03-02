import { Parameter } from "../../../params/Parameter";

export type SubmitResponse = Completed

export interface Completed{
    runId: string,
    result: Set<Parameter<number>>
}