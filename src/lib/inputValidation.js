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
  generalDetails: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    dob: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Gender is required"),
    weight: z.string().min(1, "Weight is required"),
    height: z.string().min(1, "Height is required"),
  }),
  healthBackground: z.object({
    medicalConditions: z.string().optional(),
    previousSurgeries: z.string().optional(),
    ongoingTreatments: z.string().optional(),
    noKnownHistory: z.boolean().optional(),
  }),
  currentHealthStatus: z.object({
    symptoms: z.string().min(1, "Symptom is required"),
    symptomIntensity: z.number().min(0).max(10),
    symptomDuration: z.string().min(1, "Symptom duration is required"),
    additionalComments: z.string().optional(),
    doctorAssigned: z.string().min(1, "Doctor assignment is required"),
  }),
  medicationAllergies: z.object({
    medications: z.string().optional(),
    foodAllergies: z.boolean().optional(),
    medicationAllergies: z.boolean().optional(),
    environmentalAllergies: z.boolean().optional(),
    otherAllergies: z.string().optional(),
  }),
  lifestyleFactors: z.object({
    smoking: z.enum(["yes", "no"]),
    alcohol: z.enum(["yes", "no"]),
    diet: z.string().min(1, "Diet type is required"),
    exerciseFrequency: z.number().min(0).max(7),
    sleepHours: z.string().min(1, "Sleep hours are required"),
  }),
  familyHealthHistory: z.object({
    familyConditions: z.string().optional(),
    noKnownFamilyHistory: z.boolean().optional(),
  }),
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

const UserPasswordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one letter, one number, and one special character"
    )
    .max(50, "Password must be at most 50 characters"),

  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one letter, one number, and one special character"
    )
    .max(50, "Password must be at most 50 characters"),
});

const userSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export {
  patientSchema,
  EditPatientSchema,
  doctorSchema,
  userSchema,
  UserPasswordSchema,
};
