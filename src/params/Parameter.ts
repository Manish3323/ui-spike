type ParameterKeyType = "IntKey" | "StringKey"


type Units = "NoUnits" | "angstrom" | "arcmin" |   "arcsec" |   "day" |      "degree" |   "elvolt" |   "gram" |     "hour" |     "hertz" |    "joule" |    "kelvin" |   "kilogram" | "kilometer" 

type Parameter = {
    [keyType in ParameterKeyType]: {
        keyName: string,
        values: Array<any>,
        units: Units
    }
}
