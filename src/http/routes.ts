import { FastifyInstance } from 'fastify'
import { register } from './controller/register-controller'
import { autheticate } from './controller/authenticate-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', autheticate)
}
