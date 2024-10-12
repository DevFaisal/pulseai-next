// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
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
// import z from "zod";

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
//   const [formData, setFormData] = useState({
//     generalDetails: {},
//     healthBackground: {},
//     currentHealthStatus: {},
//     medicationAllergies: {},
//     lifestyleFactors: {},
//     familyHealthHistory: {},
//   });

//   const generalDetailsSchema = z.object({
//     firstName: z.string(),
//     lastName: z.string(),
//     email: z.string().email(),
//     dob: z.string(),
//   });

//   const handleInputChange = (section, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value,
//       },
//     }));
//   };

//   const session = useSession();
//   const { data: user } = session;
//   const id = user.user.hospitalId;

//   const nextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = async (data) => {
//     const patient = await createPatient({
//       formData: data,
//       hospitalId: id,
//     });
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-4 ">
//             <h2 className="text-2xl font-bold">General Details</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="firstName">First Name</Label>
//                 <Input
//                   id="firstName"
//                   placeholder="Enter patient's first name"
//                   value={formData.generalDetails.firstName || ""}
//                   onChange={(e) =>
//                     handleInputChange(
//                       "generalDetails",
//                       "firstName",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <Input
//                   id="lastName"
//                   placeholder="Enter patient's last name"
//                   value={formData.generalDetails.lastName || ""}
//                   onChange={(e) =>
//                     handleInputChange(
//                       "generalDetails",
//                       "lastName",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter patient's email"
//                   value={formData.generalDetails.email || ""}
//                   onChange={(e) =>
//                     handleInputChange("generalDetails", "email", e.target.value)
//                   }
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="dob">Date of Birth</Label>
//                 <Input
//                   id="dob"
//                   type="date"
//                   value={formData.generalDetails.dob || ""}
//                   onChange={(e) =>
//                     handleInputChange("generalDetails", "dob", e.target.value)
//                   }
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="gender">Gender</Label>
//                 <Select
//                   value={formData.generalDetails.gender || ""}
//                   onValueChange={(value) =>
//                     handleInputChange("generalDetails", "gender", value)
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select gender" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="male">Male</SelectItem>
//                     <SelectItem value="female">Female</SelectItem>
//                     <SelectItem value="other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <Label htmlFor="phone">Weight</Label>
//                 <Input
//                   id="weight"
//                   type="number"
//                   placeholder="Enter patient's weight"
//                   value={formData.generalDetails.weight || ""}
//                   onChange={(e) =>
//                     handleInputChange(
//                       "generalDetails",
//                       "weight",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Health Background</h2>
//             <div>
//               <Label htmlFor="medicalConditions">Medical Conditions</Label>
//               <Select
//                 value={formData.healthBackground.medicalConditions || ""}
//                 onValueChange={(value) =>
//                   handleInputChange(
//                     "healthBackground",
//                     "medicalConditions",
//                     value
//                   )
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select condition" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="diabetes">Diabetes</SelectItem>
//                   <SelectItem value="hypertension">Hypertension</SelectItem>
//                   <SelectItem value="asthma">Asthma</SelectItem>
//                   <SelectItem value="other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label htmlFor="previousSurgeries">Previous Surgeries</Label>
//               <Textarea
//                 id="previousSurgeries"
//                 value={formData.healthBackground.previousSurgeries || ""}
//                 onChange={(e) =>
//                   handleInputChange(
//                     "healthBackground",
//                     "previousSurgeries",
//                     e.target.value
//                   )
//                 }
//                 placeholder="List any previous surgeries with dates"
//               />
//             </div>
//             <div>
//               <Label htmlFor="ongoingTreatments">
//                 Ongoing Treatments or Therapies
//               </Label>
//               <Textarea
//                 id="ongoingTreatments"
//                 value={formData.healthBackground.ongoingTreatments || ""}
//                 onChange={(e) =>
//                   handleInputChange(
//                     "healthBackground",
//                     "ongoingTreatments",
//                     e.target.value
//                   )
//                 }
//                 placeholder="List any ongoing treatments or therapies"
//               />
//             </div>
//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 id="noKnownHistory"
//                 checked={formData.healthBackground.noKnownHistory || false}
//                 onCheckedChange={(checked) =>
//                   handleInputChange(
//                     "healthBackground",
//                     "noKnownHistory",
//                     checked
//                   )
//                 }
//               />
//               <Label htmlFor="noKnownHistory">No known medical history</Label>
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Current Health Status</h2>
//             <div>
//               <Label htmlFor="symptoms">Symptoms</Label>
//               <Select
//                 value={formData.currentHealthStatus.symptoms || ""}
//                 onValueChange={(value) =>
//                   handleInputChange("currentHealthStatus", "symptoms", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select symptom" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="headache">Headache</SelectItem>
//                   <SelectItem value="fatigue">Fatigue</SelectItem>
//                   <SelectItem value="pain">Pain</SelectItem>
//                   <SelectItem value="other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Symptom Intensity</Label>
//               <Slider
//                 defaultValue={[5]}
//                 max={10}
//                 step={1}
//                 onValueChange={(value) =>
//                   handleInputChange(
//                     "currentHealthStatus",
//                     "symptomIntensity",
//                     value[0]
//                   )
//                 }
//               />
//             </div>
//             <div>
//               <Label htmlFor="symptomDuration">Symptom Duration</Label>
//               <Input
//                 id="symptomDuration"
//                 value={formData.currentHealthStatus.symptomDuration || ""}
//                 onChange={(e) =>
//                   handleInputChange(
//                     "currentHealthStatus",
//                     "symptomDuration",
//                     e.target.value
//                   )
//                 }
//                 placeholder="e.g., 2 days, 1 week"
//               />
//             </div>
//             <div>
//               <Label htmlFor="additionalComments">Additional Comments</Label>
//               <Textarea
//                 id="additionalComments"
//                 value={formData.currentHealthStatus.additionalComments || ""}
//                 onChange={(e) =>
//                   handleInputChange(
//                     "currentHealthStatus",
//                     "additionalComments",
//                     e.target.value
//                   )
//                 }
//                 placeholder="Provide any additional details about your symptoms"
//               />
//             </div>
//             <div>
//               <Label>Doctor Assigned</Label>
//               <Select
//                 value={formData.currentHealthStatus.doctorAssigned || ""}
//                 onValueChange={(value) =>
//                   handleInputChange(
//                     "currentHealthStatus",
//                     "doctorAssigned",
//                     value
//                   )
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select doctor" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Dr. John Doe">Dr. John Doe</SelectItem>
//                   <SelectItem value="Dr. Jane Doe">Dr. Jane Doe</SelectItem>
//                   <SelectItem value="Dr. James Doe">Dr. James Doe</SelectItem>
//                   <SelectItem value="Dr. Jessica Doe">
//                     Dr. Jessica Doe
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Medication & Allergies</h2>
//             <div>
//               <Label htmlFor="medications">Current Medications</Label>
//               <Textarea
//                 id="medications"
//                 value={formData.medicationAllergies.medications || ""}
//                 onChange={(e) =>
//                   handleInputChange(
//                     "medicationAllergies",
//                     "medications",
//                     e.target.value
//                   )
//                 }
//                 placeholder="List current medications and dosages"
//               />
//             </div>
//             <div>
//               <Label>Allergies</Label>
//               <div className="space-y-2">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="foodAllergies"
//                     checked={
//                       formData.medicationAllergies.foodAllergies || false
//                     }
//                     onCheckedChange={(checked) =>
//                       handleInputChange(
//                         "medicationAllergies",
//                         "foodAllergies",
//                         checked
//                       )
//                     }
//                   />
//                   <Label htmlFor="foodAllergies">Food Allergies</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="medicationAllergies"
//                     checked={
//                       formData.medicationAllergies.medicationAllergies || false
//                     }
//                     onCheckedChange={(checked) =>
//                       handleInputChange(
//                         "medicationAllergies",
//                         "medicationAllergies",
//                         checked
//                       )
//                     }
//                   />
//                   <Label htmlFor="medicationAllergies">
//                     Medication Allergies
//                   </Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="environmentalAllergies"
//                     checked={
//                       formData.medicationAllergies.environmentalAllergies ||
//                       false
//                     }
//                     onCheckedChange={(checked) =>
//                       handleInputChange(
//                         "medicationAllergies",
//                         "environmentalAllergies",
//                         checked
//                       )
//                     }
//                   />
//                   <Label htmlFor="environmentalAllergies">
//                     Environmental Allergies
//                   </Label>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="otherAllergies">Other Allergies</Label>
//               <Input
//                 id="otherAllergies"
//                 value={formData.medicationAllergies.otherAllergies || ""}
//                 onChange={(e) =>
//                   handleInputChange(
//                     "medicationAllergies",
//                     "otherAllergies",
//                     e.target.value
//                   )
//                 }
//                 placeholder="List any other allergies"
//               />
//             </div>
//           </div>
//         );
//       case 4:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Lifestyle Factors</h2>
//             <div>
//               <Label>Smoking</Label>
//               <RadioGroup
//                 value={formData.lifestyleFactors.smoking || ""}
//                 onValueChange={(value) =>
//                   handleInputChange("lifestyleFactors", "smoking", value)
//                 }
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="yes" id="smoking-yes" />
//                   <Label htmlFor="smoking-yes">Yes</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="no" id="smoking-no" />
//                   <Label htmlFor="smoking-no">No</Label>
//                 </div>
//               </RadioGroup>
//             </div>
//             <div>
//               <Label>Alcohol Consumption</Label>
//               <RadioGroup
//                 value={formData.lifestyleFactors.alcohol || ""}
//                 onValueChange={(value) =>
//                   handleInputChange("lifestyleFactors", "alcohol", value)
//                 }
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="yes" id="alcohol-yes" />
//                   <Label htmlFor="alcohol-yes">Yes</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="no" id="alcohol-no" />
//                   <Label htmlFor="alcohol-no">No</Label>
//                 </div>
//               </RadioGroup>
//             </div>
//             <div>
//               <Label htmlFor="diet">Diet Type</Label>
//               <Select
//                 value={formData.lifestyleFactors.diet || ""}
//                 onValueChange={(value) =>
//                   handleInputChange("lifestyleFactors", "diet", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select diet type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="vegetarian">Vegetarian</SelectItem>
//                   <SelectItem value="vegan">Vegan</SelectItem>
//                   <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
//                   <SelectItem value="other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Exercise Frequency (days per week)</Label>
//               <Slider
//                 defaultValue={[3]}
//                 max={7}
//                 step={1}
//                 onValueChange={(value) =>
//                   handleInputChange(
//                     "lifestyleFactors",
//                     "exerciseFrequency",
//                     value[0]
//                   )
//                 }
//               />
//             </div>
//             <div>
//               <Label htmlFor="sleepHours">Sleep (hours per night)</Label>
//               <Input
//                 id="sleepHours"
//                 type="number"
//                 value={formData.lifestyleFactors.sleepHours || ""}
//                 onChange={(e) =>
//                   handleInputChange(
//                     "lifestyleFactors",
//                     "sleepHours",
//                     e.target.value
//                   )
//                 }
//               />
//             </div>
//           </div>
//         );
//       case 5:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Family Health History</h2>
//             <div>
//               <Label htmlFor="familyConditions">Family Health Conditions</Label>
//               <Textarea
//                 id="familyConditions"
//                 value={formData.familyHealthHistory.familyConditions || ""}
//                 onChange={(e) =>
//                   handleInputChange(
//                     "familyHealthHistory",
//                     "familyConditions",
//                     e.target.value
//                   )
//                 }
//                 placeholder="List any known family health conditions and the relation"
//               />
//             </div>
//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 id="noKnownFamilyHistory"
//                 checked={
//                   formData.familyHealthHistory.noKnownFamilyHistory || false
//                 }
//                 onCheckedChange={(checked) =>
//                   handleInputChange(
//                     "familyHealthHistory",
//                     "noKnownFamilyHistory",
//                     checked
//                   )
//                 }
//               />
//               <Label htmlFor="noKnownFamilyHistory">
//                 No known family history
//               </Label>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Tabs defaultValue="add-patient" className="w-full">
//       <TabsList>
//         <TabsTrigger value="add-patient">Add Patient</TabsTrigger>
//         <TabsTrigger value="add-patient-bulk">Bulk Add</TabsTrigger>
//       </TabsList>
//       <TabsContent value="add-patient">
//         <div className="p-4 bg-background rounded-md">
//           <h1 className="text-3xl font-bold mb-6">Add Patient</h1>
//           <div className="mb-8">
//             <div className="flex justify-between">
//               {steps.map((step, index) => (
//                 <div key={index} className="flex flex-col items-center">
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                       index <= currentStep
//                         ? "bg-primary text-primary-foreground"
//                         : "bg-muted text-muted-foreground"
//                     }`}
//                   >
//                     {index < currentStep ? (
//                       <Check className="w-5 h-5" />
//                     ) : (
//                       index + 1
//                     )}
//                   </div>
//                   <span className="text-sm mt-2">{step}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="h-2 bg-muted mt-4 rounded-full">
//               <div
//                 className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
//                 style={{
//                   width: `${((currentStep + 1) / steps.length) * 100}%`,
//                 }}
//               ></div>
//             </div>
//           </div>
//           <form>
//             {renderStep()}
//             <div className="mt-8 flex justify-between">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={prevStep}
//                 disabled={currentStep === 0}
//               >
//                 Previous
//               </Button>
//               <Button
//                 type="button"
//                 onClick={
//                   currentStep === steps.length - 1
//                     ? () => handleSubmit(formData)
//                     : nextStep
//                 }
//               >
//                 {currentStep === steps.length - 1 ? "Submit" : "Next"}
//                 {currentStep !== steps.length - 1 && (
//                   <ChevronRight className="ml-2 h-4 w-4" />
//                 )}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </TabsContent>
//       <TabsContent value="add-patient-bulk">
//         <div>
//           <h1>Bulk Add Patients</h1>
//         </div>
//       </TabsContent>
//     </Tabs>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
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

