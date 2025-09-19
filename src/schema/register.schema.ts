import z from "zod";

const registerSchema = z.object({
  name: z.string()
    .min(4, "Name must be at least 4 characters long")
    .max(20, "Name must be at most 20 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  rePassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid phone number, must be 11 digits"),
}).refine(
  (data) => data.password === data.rePassword,
  {
    path: ["rePassword"],
    message: "Password and Confirm Password must match",
  }
);
export type RegisterType = z.infer<typeof registerSchema>;
export default registerSchema;