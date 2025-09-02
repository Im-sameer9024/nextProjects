import { z } from "zod";

export const addProductSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  title: z.string().min(1, "Product name is required"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters long"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(1, "Price must be a positive number"),
});

export const addCategorySchema = z.object({
  image: z.instanceof(File),
  title: z.string().min(6, "category name must be 6 characters long"),
  catSlug: z.string().min(6, "category slug must be 6 characters long"),
});