// const steps = [
//   "General Details",
//   "Health Background",
//   "Current Health Status",
//   "Medication & Allergies",
//   "Lifestyle Factors",
//   "Family Health History",
// ];

// const formSchema = z.object({
//   generalDetails: z.object({
//     firstName: z.string().min(1, "First name is required"),
//     lastName: z.string().min(1, "Last name is required"),
//     email: z.string().email("Invalid email address"),
//     dob: z.string().min(1, "Date of birth is required"),
//     gender: z.string().min(1, "Gender is required"),
//     weight: z.string().min(1, "Weight is required"),
//   }),
//   healthBackground: z.object({
//     medicalConditions: z.string().min(1, "Medical condition is required"),
//     previousSurgeries: z.string().optional(),
//     ongoingTreatments: z.string().optional(),
//     noKnownHistory: z.boolean().optional(),
//   }),
//   currentHealthStatus: z.object({
//     symptoms: z.string().min(1, "Symptom is required"),
//     symptomIntensity: z.number().min(0).max(10),
//     symptomDuration: z.string().min(1, "Symptom duration is required"),
//     additionalComments: z.string().optional(),
//     doctorAssigned: z.string().min(1, "Doctor assignment is required"),
//   }),
//   medicationAllergies: z.object({
//     medications: z.string().optional(),
//     foodAllergies: z.boolean().optional(),
//     medicationAllergies: z.boolean().optional(),
//     environmentalAllergies: z.boolean().optional(),
//     otherAllergies: z.string().optional(),
//   }),
//   lifestyleFactors: z.object({
//     smoking: z.enum(["yes", "no"]),
//     alcohol: z.enum(["yes", "no"]),
//     diet: z.string().min(1, "Diet type is required"),
//     exerciseFrequency: z.number().min(0).max(7),
//     sleepHours: z.string().min(1, "Sleep hours are required"),
//   }),
//   familyHealthHistory: z.object({
//     familyConditions: z.string().optional(),
//     noKnownFamilyHistory: z.boolean().optional(),
//   }),
// });

