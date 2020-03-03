import {ParameterType, KeyType0, Parameter} from "./Parameter";

export class Key<T extends ParameterType> {
    keyname: string
    keyType: KeyType0

    constructor(keyname: string, keytype: KeyType0) {
        this.keyname = keyname
        this.keyType = keytype
    }

    set(values: Array<T>): Parameter<T> {
        return new Parameter(this.keyname, this.keyType, values, "NoUnits")
    }
}