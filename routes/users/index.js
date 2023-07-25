const z = require("zod");

/// <reference types="@platformatic/service" />
("use strict");
/** @param {import('fastify').FastifyInstance} fastify */
module.exports = async function (fastify, opts) {
  // Stores all our users locally
  const usersArray = [];

  const userSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    username: z.string().min(5),
    role: z.enum(["author", "editor", "writer"]).optional(),
  });

  //Sign Up Route
  fastify.post("/register", async (request, reply) => {
    const newUser = userSchema.parse(request.body);
    usersArray.push(newUser);
    return { message: "New user has been created" };
  });

  //Sign In Route
  fastify.post("/login", async (request, reply) => {
    const { email } = request.body;
    z.string().email().parse(email);
    const foundUser = usersArray.filter((e) => {
      return e.email == email;
    });
    return { message: "User Found", user: foundUser };
  });
};
