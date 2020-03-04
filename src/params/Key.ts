import { Units } from "./Units";
import { BaseKey } from "./BaseKey";

export type KeyType<T extends Key> = T['KeyType']
export type KeyTag<T extends Key> = T['KeyTag']

export type Key = IntKey | StringKey | IntArrayKey

// Keys
export type IntKey = { "KeyTag": "IntKey", "KeyType": number }
export type StringKey = { "KeyTag": "StringKey", "KeyType": string }
export type IntArrayKey = { "KeyTag": "IntArrayKey", "KeyType": number[] }


// Key Api
export const intKey = (name: string, units: Units = "NoUnits") => new BaseKey<IntKey>(name, "IntKey", units)
export const stringKey = (name: string, units: Units = "NoUnits") => new BaseKey<StringKey>(name, "StringKey", units)
export const intArrayKey = (name: string, units: Units = "NoUnits") => new BaseKey<IntArrayKey>(name, "IntArrayKey", units)