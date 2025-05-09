import { eq } from 'drizzle-orm';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { countriesTable, db } from '../../db';

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
	const res = z.object({ id: z.coerce.number() }).safeParse(request.params);

	if (!res.success) return reply.code(400).send({ message: 'Invalid param type' });

	const [country] = await db.select().from(countriesTable).where(eq(countriesTable.id, res.data.id));

	if (!country) return reply.code(404).send({ message: 'Unknown country' });

	await reply.send(country);
}
