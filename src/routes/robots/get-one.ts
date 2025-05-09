import { eq } from 'drizzle-orm';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { db, robotsTable } from '../../db';

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
	const res = z.object({ id: z.coerce.number() }).safeParse(request.params);

	if (!res.success) return reply.code(400).send({ message: 'Invalid param type' });

	const [robot] = await db.select().from(robotsTable).where(eq(robotsTable.id, res.data.id));

	if (!robot) return reply.code(404).send({ message: 'Unknown robot' });

	reply.send(robot);
}
