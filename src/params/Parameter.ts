import {Units} from "./Units";
import {Key, NameOfKey, TypeOfKey} from "./Key";

export class Parameter<T extends Key> {

    constructor(readonly keyName: string, readonly keyType: NameOfKey<T>, readonly values: TypeOfKey<T>[], readonly units: Units) {
    }

    toJSON() {
        return {
            [this.keyType]: {
                keyName: this.keyName,
                values: this.values,
                units: this.units
            }
        }
    }
}