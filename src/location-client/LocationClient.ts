import { post } from '../utils/http-client'
import { TypedLocation } from './types/Location'

export class LocationClient {
  constructor(private hostname: string, private port: number) {}

  async list() {
    let payload = { _type: 'ListEntries' }

    return await post<TypedLocation[]>(this.hostname, this.port, payload)
  }
}
