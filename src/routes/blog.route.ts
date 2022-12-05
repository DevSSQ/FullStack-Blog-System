import express from 'express';
import { protect } from '../middleware/auth';
import validate from '../middleware/validate';
import { addBlogHandler, deleteBlogHandler } from '../controller/blog.controller';
import { addBlogSchema, deleteBlogSchema } from '../zod_schema/blog.schema';


const router = express.Router();
router.post('/', protect, validate(addBlogSchema), addBlogHandler);
router.delete('/:blogid', protect, validate(deleteBlogSchema), deleteBlogHandler);

export default router;