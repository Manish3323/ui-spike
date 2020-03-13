import { GatewayCommand } from "./components/command-client/types/Command";

export class WebSocketClient {
    wss: WebSocket

    openConnection = (hostname: string, port: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.wss = new WebSocket(`ws://${hostname}:${port}/websocket-endpoint`)
            this.wss.onopen = ((event: Event) => {
                this.wss.onmessage = ((event: MessageEvent) => {
                    console.log('received data', event.data)
                })
                resolve({ message: 'connection open to communicate!!', ...event })
            })
            this.wss.onerror = ((event: Event) => {
                reject({ message: 'error', ...event })
            })
        })
    }

    onMessageRecieveHandler = (fn: Function) => {
        this.wss.onmessage = (event: MessageEvent) => fn(event)
    }

    send = (message: GatewayCommand): void => {
        this.wss.send(JSON.stringify(message));
    }

    closeConnection = (withReason?: string) => {
        this.wss.close(0, withReason);
    }
}