import { eq } from 'drizzle-orm';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { db, manufacturersTable } from '../../db';

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
	const res = z.object({ id: z.coerce.number() }).safeParse(request.params);

	if (!res.success) return reply.code(400).send({ message: 'Invalid param type' });

	const [manufacturer] = await db.select().from(manufacturersTable).where(eq(manufacturersTable.id, res.data.id));

	if (!manufacturer) return reply.code(404).send({ message: 'Unknown manufacturer' });

	await reply.send(manufacturer);
}
