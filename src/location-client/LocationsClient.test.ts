import { LocationClient } from './LocationClient'
import { TypedLocation } from './types/Location'

const locationApi = new LocationClient('localhost', 7654)

test('list', async () => {
  const locations: Array<TypedLocation> = await locationApi.list()

  locations.forEach(console.log)
})
