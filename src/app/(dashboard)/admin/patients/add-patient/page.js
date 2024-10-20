// "use client";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { Check, ChevronRight } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { createPatient } from "@/server/actions/patients/create-patient";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { toast } from "sonner";
// import { fetchDoctors } from "@/server/actions/doctors/fetch-doctors";
// import { patientSchema } from "@/lib/inputValidation";
// import ChildrenWrapper from "@/components/other/ChildrenWrapper";

// const steps = [
//   "General Details",
//   "Health Background",
//   "Current Health Status",
//   "Medication & Allergies",
//   "Lifestyle Factors",
//   "Family Health History",
// ];

// export default function AddPatient() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const session = useSession();
//   const { data: user } = session;
//   const id = user?.user?.hospitalId;
//   const [doctors, setDoctors] = useState([]);
//   const form = useForm({
//     resolver: zodResolver(patientSchema),
//     defaultValues: {
//       generalDetails: {
//         firstName: "",
//         lastName: "",
//         email: "",
//         dob: "",
//         gender: "",
//         weight: "",
//         height: "",
//       },
//       healthBackground: {
//         allergies: "",
//         noKnownHistory: false,
//       },
//       currentHealthStatus: {
//         symptoms: "",
//         symptomIntensity: 5,
//         symptomDuration: "",
//         doctorAssigned: "",
//       },
//       medicationAllergies: {
//         medications: "",
//         currentAllergies: "",
//       },
//       lifestyleFactors: {
//         smoking: "no",
//         alcohol: "no",
//         diet: "",
//         exerciseFrequency: 3,
//         sleepHours: "",
//       },
//       familyHealthHistory: {
//         familyConditions: "",
//         noKnownFamilyHistory: false,
//       },
//     },
//   });
//   useEffect(() => {
//     const fetchDoctorsData = async () => {
//       const res = await fetchDoctors({ hospitalId: id });
//       setDoctors(res.data);
//     };
//     fetchDoctorsData();
//   }, [id]);

//   const noKnownHistory = form.watch("healthBackground.noKnownHistory");
//   const noKnownFamilyHistory = form.watch(
//     "familyHealthHistory.noKnownFamilyHistory"
//   );

//   useEffect(() => {
//     if (noKnownHistory) {
//       form.setValue("healthBackground.medicalConditions", "");
//       form.setValue("healthBackground.previousSurgeries", "");
//       form.setValue("healthBackground.ongoingTreatments", "");
//     }
//   }, [noKnownHistory, form]);

//   useEffect(() => {
//     if (noKnownFamilyHistory) {
//       form.setValue("familyHealthHistory.familyConditions", "");
//     }
//   }, [noKnownFamilyHistory, form]);

//   const onSubmit = async (data) => {
//     try {
//       await createPatient({
//         formData: data,
//         hospitalId: id,
//       });
//       toast.success("Patient added successfully");
//       form.reset();
//       // window.location.href = "/admin/patients";
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("Error submitting form");
//     }
//   };

//   const validateStep = async () => {
//     const stepValidationMap = [
//       "generalDetails",
//       "healthBackground",
//       "currentHealthStatus",
//       "medicationAllergies",
//       "lifestyleFactors",
//       "familyHealthHistory",
//     ];
//     return await form.trigger(stepValidationMap[currentStep]);
//   };

//   const handleNext = async () => {
//     const isValid = await validateStep();
//     if (isValid) {
//       if (currentStep < steps.length - 1) {
//         setCurrentStep(currentStep + 1);
//       } else {
//         await form.handleSubmit(onSubmit)();
//       }
//     } else {
//       toast.error("Please fill out the required fields");
//     }
//   };

