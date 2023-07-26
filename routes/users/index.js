/// <reference types="@platformatic/service" />
const { z } = require("zod");

("use strict");
/** @param {import('fastify').FastifyInstance} fastify */
module.exports = async function (fastify, opts) {
  const app = fastify.withTypeProvider();
  // Stores all our users locally
  const usersArray = [];

  // SIGN UP METHOD
  app.post(
    "/register",
    {
      schema: {
        body: z.object({
          firstName: z.string(),
          lastName: z.string(),
          email: z.string().email(),
          username: z.string().min(5),
          role: z.enum(["author", "editor", "writer"]).optional(),
        }),
        response: {
          200: z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            username: z.string().min(5),
          }),
        },
      },
    },
    async (req, res) => {
      const newUser = await req.body;
      console.log(newUser);
      usersArray.push(newUser);
      return res.send(newUser);
    }
  );

  // SIGN IN METHOD
  app.post(
    "/login",
    {
      schema: {
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          200: z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            username: z.string().min(5),
          }),
        },
      },
    },
    async (req, res) => {
      const foundUser = usersArray.filter((e) => {
        return e.email === req.body.email;
      });
      console.log(...foundUser);
      return res.send(...foundUser);
    }
  );
};
