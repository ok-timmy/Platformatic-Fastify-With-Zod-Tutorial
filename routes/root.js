/// <reference types="@platformatic/service" />
const fastify = require("fastify");
// const {
//   validatorCompiler,
//   serializerCompiler,
// } = require("fastify-type-provider-zod");
const z = require("zod");

("use strict");
/** @param {import('fastify').FastifyInstance} fastify */
module.exports = async function (fastify) {
  
  const app = fastify.withTypeProvider();
  app.get(
    "/",
    {
      schema: {
        response: {
          200: z.object({
            hello: z.string(),
          }),
        },
      },
    },
    async () => {
      return { hello: fastify.example };
    }
  );
};

// app1.listen({ port: 4949 });

// ("use strict");
// /** @param {import('fastify').FastifyInstance} fastify */
// module.exports = async function (fastify, opts) {
//   fastify.get("/", async (request, reply) => {
//     return { hello: fastify.example };
//   });
// };
