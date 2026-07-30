import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetrcisUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetrcisUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
