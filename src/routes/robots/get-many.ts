import { FastifyReply, FastifyRequest } from 'fastify';
import { db, robotsTable } from '../../db';

export async function getMany(_: FastifyRequest, reply: FastifyReply) {
	const robots = await db.select().from(robotsTable);
	await reply.send(robots);
}