// export default function AddPatient() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const session = useSession();
//   const { data: user } = session;
//   const id = user?.user?.hospitalId;

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       generalDetails: {
//         firstName: "",
//         lastName: "",
//         email: "",
//         dob: "",
//         gender: "",
//         weight: "",
//       },
//       healthBackground: {
//         medicalConditions: "",
//         previousSurgeries: "",
//         ongoingTreatments: "",
//         noKnownHistory: false,
//       },
//       currentHealthStatus: {
//         symptoms: "",
//         symptomIntensity: 5,
//         symptomDuration: "",
//         additionalComments: "",
//         doctorAssigned: "",
//       },
//       medicationAllergies: {
//         medications: "",
//         foodAllergies: false,
//         medicationAllergies: false,
//         environmentalAllergies: false,
//         otherAllergies: "",
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

//   const onSubmit = async (data) => {
//     console.log("Clicked");
//     console.log("Current Step", currentStep);
//     console.log("Steps", steps.length);
//     if (currentStep === steps.length) {
//       console.log(data);
//     }

//     try {
//       // const res = await createPatient({
//       //   formData: data,
//       //   hospitalId: id,
//       // });
//       // console.log(res);
//       // Handle successful submission (e.g., show success message, reset form, etc.)
//     } catch (error) {
//       // Handle error (e.g., show error message)
//       console.error("Error submitting form:", error);
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">General Details</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="generalDetails.firstName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>First Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter patient's first name"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="generalDetails.lastName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Last Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter patient's last name"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="generalDetails.email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="Enter patient's email"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="generalDetails.dob"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Date of Birth</FormLabel>
//                     <FormControl>
//                       <Input type="date" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="generalDetails.gender"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Gender</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select gender" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="male">Male</SelectItem>
//                         <SelectItem value="female">Female</SelectItem>
//                         <SelectItem value="other">Other</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="generalDetails.weight"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Weight</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         placeholder="Enter patient's weight"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Health Background</h2>
//             <FormField
//               control={form.control}
//               name="healthBackground.medicalConditions"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Medical Conditions</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select condition" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="diabetes">Diabetes</SelectItem>
//                       <SelectItem value="hypertension">Hypertension</SelectItem>
//                       <SelectItem value="asthma">Asthma</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="healthBackground.previousSurgeries"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Previous Surgeries</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="List any previous surgeries with dates"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="healthBackground.ongoingTreatments"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Ongoing Treatments or Therapies</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="List any ongoing treatments or therapies"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="healthBackground.noKnownHistory"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>No known medical history</FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Current Health Status</h2>
//             <FormField
//               control={form.control}
//               name="currentHealthStatus.symptoms"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Symptoms</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select symptom" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="headache">Headache</SelectItem>
//                       <SelectItem value="fatigue">Fatigue</SelectItem>
//                       <SelectItem value="pain">Pain</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="currentHealthStatus.symptomIntensity"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Symptom Intensity</FormLabel>
//                   <FormControl>
//                     <Slider
//                       min={0}
//                       max={10}
//                       step={1}
//                       value={[field.value]}
//                       onValueChange={(value) => field.onChange(value[0])}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="currentHealthStatus.symptomDuration"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Symptom Duration</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., 2 days, 1 week" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="currentHealthStatus.additionalComments"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Additional Comments</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Provide any additional details about your symptoms"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="currentHealthStatus.doctorAssigned"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Doctor Assigned</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select doctor" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="Dr. John Doe">Dr. John Doe</SelectItem>
//                       <SelectItem value="Dr. Jane Doe">Dr. Jane Doe</SelectItem>
//                       <SelectItem value="Dr. James Doe">
//                         Dr. James Doe
//                       </SelectItem>
//                       <SelectItem value="Dr. Jessica Doe">
//                         Dr. Jessica Doe
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Medication & Allergies</h2>
//             <FormField
//               control={form.control}
//               name="medicationAllergies.medications"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Current Medications</FormLabel>

//                   <FormControl>
//                     <Textarea
//                       placeholder="List current medications and dosages"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="medicationAllergies.foodAllergies"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>Food Allergies</FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="medicationAllergies.medicationAllergies"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>Medication Allergies</FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="medicationAllergies.environmentalAllergies"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>Environmental Allergies</FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="medicationAllergies.otherAllergies"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Other Allergies</FormLabel>
//                   <FormControl>
//                     <Input placeholder="List any other allergies" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         );
//       case 4:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Lifestyle Factors</h2>
//             <FormField
//               control={form.control}
//               name="lifestyleFactors.smoking"
//               render={({ field }) => (
//                 <FormItem className="space-y-3">
//                   <FormLabel>Smoking</FormLabel>
//                   <FormControl>
//                     <RadioGroup
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       className="flex flex-col space-y-1"
//                     >
//                       <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="yes" />
//                         </FormControl>
//                         <FormLabel className="font-normal">Yes</FormLabel>
//                       </FormItem>
//                       <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="no" />
//                         </FormControl>
//                         <FormLabel className="font-normal">No</FormLabel>
//                       </FormItem>
//                     </RadioGroup>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lifestyleFactors.alcohol"
//               render={({ field }) => (
//                 <FormItem className="space-y-3">
//                   <FormLabel>Alcohol Consumption</FormLabel>
//                   <FormControl>
//                     <RadioGroup
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       className="flex flex-col space-y-1"
//                     >
//                       <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="yes" />
//                         </FormControl>
//                         <FormLabel className="font-normal">Yes</FormLabel>
//                       </FormItem>
//                       <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="no" />
//                         </FormControl>
//                         <FormLabel className="font-normal">No</FormLabel>
//                       </FormItem>
//                     </RadioGroup>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lifestyleFactors.diet"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Diet Type</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select diet type" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="vegetarian">Vegetarian</SelectItem>
//                       <SelectItem value="vegan">Vegan</SelectItem>
//                       <SelectItem value="non-vegetarian">
//                         Non-Vegetarian
//                       </SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lifestyleFactors.exerciseFrequency"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Exercise Frequency (days per week)</FormLabel>
//                   <FormControl>
//                     <Slider
//                       min={0}
//                       max={7}
//                       step={1}
//                       value={[field.value]}
//                       onValueChange={(value) => field.onChange(value[0])}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lifestyleFactors.sleepHours"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Sleep (hours per night)</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         );
//       case 5:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Family Health History</h2>
//             <FormField
//               control={form.control}
//               name="familyHealthHistory.familyConditions"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Family Health Conditions</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="List any known family health conditions and the relation"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="familyHealthHistory.noKnownFamilyHistory"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>No known family history</FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Tabs defaultValue="add-patient" className="w-full">
//       <TabsList>
//         <TabsTrigger value="add-patient">Add Patient</TabsTrigger>
//         <TabsTrigger value="add-patient-bulk">Bulk Add</TabsTrigger>
//       </TabsList>
//       <TabsContent value="add-patient">
//         <div className="p-4 bg-background rounded-md">
//           <h1 className="text-3xl font-bold mb-6">Add Patient</h1>
//           <div className="mb-8">
//             <div className="flex justify-between">
//               {steps.map((step, index) => (
//                 <div key={index} className="flex flex-col items-center">
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                       index <= currentStep
//                         ? "bg-primary text-primary-foreground"
//                         : "bg-muted text-muted-foreground"
//                     }`}
//                   >
//                     {index < currentStep ? (
//                       <Check className="w-5 h-5" />
//                     ) : (
//                       index + 1
//                     )}
//                   </div>
//                   <span className="text-sm mt-2">{step}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="h-2 bg-muted mt-4 rounded-full">
//               <div
//                 className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
//                 style={{
//                   width: `${((currentStep + 1) / steps.length) * 100}%`,
//                 }}
//               ></div>
//             </div>
//           </div>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//               {renderStep()}
//               <div className="mt-8 flex justify-between">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
//                   disabled={currentStep === 0}
//                 >
//                   Previous
//                 </Button>
//                 <Button
//                   type=""
//                   onClick={
//                     currentStep === steps.length - 1
//                       ? () => {
//                           console.log("Clicked");
//                           form.handleSubmit(onSubmit)();
//                         }
//                       : () => {
//                           const state =
//                             form.formState.errors[
//                               toCamelCase(
//                                 renderStep().props.children[0].props.children
//                               )
//                             ];

//                           if (state === undefined) {
//                             setCurrentStep(
//                               Math.min(currentStep + 1, steps.length - 1)
//                             );
//                           }
//                         }
//                   }
//                 >
//                   {currentStep === steps.length - 1 ? "Submit" : "Next"}
//                   {currentStep !== steps.length - 1 && (
//                     <ChevronRight className="ml-2 h-4 w-4" />
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </TabsContent>
//       <TabsContent value="add-patient-bulk">
//         <div>
//           <h1>Bulk Add Patients</h1>
//           {/* Implement bulk add functionality here */}
//         </div>
//       </TabsContent>
//     </Tabs>
//   );
// }

// function toCamelCase(str) {
//   return str
//     .split(" ") // Split the string by spaces
//     .map(
//       (word, index) =>
//         index === 0
//           ? word.toLowerCase() // Lowercase the first word
//           : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the first letter of the rest
//     )
//     .join(""); // Join the words without spaces
// }

// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
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

// const steps = [
//   "General Details",
//   "Health Background",
//   "Current Health Status",
//   "Medication & Allergies",
//   "Lifestyle Factors",
//   "Family Health History",
// ];

// const formSchema = z.object({
//   generalDetails: z.object({
//     firstName: z.string().min(1, "First name is required"),
//     lastName: z.string().min(1, "Last name is required"),
//     email: z.string().email("Invalid email address"),
//     dob: z.string().min(1, "Date of birth is required"),
//     gender: z.string().min(1, "Gender is required"),
//     weight: z.string().min(1, "Weight is required"),
//   }),
//   healthBackground: z.object({
//     medicalConditions: z.string().min(1, "Medical condition is required"),
//     previousSurgeries: z.string().optional(),
//     ongoingTreatments: z.string().optional(),
//     noKnownHistory: z.boolean().optional(),
//   }),
//   currentHealthStatus: z.object({
//     symptoms: z.string().min(1, "Symptom is required"),
//     symptomIntensity: z.number().min(0).max(10),
//     symptomDuration: z.string().min(1, "Symptom duration is required"),
//     additionalComments: z.string().optional(),
//     doctorAssigned: z.string().min(1, "Doctor assignment is required"),
//   }),
//   medicationAllergies: z.object({
//     medications: z.string().optional(),
//     foodAllergies: z.boolean().optional(),
//     medicationAllergies: z.boolean().optional(),
//     environmentalAllergies: z.boolean().optional(),
//     otherAllergies: z.string().optional(),
//   }),
//   lifestyleFactors: z.object({
//     smoking: z.enum(["yes", "no"]),
//     alcohol: z.enum(["yes", "no"]),
//     diet: z.string().min(1, "Diet type is required"),
//     exerciseFrequency: z.number().min(0).max(7),
//     sleepHours: z.string().min(1, "Sleep hours are required"),
//   }),
//   familyHealthHistory: z.object({
//     familyConditions: z.string().optional(),
//     noKnownFamilyHistory: z.boolean().optional(),
//   }),
// });

// export default function AddPatient() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const session = useSession();
//   const { data: user } = session;
//   const id = user?.user?.hospitalId;

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       generalDetails: {
//         firstName: "",
//         lastName: "",
//         email: "",
//         dob: "",
//         gender: "",
//         weight: "",
//       },
//       healthBackground: {
//         medicalConditions: "",
//         previousSurgeries: "",
//         ongoingTreatments: "",
//         noKnownHistory: false,
//       },
//       currentHealthStatus: {
//         symptoms: "",
//         symptomIntensity: 5,
//         symptomDuration: "",
//         additionalComments: "",
//         doctorAssigned: "",
//       },
//       medicationAllergies: {
//         medications: "",
//         foodAllergies: false,
//         medicationAllergies: false,
//         environmentalAllergies: false,
//         otherAllergies: "",
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

//   const onSubmit = async (data) => {
//     console.log("Clicked");
//     try {
//       const res = await createPatient({
//         formData: data,
//         hospitalId: id,
//       });
//       console.log(res);
//       // Handle successful submission (e.g., show success message, reset form, etc.)
//     } catch (error) {
//       // Handle error (e.g., show error message)
//       console.error("Error submitting form:", error);
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">General Details</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="generalDetails.firstName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>First Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter patient's first name"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="generalDetails.lastName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Last Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter patient's last name"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="generalDetails.email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="Enter patient's email"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="generalDetails.dob"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Date of Birth</FormLabel>
//                     <FormControl>
//                       <Input type="date" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="generalDetails.gender"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Gender</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select gender" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="male">Male</SelectItem>
//                         <SelectItem value="female">Female</SelectItem>
//                         <SelectItem value="other">Other</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="generalDetails.weight"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Weight</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         placeholder="Enter patient's weight"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Health Background</h2>
//             <FormField
//               control={form.control}
//               name="healthBackground.medicalConditions"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Medical Conditions</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select condition" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="diabetes">Diabetes</SelectItem>
//                       <SelectItem value="hypertension">Hypertension</SelectItem>
//                       <SelectItem value="asthma">Asthma</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="healthBackground.previousSurgeries"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Previous Surgeries</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="List any previous surgeries with dates"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="healthBackground.ongoingTreatments"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Ongoing Treatments or Therapies</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="List any ongoing treatments or therapies"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="healthBackground.noKnownHistory"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>No known medical history</FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Current Health Status</h2>
//             <FormField
//               control={form.control}
//               name="currentHealthStatus.symptoms"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Symptoms</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select symptom" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="headache">Headache</SelectItem>
//                       <SelectItem value="fatigue">Fatigue</SelectItem>
//                       <SelectItem value="pain">Pain</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="currentHealthStatus.symptomIntensity"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Symptom Intensity</FormLabel>
//                   <FormControl>
//                     <Slider
//                       min={0}
//                       max={10}
//                       step={1}
//                       value={[field.value]}
//                       onValueChange={(value) => field.onChange(value[0])}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="currentHealthStatus.symptomDuration"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Symptom Duration</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., 2 days, 1 week" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="currentHealthStatus.additionalComments"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Additional Comments</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Provide any additional details about your symptoms"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="currentHealthStatus.doctorAssigned"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Doctor Assigned</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select doctor" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="Dr. John Doe">Dr. John Doe</SelectItem>
//                       <SelectItem value="Dr. Jane Doe">Dr. Jane Doe</SelectItem>
//                       <SelectItem value="Dr. James Doe">
//                         Dr. James Doe
//                       </SelectItem>
//                       <SelectItem value="Dr. Jessica Doe">
//                         Dr. Jessica Doe
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Medication & Allergies</h2>
//             <FormField
//               control={form.control}
//               name="medicationAllergies.medications"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Current Medications</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="List current medications and dosages"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="medicationAllergies.foodAllergies"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>Food Allergies</FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="medicationAllergies.medicationAllergies"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>Medication Allergies</FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="medicationAllergies.environmentalAllergies"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>Environmental Allergies</FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="medicationAllergies.otherAllergies"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Other Allergies</FormLabel>
//                   <FormControl>
//                     <Input placeholder="List any other allergies" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         );
//       case 4:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Lifestyle Factors</h2>
//             <FormField
//               control={form.control}
//               name="lifestyleFactors.smoking"
//               render={({ field }) => (
//                 <FormItem className="space-y-3">
//                   <FormLabel>Smoking</FormLabel>
//                   <FormControl>
//                     <RadioGroup
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       className="flex flex-col space-y-1"
//                     >
//                       <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="yes" />
//                         </FormControl>
//                         <FormLabel className="font-normal">Yes</FormLabel>
//                       </FormItem>
//                       <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="no" />
//                         </FormControl>
//                         <FormLabel className="font-normal">No</FormLabel>
//                       </FormItem>
//                     </RadioGroup>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lifestyleFactors.alcohol"
//               render={({ field }) => (
//                 <FormItem className="space-y-3">
//                   <FormLabel>Alcohol Consumption</FormLabel>
//                   <FormControl>
//                     <RadioGroup
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       className="flex flex-col space-y-1"
//                     >
//                       <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="yes" />
//                         </FormControl>
//                         <FormLabel className="font-normal">Yes</FormLabel>
//                       </FormItem>
//                       <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="no" />
//                         </FormControl>
//                         <FormLabel className="font-normal">No</FormLabel>
//                       </FormItem>
//                     </RadioGroup>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lifestyleFactors.diet"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Diet Type</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select diet type" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="vegetarian">Vegetarian</SelectItem>
//                       <SelectItem value="vegan">Vegan</SelectItem>
//                       <SelectItem value="non-vegetarian">
//                         Non-Vegetarian
//                       </SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lifestyleFactors.exerciseFrequency"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Exercise Frequency (days per week)</FormLabel>
//                   <FormControl>
//                     <Slider
//                       min={0}
//                       max={7}
//                       step={1}
//                       value={[field.value]}
//                       onValueChange={(value) => field.onChange(value[0])}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lifestyleFactors.sleepHours"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Sleep (hours per night)</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         );
//       case 5:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">Family Health History</h2>
//             <FormField
//               control={form.control}
//               name="familyHealthHistory.familyConditions"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Family Health Conditions</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="List any known family health conditions and the relation"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="familyHealthHistory.noKnownFamilyHistory"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>No known family history</FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Tabs defaultValue="add-patient" className="w-full">
//       <TabsList>
//         <TabsTrigger value="add-patient">Add Patient</TabsTrigger>
//         <TabsTrigger value="add-patient-bulk">Bulk Add</TabsTrigger>
//       </TabsList>
//       <TabsContent value="add-patient">
//         <div className="p-4 bg-background rounded-md">
//           <h1 className="text-3xl font-bold mb-6">Add Patient</h1>
//           <div className="mb-8">
//             <div className="flex justify-between">
//               {steps.map((step, index) => (
//                 <div key={index} className="flex flex-col items-center">
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                       index <= currentStep
//                         ? "bg-primary text-primary-foreground"
//                         : "bg-muted text-muted-foreground"
//                     }`}
//                   >
//                     {index < currentStep ? (
//                       <Check className="w-5 h-5" />
//                     ) : (
//                       index + 1
//                     )}
//                   </div>
//                   <span className="text-sm mt-2">{step}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="h-2 bg-muted mt-4 rounded-full">
//               <div
//                 className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
//                 style={{
//                   width: `${((currentStep + 1) / steps.length) * 100}%`,
//                 }}
//               ></div>
//             </div>
//           </div>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//               {renderStep()}
//               <div className="mt-8 flex justify-between">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
//                   disabled={currentStep === 0}
//                 >
//                   Previous
//                 </Button>
//                 <Button
//                   type="button"
//                   onClick={() => {
//                     if (currentStep === steps.length - 1) {
//                       form.handleSubmit(onSubmit)();
//                     } else {
//                       const currentStepName = steps[currentStep]
//                         .toLowerCase()
//                         .replace(/\s+/g, "");
//                       const isStepValid = Object.keys(
//                         form.formState.errors
//                       ).every((key) => !key.startsWith(currentStepName));
//                       if (isStepValid) {
//                         setCurrentStep(
//                           Math.min(currentStep + 1, steps.length - 1)
//                         );
//                       } else {
//                         // Trigger validation for the current step
//                         form.trigger(currentStepName);
//                       }
//                     }
//                   }}
//                 >
//                   {currentStep === steps.length - 1 ? "Submit" : "Next"}
//                   {currentStep !== steps.length - 1 && (
//                     <ChevronRight className="ml-2 h-4 w-4" />
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </TabsContent>
//       <TabsContent value="add-patient-bulk">
//         <div>
//           <h1>Bulk Add Patients</h1>
//           {/* Implement bulk add functionality here */}
//         </div>
//       </TabsContent>
//     </Tabs>
//   );
// }

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { doctorDataState } from "@/store/DoctorAtom";
import { useRecoilValue } from "recoil";

const steps = [
  "General Details",
  "Health Background",
  "Current Health Status",
  "Medication & Allergies",
  "Lifestyle Factors",
  "Family Health History",
];

const generalDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  weight: z.string().min(1, "Weight is required"),
});

