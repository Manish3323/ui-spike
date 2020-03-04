import { Parameter } from "../../../params/Parameter";
import { Key } from "../../../params/Key";

export type SubmitResponse = Completed

export interface Completed{
    runId: string,
    result: Set<Parameter<Key>>
}