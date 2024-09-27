import { z } from "zod";

const patientSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number should be at least 10 digits"),
  age: z.string().nonempty("Age is required"),
  gender: z.enum(["Male", "Female"], "Please select a gender"),
  assignedDoctor: z.string().nonempty("Assigned doctor is required"),
});

export { patientSchema };