const healthBackgroundSchema = z.object({
  medicalConditions: z.string().min(1, "Medical condition is required"),
  previousSurgeries: z.string().optional(),
  ongoingTreatments: z.string().optional(),
  noKnownHistory: z.boolean().optional(),
});

const currentHealthStatusSchema = z.object({
  symptoms: z.string().min(1, "Symptom is required"),
  symptomIntensity: z.number().min(0).max(10),
  symptomDuration: z.string().min(1, "Symptom duration is required"),
  additionalComments: z.string().optional(),
  doctorAssigned: z.string().min(1, "Doctor assignment is required"),
});

const medicationAllergiesSchema = z.object({
  medications: z.string().optional(),
  foodAllergies: z.boolean().optional(),
  medicationAllergies: z.boolean().optional(),
  environmentalAllergies: z.boolean().optional(),
  otherAllergies: z.string().optional(),
});

const lifestyleFactorsSchema = z.object({
  smoking: z.enum(["yes", "no"]),
  alcohol: z.enum(["yes", "no"]),
  diet: z.string().min(1, "Diet type is required"),
  exerciseFrequency: z.number().min(0).max(7),
  sleepHours: z.string().min(1, "Sleep hours are required"),
});

const familyHealthHistorySchema = z.object({
  familyConditions: z.string().optional(),
  noKnownFamilyHistory: z.boolean().optional(),
});

