import { FastifyReply, FastifyRequest } from 'fastify';
import { db, robotInsertSchema, robotsTable } from '../../db';

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const res = robotInsertSchema.safeParse(request.body);

	if (!res.success) return reply.code(400).send({ message: 'Invalid form of body' });

	const { data } = res;
	const [robot] = await db.insert(robotsTable).values(data).returning();

	if (!robot) return reply.code(500).send({ message: 'Failed to create robot' });

	reply.code(201).send(robot);
}
