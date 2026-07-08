import { CreateGymUseCase } from './create-gym'
import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to create Gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia Javascript',
      description: '',
      phone: '',
      latitude: -23.4866439,
      longitude: -46.4555055,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
