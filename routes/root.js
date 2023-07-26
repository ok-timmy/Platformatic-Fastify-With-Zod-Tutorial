/// <reference types="@platformatic/service" />
const fastify = require("fastify");
// const {
//   validatorCompiler,
//   serializerCompiler,
// } = require("fastify-type-provider-zod");
const z = require("zod");

("use strict")
/** @param {import('fastify').FastifyInstance} fastify */
module.exports = async function (fastify) {
  const app = fastify.withTypeProvider();
  // app.route({
  //   method: "GET",
  //   url: "/test",
  //   schema: {
  //     querystring: z.object({
  //       name: z.string().min(4).optional(),
  //     }),
  //     response: {
  //       200: z.string(),
  //     },
  //   },
  //   handler: async (req, res) => {
  //     res.send(req.query.name);
  //   },
  // });

  app.get(
    "/test",
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
