import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

describe('Register Use Case', () => {
  it('o sistema deve criar um registro de usuário', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUsecase = new RegisterUseCase(usersRepository)

    const { user } = await registerUsecase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('o sistema deve criptografar a senha do usuário no momento do cadastro', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUsecase = new RegisterUseCase(usersRepository)

    const { user } = await registerUsecase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('o sistema não deve criar um usuário com e-mail repetido', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUsecase = new RegisterUseCase(usersRepository)

    const email = 'jhondoe@email.com'

    await registerUsecase.execute({
      name: 'Jhon Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUsecase.execute({
        name: 'Jhon Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
