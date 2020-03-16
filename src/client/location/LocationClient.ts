import { post } from '../../utils/Http'
import { TypedLocation } from './types/Location'

export class LocationClient {
  constructor(readonly hostname: string, readonly port: number) {}

  async list() {
    const payload = { _type: 'ListEntries' }

    return await post<TypedLocation[]>(this.hostname, this.port, payload)
  }
}
