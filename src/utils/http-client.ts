import 'whatwg-fetch'
import { ServiceResponses as ServiceResponse } from '../ServiceResponse'

type RequestConfig = {
  url: string
  method: string
  headers: Headers
  body: string
}

let interceptorHooks: Function[] = []

export const post = async <T extends ServiceResponse>(
  hostname: string,
  port: number,
  payload: any,
): Promise<T> => {
  const url = `http://${hostname}:${port}/post-endpoint`
  executeInterceptors()
  return clientFetch(url, payload, 'POST')
}

let headers = new Headers([['Content-Type', 'application/json']])

const setHeaders = (_headers: Headers) => {
  _headers.forEach((k: string, v: string) => headers.set(k, v))
}

const registerInterceptors = (fs: Function[]) => {
  fs.map(f => (interceptorHooks[interceptorHooks.length - 1] = f))
}

const unRegisterInterceptors = (f: Function) => {
  const index = interceptorHooks.indexOf(f)
  if (index !== -1) {
    interceptorHooks.splice(index, 1)
  } else {
    throw new Error('Interceptor function not registered')
  }
}

const executeInterceptors = () => {
  interceptorHooks.forEach((element: Function) => {
    element.call(this)
  })
}

let commonHeaders = {
  header: 'value',
  header2: 'value2',
} as { [key: string]: string }

const logger = (req: RequestConfig) => {
  console.log(`request sent to ${req.url} with body ${req.body}`)
  return req
}

const addHeaders = (
  url: string,
  req: RequestConfig,
  extraHeaders?: Headers,
) => {
  if (!!req.headers) {
    !!commonHeaders &&
      Object.keys(commonHeaders).forEach((k: string) =>
        req.headers.set(k, commonHeaders[k]),
      )
    !!extraHeaders &&
      Object.keys(extraHeaders).forEach((k: string) =>
        req.headers.set(k, commonHeaders[k]),
      )
  }
  return new Request(url, req)
}

const handleErrors = (res: any) => {
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res
}
class Success {
  constructor(readonly result: any) {}
}
class Error {
  constructor(readonly reason: string) {}
}

const clientFetch = async (
  url: string,
  payload: any,
  method: 'POST' | 'GET',
): Promise<any> => {
  const request: RequestConfig = {
    url: url,
    method: method,
    headers: headers,
    body: JSON.stringify(payload),
  }

  return new Promise((resolve, reject) => {
    fetch(url, request)
      .then(handleErrors)
      .then(async response => {
        const body: any = await response.json()
        resolve(new Success(body))
      })
      .catch(e => reject(new Error(e.message)))
  })
}
