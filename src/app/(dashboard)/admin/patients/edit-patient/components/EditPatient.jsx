"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { updatePatient } from "@/server/actions/patients/update-patient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { fetchDoctors } from "@/server/actions/doctors/fetch-doctors";
import { patientSchema } from "@/lib/inputValidation";
import * as res from "framer-motion/m";

const steps = [
  "General Details",
  "Health Background",
  "Current Health Status",
  "Family Health History",
];

export default function EditPatient({ patient = {} }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { data: session } = useSession();
  const hospitalId = session?.user?.hospitalId;
  const [doctors, setDoctors] = useState([]);

  const form = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      generalDetails: {
        firstName: patient.firstName || "",
        lastName: patient.lastName || "",
        email: patient.email || "",
        dob: formatDateToISO(patient.dateOfBirth) || "",
        gender: patient.gender || "",
        weight: String(patient.weight) || "",
        height: String(patient.height) || "",
      },
      healthBackground: {
        medicalConditions: patient.medicalHistory?.medicalConditions || "",
        previousSurgeries: patient.medicalHistory?.previousSurgeries || "",
        ongoingTreatments: patient.medicalHistory?.ongoingTreatments || "",
        medications: patient.medications || "",
        allergies: patient.medicalHistory?.allergies || "",
        noKnownHistory: patient.medicalHistory?.noKnownHistory || false,
      },
      currentHealthStatus: {
        symptoms: patient.currentHealthStatus?.symptoms || "",
        symptomIntensity: patient.currentHealthStatus?.symptomIntensity || 0,
        symptomDuration: patient.currentHealthStatus?.symptomDuration || "",
        doctorAssigned: patient.currentHealthStatus?.doctorAssigned || "",
        smoking: patient.currentHealthStatus?.smoking || "",
        alcohol: patient.currentHealthStatus?.alcohol || "",
        diet: patient.currentHealthStatus?.diet || "",
        exerciseFrequency: patient.currentHealthStatus?.exerciseFrequency || "",
        sleepHours: patient.currentHealthStatus?.sleepHours || "",
      },
      familyHealthHistory: {
        familyConditions: patient.familyHealthHistory?.familyConditions || "",
        noKnownFamilyHistory:
          patient.familyHealthHistory?.noKnownFamilyHistory || false,
      },
    },
  });

  useEffect(() => {
    const fetchDoctorsData = async () => {
      if (hospitalId) {
        const res = await fetchDoctors({ hospitalId });
        setDoctors(res.data);
      }
      console.log(res.data);
    };
    fetchDoctorsData();
  }, [hospitalId]);

  const noKnownHistory = form.watch("healthBackground.noKnownHistory");
  const noKnownFamilyHistory = form.watch(
    "familyHealthHistory.noKnownFamilyHistory"
  );

  useEffect(() => {
    if (noKnownHistory) {
      const fields = [
        "medicalConditions",
        "previousSurgeries",
        "ongoingTreatments",
        "medications",
        "allergies",
      ];
      fields.forEach((field) => form.setValue(`healthBackground.${field}`, ""));
    }
  }, [noKnownHistory, form]);

  useEffect(() => {
    if (noKnownFamilyHistory) {
      form.setValue("familyHealthHistory.familyConditions", "");
    }
  }, [noKnownFamilyHistory, form]);

  const onSubmit = async (data) => {
    try {
      const res = await updatePatient({
        patientId: patient.id,
        formData: data,
        hospitalId,
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success("Patient updated successfully");
      // Redirect or update UI as needed
    } catch (error) {
      console.error("Error updating patient:", error);
      toast.error("Error updating patient");
    }
  };

  const validateStep = async () => {
    const stepValidationMap = [
      "generalDetails",
      "healthBackground",
      "currentHealthStatus",
      "familyHealthHistory",
    ];
    return await form.trigger(stepValidationMap[currentStep]);
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        await form.handleSubmit(onSubmit)();
      }
    } else {
      toast.error("Please fill out all required fields");
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const renderFormFields = (fields, section) => {
    return fields.map((field) => (
      <FormField
        key={field.name}
        control={form.control}
        name={`${section}.${field.name}`}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              {renderFormControl(field, formField, section)}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  const renderFormControl = (field, formField, section) => {
    const isDisabled =
      (section === "healthBackground" &&
        noKnownHistory &&
        field.name !== "noKnownHistory") ||
      (section === "familyHealthHistory" &&
        noKnownFamilyHistory &&
        field.name !== "noKnownFamilyHistory") ||
      (field.name === "email" && section === "generalDetails");

    switch (field.type) {
      case "text":
      case "email":
      case "date":
      case "number":
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            {...formField}
            disabled={isDisabled}
          />
        );
      case "select":
        return (
          <Select
            onValueChange={formField.onChange}
            value={formField.value}
            disabled={isDisabled}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={`Select ${field.label.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            {...formField}
            disabled={isDisabled}
          />
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formField.value}
              onCheckedChange={formField.onChange}
            />
            <span>{field.label}</span>
          </div>
        );
      case "slider":
        return (
          <Slider
            min={field.min}
            max={field.max}
            step={field.step}
            value={[formField.value]}
            onValueChange={(value) => formField.onChange(value[0])}
          />
        );
      default:
        return null;
    }
  };

  const renderStep = () => {
    const stepContent = [
      {
        title: "General Details",
        fields: generalDetailsFields,
        section: "generalDetails",
      },
      {
        title: "Health Background",
        fields: healthBackgroundFields,
        section: "healthBackground",
      },
      {
        title: "Current Health Status",
        fields: currentHealthStatusFields,
        section: "currentHealthStatus",
      },
      {
        title: "Family Health History",
        fields: familyHealthHistoryFields,
        section: "familyHealthHistory",
      },
    ];

    const { title, fields, section } = stepContent[currentStep];

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderFormFields(fields, section)}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-background rounded-md">
      <h1 className="text-3xl font-bold mb-6">Edit Patient</h1>
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-sm mt-2 hidden md:inline">{step}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-muted mt-4 rounded-full">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {renderStep()}
          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button type="button" onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Update" : "Next"}
              {currentStep !== steps.length - 1 && (
                <ChevronRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

const generalDetailsFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter patient's first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter patient's last name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter patient's email",
  },
  { name: "dob", label: "Date of Birth", type: "date" },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { value: "MALE", label: "Male" },
      { value: "FEMALE", label: "Female" },
      { value: "OTHER", label: "Other" },
    ],
  },
  {
    name: "weight",
    label: "Weight (kg)",
    type: "number",
    placeholder: "Enter patient's weight",
  },
  {
    name: "height",
    label: "Height (cm)",
    type: "number",
    placeholder: "Enter patient's height",
  },
];

const healthBackgroundFields = [
  {
    name: "medicalConditions",
    label: "Medical Conditions",
    type: "textarea",
    placeholder: "List any medical conditions",
  },
  {
    name: "previousSurgeries",
    label: "Previous Surgeries",
    type: "textarea",
    placeholder: "List any previous surgeries with dates",
  },
  {
    name: "ongoingTreatments",
    label: "Ongoing Treatments or Therapies",
    type: "textarea",
    placeholder: "List any ongoing treatments or therapies",
  },
  {
    name: "medications",
    label: "Current Medications",
    type: "textarea",
    placeholder: "List current medications and dosages",
  },
  {
    name: "allergies",
    label: "Allergies",
    type: "textarea",
    placeholder: "List any allergies",
  },
  {
    name: "noKnownHistory",
    label: "No known medical history",
    type: "checkbox",
  },
];

const currentHealthStatusFields = [
  {
    name: "symptoms",
    label: "Symptoms",
    type: "text",
    placeholder: "List any symptoms you are experiencing",
  },
  {
    name: "symptomIntensity",
    label: "Symptom Intensity",
    type: "slider",
    min: 0,
    max: 10,
    step: 1,
  },
  {
    name: "symptomDuration",
    label: "Symptom Duration",
    type: "text",
    placeholder: "e.g., 2 days, 1 week",
  },
  {
    name: "doctorAssigned",
    label: "Doctor Assigned",
    type: "select",
    options: [], // This will be populated dynamically
  },
  {
    name: "smoking",
    label: "Smoking Status",
    type: "select",
    options: [
      { value: "NEVER", label: "Never" },
      { value: "FORMER", label: "Former" },
      { value: "CURRENT", label: "Current" },
    ],
  },
  {
    name: "alcohol",
    label: "Alcohol Consumption",
    type: "select",
    options: [
      { value: "NONE", label: "None" },
      { value: "OCCASIONAL", label: "Occasional" },
      { value: "MODERATE", label: "Moderate" },
      { value: "HEAVY", label: "Heavy" },
    ],
  },
  {
    name: "diet",
    label: "Diet Type",
    type: "select",
    options: [
      { value: "REGULAR", label: "Regular" },
      { value: "VEGETARIAN", label: "Vegetarian" },
      { value: "VEGAN", label: "Vegan" },
      { value: "KETO", label: "Keto" },
      { value: "PALEO", label: "Paleo" },
      { value: "OTHER", label: "Other" },
    ],
  },
  {
    name: "exerciseFrequency",
    label: "Exercise Frequency",
    type: "select",
    options: [
      { value: "SEDENTARY", label: "Sedentary" },
      { value: "LIGHT", label: "Light" },
      { value: "MODERATE", label: "Moderate" },
      { value: "ACTIVE", label: "Active" },
      { value: "VERY_ACTIVE", label: "Very Active" },
    ],
  },
  {
    name: "sleepHours",
    label: "Sleep (hours per night)",
    type: "number",
    min: 0,
    max: 24,
  },
];

const familyHealthHistoryFields = [
  {
    name: "familyConditions",
    label: "Family Health Conditions",
    type: "textarea",
    placeholder: "List any known family health conditions and the relation",
  },
  {
    name: "noKnownFamilyHistory",
    label: "No known family history",
    type: "checkbox",
  },
];

function formatDateToISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
