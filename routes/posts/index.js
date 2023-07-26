const z = require("zod");

/// <reference types="@platformatic/service" />
("use strict");
/** @param {import('fastify').FastifyInstance} fastify */
module.exports = async function (fastify, opts) {
  const app = fastify.withTypeProvider();

  // Stores all our users locally
  const postsArray = [];

  //CREATE POST
  app.post(
    "/publish",
    {
      schema: {
        body: z.object({
          title: z.string(),
          content: z.string(),
          author: z.string().email(),
          category: z.enum(["news", "sports", "technology"]).optional(),
        }),
        response: {
          200: z.object({
            message: z.string(),
            data: z.object({
              title: z.string(),
              content: z.string(),
              author: z.string().email(),
              category: z.enum(["news", "sports", "technology"]).optional(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const newPost = await request.body;
      postsArray.push(newPost);
      return reply.send({
        message: "New post has been created",
        data: newPost,
      });
    }
  );

  //FETCH ALL POST
  app.get(
    "/",
    {
      schema: {
        response: {
          200: z.object({
            message: z.string(),
            data: z
              .object({
                title: z.string(),
                content: z.string(),
                author: z.string().email(),
                category: z.enum(["news", "sports", "technology"]).optional(),
              })
              .array(),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.send({
        message: "Fetched All Post",
        data: [...postsArray],
      });
    }
  );

  
  //FETCH POSTS BY A USER
  app.get(
    "/:userEmail",
    {
      schema: {
        params: z.object({
          userEmail: z.string().email(),
        }),
        response: {
          200: z.object({
            message: z.string(),
            data: z
              .object({
                title: z.string(),
                content: z.string(),
                author: z.string().email(),
                category: z.enum(["news", "sports", "technology"]).optional(),
              })
              .array(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userEmail } = await request.params;
      const userPosts = postsArray.filter((e) => {
        return e.author == userEmail;
      });

      return reply.send({
        message: "User Post fetched successfully",
        data: [...userPosts],
      });
    }
  );
};
