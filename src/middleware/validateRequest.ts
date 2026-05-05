import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

// Zod ile gelen veriyi doğrula
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: "Geçersiz veri",
        details: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
}

// Validasyon şemaları
export const createContactSchema = z.object({
  fullName: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir email girin"),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});

export const updateContactSchema = z.object({
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});