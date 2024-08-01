import { UserRole } from "@prisma/client";
import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const READABILITY_VALUES = [
  "High School",
  "University",
  "Doctorate",
  "Journalist",
  "Marketing",
] as const;

export const PURPOSE_VALUES = [
  "General Writing",
  "Essay",
  "Article",
  "Marketing Material",
  "Story",
  "Cover Letter",
  "Report",
  "Business Material",
  "Legal Material",
] as const;

export const STRENGTH_VALUES = ["Quality", "Balanced", "More Human"] as const;

export const HumanizeTextFormSchema = z.object({
  content: z.string().min(50, {
    message: "Please enter at least 50 characters",
  }),
  readability: z.enum(READABILITY_VALUES),
  purpose: z.enum(PURPOSE_VALUES),
  strength: z.enum(STRENGTH_VALUES),
  predecessorId: z.string().optional(),
});

export const TestLoginFormSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const FetchDocumentSchema = z.object({
  id: z.string(),
});

export const ListDocumentSchema = z.object({
  page: z.number(),
});

export const DetectSingleSchema = z.object({
  content: z.string().min(50, {
    message: "Please enter at least 50 characters",
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );
