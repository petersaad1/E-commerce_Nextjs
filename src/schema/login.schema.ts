import z from "zod";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})
export type LoginType = z.infer<typeof loginSchema>;
export default loginSchema;