//   const generalDetailsFields = [
//     {
//       name: "firstName",
//       label: "First Name",
//       type: "text",
//       placeholder: "Enter patient's first name",
//     },
//     {
//       name: "lastName",
//       label: "Last Name",
//       type: "text",
//       placeholder: "Enter patient's last name",
//     },
//     {
//       name: "email",
//       label: "Email",
//       type: "email",
//       placeholder: "Enter patient's email",
//     },
//     { name: "dob", label: "Date of Birth", type: "date" },
//     {
//       name: "gender",
//       label: "Gender",
//       type: "select",
//       options: [
//         { value: "male", label: "Male" },
//         { value: "female", label: "Female" },
//         { value: "other", label: "Other" },
//       ],
//     },
//     {
//       name: "weight",
//       label: "Weight (kg)",
//       type: "number",
//       placeholder: "Enter patient's weight",
//     },
//     {
//       name: "height",
//       label: "Height (cm)",
//       type: "number",
//       placeholder: "Enter patient's height",
//     },
//   ];
//   const healthBackgroundFields = [
//     {
//       name: "medicalConditions",
//       label: "Medical Conditions",
//       type: "select",
//       options: [
//         { value: "diabetes", label: "Diabetes" },
//         { value: "hypertension", label: "Hypertension" },
//         { value: "asthma", label: "Asthma" },
//         { value: "other", label: "Other" },
//       ],
//     },
//     {
//       name: "previousSurgeries",
//       label: "Previous Surgeries",
//       type: "textarea",
//       placeholder: "List any previous surgeries with dates",
//     },
//     {
//       name: "ongoingTreatments",
//       label: "Ongoing Treatments or Therapies",
//       type: "textarea",
//       placeholder: "List any ongoing treatments or therapies",
//     },
//     {
//       name: "noKnownHistory",
//       label: "No known medical history",
//       type: "checkbox",
//     },
//   ];
//   const currentHealthStatusFields = [
//     {
//       name: "symptoms",
//       label: "Symptoms",
//       type: "text",
//       placeholder: "List any symptoms you are experiencing",
//     },
//     {
//       name: "symptomIntensity",
//       label: "Symptom Intensity",
//       type: "slider",
//       min: 0,
//       max: 10,
//       step: 1,
//     },
//     {
//       name: "symptomDuration",
//       label: "Symptom Duration",
//       type: "text",
//       placeholder: "e.g., 2 days, 1 week",
//     },
//     {
//       name: "doctorAssigned",
//       label: "Doctor Assigned",
//       type: "select",
//       options: doctors.map((doctor) => ({
//         value: doctor.id,
//         label: doctor.name,
//       })),
//     },
//   ];
//   const medicationAllergiesFields = [
//     {
//       name: "medications",
//       label: "Current Medications",
//       type: "textarea",
//       placeholder: "List current medications and dosages",
//     },
//     {
//       name: "currentAllergies",
//       label: "Allergies",
//       type: "textarea",
//       placeholder: "List any allergies",
//     },
//   ];
//   const lifestyleFactorsFields = [
//     {
//       name: "smoking",
//       label: "Smoking",
//       type: "radio",
//       options: [
//         { value: true, label: "Yes" },
//         { value: false, label: "No" },
//       ],
//     },
//     {
//       name: "alcohol",
//       label: "Alcohol Consumption",
//       type: "radio",
//       options: [
//         { value: true, label: "Yes" },
//         { value: false, label: "No" },
//       ],
//     },
//     {
//       name: "diet",
//       label: "Diet Type",
//       type: "select",
//       options: [
//         { value: "vegetarian", label: "Vegetarian" },
//         { value: "vegan", label: "Vegan" },
//         { value: "non-vegetarian", label: "Non-Vegetarian" },
//         { value: "other", label: "Other" },
//       ],
//     },
//     {
//       name: "exerciseFrequency",
//       label: "Exercise Frequency (days per week)",
//       type: "slider",
//       min: 0,
//       max: 7,
//       step: 1,
//     },
//     { name: "sleepHours", label: "Sleep (hours per night)", type: "number" },
//   ];
//   const familyHealthHistoryFields = [
//     {
//       name: "familyConditions",
//       label: "Family Health Conditions",
//       type: "textarea",
//       placeholder: "List any known family health conditions and the relation",
//     },
//     {
//       name: "noKnownFamilyHistory",
//       label: "No known family history",
//       type: "checkbox",
//     },
//   ];

