const createWebsocket = (host: string, port: number) =>
  new WebSocket(`ws://${host}:${port}/websocket-endpoint`)

export class Ws {
  private socket: Promise<WebSocket>

  constructor(host: string, port: number) {
    this.socket = new Promise((resolve, reject) => {
      const wss = createWebsocket(host, port)
      wss.onopen = () => resolve(wss)
      wss.onerror = (event: Event) => reject({ message: 'error', ...event })
    })
  }

  send(msg: any) {
    this.socket.then(ws => ws.send(JSON.stringify(msg)))
  }

  subscribe<T>(cb: (msg: T) => void): Subscripription {
    this.socket.then(ws => {
      ws.onmessage = (event: MessageEvent) => cb(event.data)
    })

    const subscription = {
      cancel: () => this.socket.then(ws => ws.close),
    }

    return subscription
  }
}

export interface Subscripription {
  cancel: () => void
}
