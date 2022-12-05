import { z } from 'zod';

export const addBlogSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required !',
        invalid_type_error: 'Title must be a string',
      })
      .min(5, 'Title must be more than 5 char'),

    message: z
    .string({
        required_error: 'message is required !',
        invalid_type_error: 'Title must be a string',
    })
    .min(100, 'message must be more than 100 word' )
  }),
});

export const deleteBlogSchema = z.object({
    params: z.object({
      blogid: z.string({
        required_error: 'id is required !',
        invalid_type_error: 'Blog id must be a string',
      }),
    }),
  });
  
  export type deleteBlogSchemaType = z.infer<typeof deleteBlogSchema>['params'];