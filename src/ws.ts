export const ws = (hostname: string, port: number): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const wss = new WebSocket(`ws://${hostname}:${port}/websocket-endpoint`)
    wss.onopen = (event: Event) => {
      resolve(wss)
    }
    wss.onerror = (event: Event) => {
      reject({ message: 'error', ...event })
    }
  })
}
