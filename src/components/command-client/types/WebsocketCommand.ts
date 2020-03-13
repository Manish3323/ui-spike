interface QueryFinalMessage {
    _type: "QueryFinal",
    runId: string,
    timeoutInSeconds: number
}
interface SubscribeCurrentStateMessage {
    _type: "SubscribeCurrentState",
    names: string[]
}

export type WebSocketCommandMessage = QueryFinalMessage | SubscribeCurrentStateMessage