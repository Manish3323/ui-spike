export type ParameterType = number | string | boolean | number[]
export type KeyType0 = "IntKey" | "StringKey" | "BooleanKey" | "IntArrayKey"
type Units = "NoUnits" | "angstrom" | "arcmin" | "arcsec" | "day" | "degree" | "elvolt" | "gram" | "hour" | "hertz" | "joule" | "kelvin" | "kilogram" | "kilometer"
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