import { FastifyInstance } from 'fastify'
import { register } from './register-controller'
import { autheticate } from './authenticate-controller'
import { profile } from './profile-controller'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', autheticate)
  app.patch('/token/refresh', refresh)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
