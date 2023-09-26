const { resolve } = require('path');
const fastity = require('fastify')();

fastity.register(require('@fastify/static'), { root: resolve('./public')});

fastity.listen({ port: 3000 });