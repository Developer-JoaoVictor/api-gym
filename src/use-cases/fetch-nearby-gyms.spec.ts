import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -23.4834437,
      longitude: -46.4963973,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -23.53966,
      longitude: -46.313711,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.4834437,
      userLongitude: -46.4963973,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
