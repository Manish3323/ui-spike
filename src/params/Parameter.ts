
type Units = "NoUnits" | "angstrom" | "arcmin" | "arcsec" | "day" | "degree" | "elvolt" | "gram" | "hour" | "hertz" | "joule" | "kelvin" | "kilogram" | "kilometer" 

export type ParameterKeyType = number | boolean| string | [] | [[]]
export class Parameter<T extends ParameterKeyType> {
        keyName: string
        values: Array<T>
        units: Units

        constructor(keyName:string, values: Array<T>, units: Units){
            this.keyName = keyName
            this.values = values
            this.units = units
        }
}

class DD {
    par: Parameter<number>
    boolPar: Parameter<boolean>
    constructor() {
        this.par = new Parameter<number>("", [123], "NoUnits");
        this.boolPar = new Parameter<boolean>("", [true], "NoUnits");
    }

}