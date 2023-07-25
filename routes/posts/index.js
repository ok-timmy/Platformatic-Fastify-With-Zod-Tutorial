const z = require("zod");

/// <reference types="@platformatic/service" />
("use strict");
/** @param {import('fastify').FastifyInstance} fastify */
module.exports = async function (fastify, opts) {
  // Stores all our users locally
  const postsArray = [];

  const postSchema = z.object({
    title: z.string(),
    content: z.string(),
    author: z.string().email(),
    category: z.enum(["news", "sports", "technology"]).optional(),
  });

  //Create Post Route
  fastify.post("/publish", async (request, reply) => {
    const newPost = postSchema.parse(request.body);
    postsArray.push(newPost);
    return { message: "New post has been created", data: newPost };
  });

  //Get all post
  fastify.get("/", async (request, reply) => {
    return {
      data: postsArray,
    };
  });

  //Fecth post by user
  fastify.get("/:userEmail", async (request, reply) => {
    const { userEmail } = request.params;
    z.string().email().parse(userEmail);
    const userPosts = postsArray.filter((e) => {
      return e.author == userEmail;
    });

    return {
      data: userPosts,
    };
  });
};
