"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { createPatient } from "@/server/actions/patients/create-patient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { fetchDoctors } from "@/server/actions/doctors/fetch-doctors";
import { patientSchema } from "@/lib/inputValidation";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import StepIndicator from "./StepIndicator";
import GeneralDetailsForm from "./GeneralDetailsForm";
import HealthBackgroundForm from "./HealthBackgroundForm";
import CurrentHealthStatusForm from "./CurrentHealthStatusForm";
import MedicationAllergiesForm from "./MedicationAllergiesForm";
import LifestyleFactorsForm from "./LifestyleFactorsForm";
import FamilyHealthHistoryForm from "./FamilyHealthHistoryForm";

const steps = [
  "General Details",
  "Health Background",
  "Current Health Status",
  "Medication & Allergies",
  "Lifestyle Factors",
  "Family Health History",
];

export default function AddPatientForm() {
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
        allergies: "",
        noKnownHistory: false,
      },
      currentHealthStatus: {
        symptoms: "",
        symptomIntensity: 5,
        symptomDuration: "",
        doctorAssigned: "",
      },
      medicationAllergies: {
        medications: "",
        allergies: "",
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
  });

  useEffect(() => {
    const fetchDoctorsData = async () => {
      const res = await fetchDoctors({ hospitalId: id });
      setDoctors(res.data);
    };
    fetchDoctorsData();
  }, [id]);

  const onSubmit = async (data) => {
    const structuredData = {
      generalDetails: data.generalDetails,
      healthBackground: data.healthBackground,
      currentHealthStatus: data.currentHealthStatus,
      medicationAllergies: data.medicationAllergies,
      lifestyleFactors: data.lifestyleFactors,
      familyHealthHistory: data.familyHealthHistory,
    };

    try {
      // await createPatient({
      //   formData: structuredData,
      //   hospitalId: id,
      // });
      // toast.success("Patient added successfully");

      form.reset();
      // window.location.href = "/admin/patients"
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
      "medicationAllergies",
      "lifestyleFactors",
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

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <GeneralDetailsForm form={form} />;
      case 1:
        return <HealthBackgroundForm form={form} />;
      case 2:
        return <CurrentHealthStatusForm form={form} doctors={doctors} />;
      case 3:
        return <MedicationAllergiesForm form={form} />;
      case 4:
        return <LifestyleFactorsForm form={form} />;
      case 5:
        return <FamilyHealthHistoryForm form={form} />;
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
            <StepIndicator steps={steps} currentStep={currentStep} />
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
