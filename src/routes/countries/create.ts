import { FastifyReply, FastifyRequest } from 'fastify';
import { countriesTable, countryInsertSchema, db } from '../../db';

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const res = countryInsertSchema.safeParse(request.body);

	if (!res.success) return reply.code(400).send({ message: 'Invalid form of body' });

	const { data } = res;
	const [country] = await db.insert(countriesTable).values(data).returning();

	if (!country) return reply.code(500).send({ message: 'Failed to create country' });

	reply.code(201).send(country);
}
