import Fastify from 'fastify';
import * as Routes from './routes';

const fastify = Fastify();

for (const [prefix, handler] of Object.entries(Routes)) {
	fastify.register(handler, { prefix });
}

fastify.listen({ port: 3000 });
