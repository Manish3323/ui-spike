import { Units } from "./Units";
import { KeyType0, ParameterType } from "./KeyTypes";

export class Parameter<T extends ParameterType> {
    keyname: string
    keyType: KeyType0
    values: Array<T>
    units: Units
    constructor(keyname: string, keyType: KeyType0, values: Array<T>, units: Units) {
        this.keyname = keyname
        this.keyType = keyType
        this.values = values
        this.units = units
    }

    toJSON() {
        return {
            [`${this.keyType}`]: {
                keyName: this.keyname,
                values: this.values,
                units: this.units
            }
        }
    }
}