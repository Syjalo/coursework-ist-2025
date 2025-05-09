import { FastifyInstance } from 'fastify';
import { getMany } from './get-many';
import { create } from './create';
import { getOne } from './get-one';

export function countries(fastify: FastifyInstance) {
	fastify.get('/', getMany).post('/', create).get('/:id', getOne);
}
