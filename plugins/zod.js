const { fastify } = require("fastify");
const {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} = require("fastify-type-provider-zod");
const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");

("use strict");
/** @param {import('fastify').FastifyInstance} app */
module.exports = async function (app) {
  //   const app = fastify();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  //   app.register(swagger, {
  //     openapi: {
  //       info: {
  //         title: "SampleApi",
  //         description: "Sample backend service",
  //         version: "1.0.0",
  //       },
  //     },
  //     transform: jsonSchemaTransform,
  //   });

  //   app.register(swaggerUI, {
  //     routePrefix: "/documentation",
  //   });
};