const formSchema = z.object({
  generalDetails: generalDetailsSchema,
  healthBackground: healthBackgroundSchema,
  currentHealthStatus: currentHealthStatusSchema,
  medicationAllergies: medicationAllergiesSchema,
  lifestyleFactors: lifestyleFactorsSchema,
  familyHealthHistory: familyHealthHistorySchema,
});

export default function AddPatient() {
  const [currentStep, setCurrentStep] = useState(0);
  const session = useSession();
  const { data: user } = session;
  const id = user?.user?.hospitalId;
  const doctors = useRecoilValue(doctorDataState);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      defaultValues: {
        generalDetails: {
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          gender: "",
          weight: "",
        },
        healthBackground: {
          medicalConditions: "",
          previousSurgeries: "",
          ongoingTreatments: "",
          noKnownHistory: false,
        },
        currentHealthStatus: {
          symptoms: "",
          symptomIntensity: 5,
          symptomDuration: "",
          additionalComments: "",
          doctorAssigned: "",
        },
        medicationAllergies: {
          medications: "",
          foodAllergies: false,
          medicationAllergies: false,
          environmentalAllergies: false,
          otherAllergies: "",
        },
        lifestyleFactors: {
          smoking: "no",
          alcohol: "no",
          diet: "",
          exerciseFrequency: 3,
          sleepHours: "",
        },
        familyHealthHistory: {
          familyConditions: "",
          noKnownFamilyHistory: false,
        },
      },
    },
  });

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const res = await createPatient({
        formData: data,
        hospitalId: id,
      });
      console.log(res);
      toast.success("Patient added successfully");
      // Reset form and go back to first step
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  const validateStep = async () => {
    let isValid = false;
    switch (currentStep) {
      case 0:
        isValid = await form.trigger("generalDetails");
        break;
      case 1:
        isValid = await form.trigger("healthBackground");
        break;
      case 2:
        isValid = await form.trigger("currentHealthStatus");
        break;
      case 3:
        isValid = await form.trigger("medicationAllergies");
        break;
      case 4:
        isValid = await form.trigger("lifestyleFactors");
        break;
      case 5:
        isValid = await form.trigger("familyHealthHistory");
        break;
    }
    return isValid;
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

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">General Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="generalDetails.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter patient's first name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="generalDetails.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter patient's last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="generalDetails.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter patient's email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="generalDetails.dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="generalDetails.gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="generalDetails.weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter patient's weight"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Health Background</h2>
            <FormField
              control={form.control}
              name="healthBackground.medicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Conditions</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="diabetes">Diabetes</SelectItem>
                      <SelectItem value="hypertension">Hypertension</SelectItem>
                      <SelectItem value="asthma">Asthma</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="healthBackground.previousSurgeries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Surgeries</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any previous surgeries with dates"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="healthBackground.ongoingTreatments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ongoing Treatments or Therapies</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any ongoing treatments or therapies"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="healthBackground.noKnownHistory"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>No known medical history</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Current Health Status</h2>
            <FormField
              control={form.control}
              name="currentHealthStatus.symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptoms</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select symptom" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="headache">Headache</SelectItem>
                      <SelectItem value="fatigue">Fatigue</SelectItem>
                      <SelectItem value="pain">Pain</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentHealthStatus.symptomIntensity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptom Intensity</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={10}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentHealthStatus.symptomDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptom Duration</FormLabel>

                  <FormControl>
                    <Input placeholder="e.g., 2 days, 1 week" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentHealthStatus.additionalComments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide any additional details about your symptoms"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentHealthStatus.doctorAssigned"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor Assigned</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Medication & Allergies</h2>
            <FormField
              control={form.control}
              name="medicationAllergies.medications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Medications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List current medications and dosages"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicationAllergies.foodAllergies"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Food Allergies</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicationAllergies.medicationAllergies"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Medication Allergies</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicationAllergies.environmentalAllergies"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Environmental Allergies</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicationAllergies.otherAllergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Allergies</FormLabel>
                  <FormControl>
                    <Input placeholder="List any other allergies" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Lifestyle Factors</h2>
            <FormField
              control={form.control}
              name="lifestyleFactors.smoking"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Smoking</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lifestyleFactors.alcohol"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Alcohol Consumption</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lifestyleFactors.diet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diet Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select diet type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="non-vegetarian">
                        Non-Vegetarian
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lifestyleFactors.exerciseFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Frequency (days per week)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={7}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lifestyleFactors.sleepHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sleep (hours per night)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Family Health History</h2>
            <FormField
              control={form.control}
              name="familyHealthHistory.familyConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Health Conditions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any known family health conditions and the relation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyHealthHistory.noKnownFamilyHistory"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>No known family history</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
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
                <Button type="button" onClick={handleNext}>
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
  );
}
