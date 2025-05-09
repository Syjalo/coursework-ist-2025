import { FastifyReply, FastifyRequest } from 'fastify';
import { db, manufacturersTable } from '../../db';

export async function getMany(_: FastifyRequest, reply: FastifyReply) {
	const manufacturers = await db.select().from(manufacturersTable);
	reply.send(manufacturers);
}
