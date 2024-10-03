import { z } from "zod";

const doctorSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  specialty: z
    .string()
    .min(2, { message: "Specialty must be at least 2 characters." }),
  contact: z
    .string()
    .length(10, { message: "Contact number must be exactly 10 digits." })
    .regex(/^\d+$/, { message: "Contact number must contain only digits." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const patientSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number should be at least 10 digits"),
  age: z.string().nonempty("Age is required"),
  weight: z.string().nonempty("Weight is required"),
  height: z.string().nonempty("Height is required"),
  bloodType: z.string().nonempty("Blood type is required"),
  gender: z.enum(["Male", "Female"], "Please select a gender"),
  assignedDoctor: z.string().nonempty("Assigned doctor is required"),
});

const EditPatientSchema = z.object({
  name: z.string().nonempty("Name is required"),
  age: z.preprocess(
    (value) => Number(value),
    z
      .number()
      .min(0, "Age must be a positive number")
      .max(120, "Age is not valid")
  ),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  assignedDoctor: z.string().nonempty("Doctor selection is required"),
});

const userSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export { patientSchema, EditPatientSchema, doctorSchema, userSchema };
