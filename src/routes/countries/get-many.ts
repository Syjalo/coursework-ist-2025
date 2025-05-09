import { FastifyReply, FastifyRequest } from 'fastify';
import { countriesTable, db } from '../../db';

export async function getMany(_: FastifyRequest, reply: FastifyReply) {
	const countries = await db.select().from(countriesTable);
	await reply.send(countries);
}
