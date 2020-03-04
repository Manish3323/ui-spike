import { Parameter } from "./Parameter";
import { Units } from "./Units";

export type IntKey = { "KeyName": "IntKey", "KeyType": number }
export type StringKey = { "KeyName": "StringKey", "KeyType": string }
export type IntArrayKey = { "KeyName": "IntArrayKey", "KeyType": number[] }

export type Key = IntKey | StringKey | IntArrayKey

export type TypeOfKey<T extends Key> = T['KeyType']
export type NameOfKey<T extends Key> = T['KeyName']

class BaseKey<T extends Key> {

    constructor(readonly keyName: string, readonly keyType: NameOfKey<T>, readonly units: Units) { }

    set(values: TypeOfKey<T>[]): Parameter<T> {
        return new Parameter(this.keyName, this.keyType, values, this.units)
    }
}

// ############# Keys #############
export const intKey = (name: string, units: Units = "NoUnits") => new BaseKey<IntKey>(name, "IntKey", units)
export const stringKey = (name: string, units: Units = "NoUnits") => new BaseKey<StringKey>(name, "StringKey", units)

export const intArrayKey = (name: string, units: Units = "NoUnits") => new BaseKey<IntArrayKey>(name, "IntArrayKey", units)