//   const renderFormFields = (fields, section) => {
//     return fields.map((field) => (
//       <FormField
//         key={field.name}
//         control={form.control}
//         name={`${section}.${field.name}`}
//         render={({ field: formField }) => (
//           <FormItem>
//             <FormLabel>{field.label}</FormLabel>
//             <FormControl>
//               {field.type === "text" ||
//               field.type === "email" ||
//               field.type === "date" ||
//               field.type === "number" ? (
//                 <Input
//                   type={field.type}
//                   placeholder={field.placeholder}
//                   {...formField}
//                   disabled={
//                     (section === "healthBackground" &&
//                       noKnownHistory &&
//                       field.name !== "noKnownHistory") ||
//                     (section === "familyHealthHistory" &&
//                       noKnownFamilyHistory &&
//                       field.name !== "noKnownFamilyHistory")
//                   }
//                 />
//               ) : field.type === "select" ? (
//                 <Select
//                   onValueChange={formField.onChange}
//                   value={formField.value}
//                   disabled={
//                     (section === "healthBackground" &&
//                       noKnownHistory &&
//                       field.name !== "noKnownHistory") ||
//                     (section === "familyHealthHistory" &&
//                       noKnownFamilyHistory &&
//                       field.name !== "noKnownFamilyHistory")
//                   }
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue
//                         placeholder={`Select ${field.label.toLowerCase()}`}
//                       />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {field.options.map((option) => (
//                       <SelectItem key={option.value} value={option.value}>
//                         {option.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               ) : field.type === "textarea" ? (
//                 <Textarea
//                   placeholder={field.placeholder}
//                   {...formField}
//                   disabled={
//                     (section === "healthBackground" &&
//                       noKnownHistory &&
//                       field.name !== "noKnownHistory") ||
//                     (section === "familyHealthHistory" &&
//                       noKnownFamilyHistory &&
//                       field.name !== "noKnownFamilyHistory")
//                   }
//                 />
//               ) : field.type === "checkbox" ? (
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     checked={formField.value}
//                     onCheckedChange={formField.onChange}
//                   />
//                   <span>{field.label}</span>
//                 </div>
//               ) : field.type === "radio" ? (
//                 <RadioGroup
//                   onValueChange={formField.onChange}
//                   value={formField.value}
//                   className="flex flex-col space-y-1"
//                 >
//                   {field.options.map((option) => (
//                     <FormItem
//                       key={option.value}
//                       className="flex items-center space-x-3 space-y-0"
//                     >
//                       <FormControl>
//                         <RadioGroupItem value={option.value} />
//                       </FormControl>
//                       <FormLabel className="font-normal">
//                         {option.label}
//                       </FormLabel>
//                     </FormItem>
//                   ))}
//                 </RadioGroup>
//               ) : field.type === "slider" ? (
//                 <Slider
//                   min={field.min}
//                   max={field.max}
//                   step={field.step}
//                   value={[formField.value]}
//                   onValueChange={(value) => formField.onChange(value[0])}
//                 />
//               ) : null}
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ));
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">General Details</h2>
//             <div className="grid grid-cols-2 gap-4">
//               {renderFormFields(generalDetailsFields, "generalDetails")}
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Health Background</h2>
//             {renderFormFields(healthBackgroundFields, "healthBackground")}
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Current Health Status</h2>
//             {renderFormFields(currentHealthStatusFields, "currentHealthStatus")}
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Medication & Allergies</h2>

