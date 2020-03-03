import { Key } from "./Key";

export type ParameterType = number | string | boolean | number[]
export type KeyType0 = "IntKey" | "StringKey" | "BooleanKey" | "IntArrayKey"

const SimpleKeyType = <T extends ParameterType>(keyType0: KeyType0, name: string) => {
    return new Key<T>(name, keyType0)
}

const intKey = (name: string) => {
    return SimpleKeyType<number>("IntKey",name)
}

const intArrayKey = (name: string) => {
    return SimpleKeyType<number[]>("IntArrayKey",name)
}

export {
    intKey,
    intArrayKey
}