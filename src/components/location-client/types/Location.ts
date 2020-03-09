export interface TypedLocation {
    _type: "AkkaLocation" | "HttpLocation" | "TcpLocation",
    prefix: string;
    componentType: string;
    connectionType: string;
    uri: string;
}