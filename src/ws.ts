
const createWebsocket = (host: string, port: number) =>
  new WebSocket(`ws://${host}:${port}/websocket-endpoint`)

export class Ws {
  public socket: Promise<WebSocket>

  constructor(host: string, port: number) {
    this.socket = new Promise((resolve, reject) => {
      const wss = createWebsocket(host, port)
      wss.onopen = () => {resolve(wss)}
      wss.onerror = (event: Event) => reject({ message: 'error', ...event })
    })
  }

  // fixme: msg type
  send(msg: any) {
    this.socket.then((wss) => wss.send(JSON.stringify(msg)))
  }

  subscribe<T>(cb: (msg: T) => void): Subscription {
    this.socket.then((wss) => {
      wss.onmessage = (event: MessageEvent) => cb(event.data)
    })

    const subscription = {
      cancel: () => this.socket.then((wss) => wss.close),
    }
    return subscription
  }
}

// fixme
export interface Subscription {
  cancel: () => void
}
