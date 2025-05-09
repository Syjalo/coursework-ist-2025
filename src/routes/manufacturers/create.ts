import { FastifyReply, FastifyRequest } from 'fastify';
import { db, manufacturerInsertSchema, manufacturersTable } from '../../db';

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const res = manufacturerInsertSchema.safeParse(request.body);

	if (!res.success) return reply.code(400).send({ message: 'Invalid form of body' });

	const { data } = res;
	const [manufacturer] = await db.insert(manufacturersTable).values(data).returning();

	if (!manufacturer) return reply.code(500).send({ message: 'Failed to create manufacturer' });

	reply.code(201).send(manufacturer);
}
