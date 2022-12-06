import { Blog } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { IUser } from '../middleware/auth';
import { deleteBlogSchemaType } from "../zod_schema/blog.schema"



export const addBlogHandler = async (req: Request, res: Response) => {
    const { title, message } = req.body as Blog;
    const user = res.locals.user as IUser;
  
    await prisma.blog.create({
      data: {
        title,
        message,
        user_id: user.id,
      },
    });
  
    return res.status(201).json({
      message: 'New blog created for user : ' + user.id,
    });
  };

  export const deleteBlogHandler = async (req: Request, res: Response) => {
    const user = res.locals.user as IUser;
    const { blogid } = req.params as deleteBlogSchemaType;
  
    const deleteCount = await prisma.blog.deleteMany({
      where: {
        id: blogid,
        user_id: user.id,
      },
    });
  
    if (deleteCount.count == 0) {
      return res.status(400).json({
        message: 'Invalid blog id',
      });
    }
  
    return res.status(200).json({
      message: 'Blog deleted !',
    });
  };