//             {renderFormFields(medicationAllergiesFields, "medicationAllergies")}
//           </div>
//         );
//       case 4:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Lifestyle Factors</h2>
//             {renderFormFields(lifestyleFactorsFields, "lifestyleFactors")}
//           </div>
//         );
//       case 5:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Family Health History</h2>
//             {renderFormFields(familyHealthHistoryFields, "familyHealthHistory")}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <ChildrenWrapper>
//       <Tabs defaultValue="add-patient" className="w-full">
//         <TabsList>
//           <TabsTrigger value="add-patient">Add Patient</TabsTrigger>
//           <TabsTrigger value="add-patient-bulk">Bulk Add</TabsTrigger>
//         </TabsList>
//         <TabsContent value="add-patient">
//           <div className="p-4 bg-background rounded-md">
//             <h1 className="text-3xl font-bold mb-6">Add Patient</h1>
//             <div className="mb-8">
//               <div className="flex justify-between">
//                 {steps.map((step, index) => (
//                   <div key={index} className="flex flex-col items-center">
//                     <div
//                       className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                         index <= currentStep
//                           ? "bg-primary text-primary-foreground"
//                           : "bg-muted text-muted-foreground"
//                       }`}
//                     >
//                       {index < currentStep ? (
//                         <Check className="w-5 h-5" />
//                       ) : (
//                         index + 1
//                       )}
//                     </div>
//                     <span className="text-sm mt-2">{step}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="h-2 bg-muted mt-4 rounded-full">
//                 <div
//                   className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
//                   style={{
//                     width: `${((currentStep + 1) / steps.length) * 100}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)}>
//                 {renderStep()}
//                 <div className="mt-8 flex justify-between">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
//                     disabled={currentStep === 0}
//                   >
//                     Previous
//                   </Button>
//                   <Button type="button" onClick={handleNext}>
//                     {currentStep === steps.length - 1 ? "Submit" : "Next"}
//                     {currentStep !== steps.length - 1 && (
//                       <ChevronRight className="ml-2 h-4 w-4" />
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </TabsContent>
//         <TabsContent value="add-patient-bulk">
//           <div>
//             <h1>Bulk Add Patients</h1>
//             {/* Implement bulk add functionality here */}
//           </div>
//         </TabsContent>
//       </Tabs>
//     </ChildrenWrapper>
//   );
// }

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
import { Check, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { createPatient } from "@/server/actions/patients/create-patient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import ChildrenWrapper from "@/components/other/ChildrenWrapper";

const steps = [
  "General Details",
  "Health Background",
  "Current Health Status",
  "Family Health History",
];

export default function AddPatient() {
  const [currentStep, setCurrentStep] = useState(0);
  const session = useSession();
  const { data: user } = session;
  const id = user?.user?.hospitalId;
  const [doctors, setDoctors] = useState([]);
  const form = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      generalDetails: {
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        gender: "",
        weight: "",
        height: "",
      },
      healthBackground: {
        medicalConditions: "",
        previousSurgeries: "",
        ongoingTreatments: "",
        medications: "",
        allergies: "",
        noKnownHistory: false,
      },
      currentHealthStatus: {
        symptoms: [],
        symptomIntensity: 5,
        symptomDuration: "",
        doctorAssigned: "",
        smoking: "NEVER",
        alcohol: "NONE",
        diet: "REGULAR",
        exerciseFrequency: "MODERATE",
        sleepHours: 8,
      },
      familyHealthHistory: {
        familyConditions: "",
        noKnownFamilyHistory: false,
      },
    },
  });

  useEffect(() => {
    const fetchDoctorsData = async () => {
      const res = await fetchDoctors({ hospitalId: id });
      setDoctors(res.data);
    };
    fetchDoctorsData();
  }, [id]);

  const noKnownHistory = form.watch("healthBackground.noKnownHistory");
  const noKnownFamilyHistory = form.watch(
    "familyHealthHistory.noKnownFamilyHistory"
  );

  useEffect(() => {
    if (noKnownHistory) {
      form.setValue("healthBackground.medicalConditions", "");
      form.setValue("healthBackground.previousSurgeries", "");
      form.setValue("healthBackground.ongoingTreatments", "");
      form.setValue("healthBackground.medications", "");
      form.setValue("healthBackground.allergies", "");
    }
  }, [noKnownHistory, form]);

  useEffect(() => {
    if (noKnownFamilyHistory) {
      form.setValue("familyHealthHistory.familyConditions", "");
    }
  }, [noKnownFamilyHistory, form]);

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    try {
      await createPatient({
        formData: data,
        hospitalId: id,
      });
      toast.success("Patient added successfully");
      form.reset();
      window.location.href = "/admin/patients";
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
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
        setCurrentStep(currentStep + 1);
      } else {
        await form.handleSubmit(onSubmit)();
      }
    } else {
      toast.error("Please fill out the required fields");
    }
  };

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
      options: doctors?.map((doctor) => ({
        value: doctor.id,
        label: doctor.name,
      })),
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
              {field.type === "text" ||
              field.type === "email" ||
              field.type === "date" ||
              field.type === "number" ? (
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...formField}
                  disabled={
                    (section === "healthBackground" &&
                      noKnownHistory &&
                      field.name !== "noKnownHistory") ||
                    (section === "familyHealthHistory" &&
                      noKnownFamilyHistory &&
                      field.name !== "noKnownFamilyHistory")
                  }
                />
              ) : field.type === "select" ? (
                <Select
                  onValueChange={formField.onChange}
                  value={formField.value}
                  disabled={
                    (section === "healthBackground" &&
                      noKnownHistory &&
                      field.name !== "noKnownHistory") ||
                    (section === "familyHealthHistory" &&
                      noKnownFamilyHistory &&
                      field.name !== "noKnownFamilyHistory")
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={`Select ${field.label.toLowerCase()}`}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "textarea" ? (
                <Textarea
                  placeholder={field.placeholder}
                  {...formField}
                  disabled={
                    (section === "healthBackground" &&
                      noKnownHistory &&
                      field.name !== "noKnownHistory") ||
                    (section === "familyHealthHistory" &&
                      noKnownFamilyHistory &&
                      field.name !== "noKnownFamilyHistory")
                  }
                />
              ) : field.type === "checkbox" ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                  <span>{field.label}</span>
                </div>
              ) : field.type === "slider" ? (
                <Slider
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={[formField.value]}
                  onValueChange={(value) => formField.onChange(value[0])}
                />
              ) : null}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">General Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {renderFormFields(generalDetailsFields, "generalDetails")}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Health Background</h2>
            {renderFormFields(healthBackgroundFields, "healthBackground")}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Current Health Status</h2>
            {renderFormFields(currentHealthStatusFields, "currentHealthStatus")}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Family Health History</h2>
            {renderFormFields(familyHealthHistoryFields, "familyHealthHistory")}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ChildrenWrapper>
      <Tabs defaultValue="add-patient" className="w-full">
        <TabsList>
          <TabsTrigger value="add-patient">Add Patient</TabsTrigger>
          <TabsTrigger value="add-patient-bulk">Bulk Add</TabsTrigger>
        </TabsList>
        <TabsContent value="add-patient">
          <div className="p-4 bg-background rounded-md">
            <h1 className="text-3xl font-bold mb-6">Add Patient</h1>
            <div className="mb-8">
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex  items-center justify-center ${
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
                    <span className="text-sm mt-2">{step}</span>
                  </div>
                ))}
              </div>
              <div className="h-2 bg-muted mt-4 rounded-full">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
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
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={
                      currentStep === steps.length - 1
                        ? form.handleSubmit(onSubmit)
                        : handleNext
                    }
                  >
                    {currentStep === steps.length - 1 ? "Submit" : "Next"}
                    {currentStep !== steps.length - 1 && (
                      <ChevronRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </TabsContent>
        <TabsContent value="add-patient-bulk">
          <div>
            <h1>Bulk Add Patients</h1>
            {/* Implement bulk add functionality here */}
          </div>
        </TabsContent>
      </Tabs>
    </ChildrenWrapper>
  );
}
