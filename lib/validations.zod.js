import { z } from "zod";

export const zodSchema = z.object({
  name: z.string().min(2, "Client name is required"),
  email: z.string().email("Invalid email address"),
  plan: z.string().min(1, "Please select a plan"),
  website: z
    .string()
    .url("Enter a valid website URL")
    .optional()
    .or(z.literal("")),
  logo: z.string().url("Enter a valid image URL").optional().or(z.literal("")),
  aiStatus: z.enum(["Active", "Inactive"], {
    required_error: "Please select AI Status",
  }),

  notes: z.string().max(500, "Notes can't exceed 500 characters").optional(),
});
