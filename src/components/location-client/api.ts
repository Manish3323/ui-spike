import { post } from '../../utils/http-client'
import { TypedLocation } from './types/Location'

export class LocationApi {
  private hostname: string
  private port: number

  constructor($hostname: string, $port: number) {
    this.hostname = $hostname
    this.port = $port
  }

  async list() {
    let payload = { _type: 'ListEntries' }

    return await post<TypedLocation[]>(this.hostname, this.port, payload)
  }
}
