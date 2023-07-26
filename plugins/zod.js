/// <reference types="@platformatic/service" />
const { fastify } = require("fastify");
const {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} = require("fastify-type-provider-zod");

("use strict");
/** @param {import('fastify').FastifyInstance} app */
module.exports = async function (app) {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

    // app.register(fastifySwagger, {
    //   openapi: {
    //     info: {
    //       title: "SampleApi",
    //       description: "Sample backend service",
    //       version: "1.0.0",
    //     },
    //   },
    //   transform: jsonSchemaTransform,
    // });

    // app.register(fastifySwaggerUI, {
    //   routePrefix: "/documentation",
    // });

  };
