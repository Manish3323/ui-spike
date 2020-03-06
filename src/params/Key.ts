import { Units } from "./Units";
import { BaseKey, ChoiceKeyFactory } from "./BaseKey";
import { Parameter } from "./Parameter";
export type Primitive = string | number | boolean
interface struct { paramSet: Parameter<Key>[] }
export type KeyType<T extends Key> = T['KeyType']
export type KeyTag<T extends Key> = T['KeyTag']
export type Key = IntKey | StringKey | IntArrayKey | StructKey | ChoiceKey<any>
// Keys
export type IntKey = { "KeyTag": "IntKey", "KeyType": number }
export type StringKey = { "KeyTag": "StringKey", "KeyType": string }
export type IntArrayKey = { "KeyTag": "IntArrayKey", "KeyType": number[] }
export type StructKey = { "KeyTag": "StructKey", "KeyType": struct }
export type ChoiceKey<T> = { "KeyTag": "ChoiceKey", "KeyType": T }

// Key Api
export const intKey = (name: string, units: Units = "NoUnits") => new BaseKey<IntKey>(name, "IntKey", units)
export const stringKey = (name: string, units: Units = "NoUnits") => new BaseKey<StringKey>(name, "StringKey", units)
export const intArrayKey = (name: string, units: Units = "NoUnits") => new BaseKey<IntArrayKey>(name, "IntArrayKey", units)
export const structKey = (name: string, units: Units = "NoUnits") => new BaseKey<StructKey>(name, "StructKey", units)
export const choiceKey = (name: string, units: Units = "NoUnits") =>new ChoiceKeyFactory<ChoiceKey<string>>(name, "ChoiceKey", units)

// examples
let intParam = intKey("ints", "gram").set([1, 2, 3])
let stringparam = stringKey("strings", "hertz").set(["n", "aste", "am"])
structKey("structs", "NoUnits").set([{ paramSet: [intParam, stringparam] }])

const gc = choiceKey("choiceOfDays", "NoUnits")
const choices = gc.makeChoices('sunday','monday', 'tuesday')
gc.setChoice(choices, ['sunday'])