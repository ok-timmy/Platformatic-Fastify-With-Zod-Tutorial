/// <reference types="@platformatic/service" />
const fastify = require("fastify");
// const {
//   validatorCompiler,
//   serializerCompiler,
// } = require("fastify-type-provider-zod");
const { z } = require("zod");

("use strict");
/** @param {import('fastify').FastifyInstance} fastify */
module.exports = async function (fastify, opts) {
  //   // Stores all our users locally
  //   const usersArray = [];

  //   // const userSchema = z.object({
  //   //   firstName: z.string(),
  //   //   lastName: z.string(),
  //   //   email: z.string().email(),
  //   //   username: z.string().min(5),
  //   //   role: z.enum(["author", "editor", "writer"]).optional(),
  //   // });

  //   //Sign Up Route
  //   // fastify.post("/register", async (request, reply) => {
  //   //   const newUser = userSchema.parse(request.body);
  //   //   usersArray.push(newUser);
  //   //   return { message: "New user has been created" };
  //   // });

  //   //Sign In Route
  //   fastify.post("/login", async (request, reply) => {
  //     const { email } = request.body;
  //     z.string().email().parse(email);
  //     const foundUser = usersArray.filter((e) => {
  //       return e.email == email;
  //     });
  //     return { message: "User Found", user: foundUser };
  //   });
  // };

  const usersArray = [];

  // SIGN UP METHOD
  fastify.withTypeProvider().route({
    method: "POST",
    url: "/register",
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
          // email: z.string().email(),
          // username: z.string().min(5),
        }),
      },
    },
    handler: async (req, res) => {
      const newUser = await req.body;
      console.log(newUser);
      usersArray.push(newUser);
      res.send(newUser);
    },
  });
};
