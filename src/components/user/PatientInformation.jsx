"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export function PatientInformation({ patient }) {
  const router = useRouter();
  if (!patient) return null;

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              Patient Information
            </CardTitle>
            <CardDescription>View and manage patient details</CardDescription>
          </div>
          <StatusBadge
            status={patient.medicalConditions ? "Under Treatment" : "Stable"}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem
                    label="Name"
                    value={`${patient.firstName} ${patient.lastName}`}
                  />
                  <InfoItem
                    label="Age"
                    value={calculateAge(patient.dateOfBirth)}
                  />
                  <InfoItem label="Gender" value={patient.gender} />
                  <InfoItem label="Email" value={patient.email} />
                  <InfoItem label="Weight" value={`${patient.weight} kg`} />
                  <InfoItem label="Height" value={`${patient.height} cm`} />
                  <InfoItem label="BMI" value={patient.bmi?.toFixed(2)} />
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="medical">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-6 grid grid-cols-2">
                <InfoItem
                  label="Medical Conditions"
                  value={patient.medicalConditions || "None"}
                />
                <InfoItem
                  label="Previous Surgeries"
                  value={patient.previousSurgeries || "None"}
                />
                <InfoItem
                  label="Ongoing Treatments"
                  value={patient.ongoingTreatments || "None"}
                />
                <InfoItem label="Symptoms" value={patient.symptoms || "None"} />
                <InfoItem
                  label="Symptom Intensity"
                  value={
                    patient.symptomIntensity
                      ? `${patient.symptomIntensity}/10`
                      : "N/A"
                  }
                />
                <InfoItem
                  label="Symptom Duration"
                  value={patient.symptomDuration || "N/A"}
                />
                <InfoItem
                  label="Food Allergies"
                  value={patient.foodAllergies ? "Yes" : "No"}
                />
                <InfoItem
                  label="Medication Allergies"
                  value={patient.medicationAllergies ? "Yes" : "No"}
                />
                <InfoItem
                  label="Environmental Allergies"
                  value={patient.environmentalAllergies ? "Yes" : "No"}
                />
                <InfoItem
                  label="Other Allergies"
                  value={patient.otherAllergies || "None"}
                />
                <InfoItem
                  label="Family Medical History"
                  value={
                    patient.noKnownFamilyHistory
                      ? "No known history"
                      : patient.familyConditions || "Not specified"
                  }
                />
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="lifestyle">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-6 grid grid-cols-2">
                <InfoItem label="Smoking" value={patient.smoking} />
                <InfoItem label="Alcohol Consumption" value={patient.alcohol} />
                <InfoItem label="Diet" value={patient.diet} />
                <InfoItem
                  label="Exercise Frequency"
                  value={`${patient.exerciseFrequency} times per week`}
                />
                <InfoItem
                  label="Sleep Hours"
                  value={`${patient.sleepHours} hours per night`}
                />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            onClick={() => router.push(`vitals`, { patientId: patient.id })}
          >
            View Vitals
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground">{label}</h4>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusColors = {
    stable: "bg-green-100 text-green-800",
    "under treatment": "bg-yellow-100 text-yellow-800",
    critical: "bg-red-100 text-red-800",
  };

  const normalizedStatus = status.toLowerCase();
  const colorClass =
    statusColors[normalizedStatus] || "bg-gray-100 text-gray-800";

  return (
    <Badge className={`${colorClass} px-2 py-1 text-xs font-medium`}>
      {status}
    </Badge>
  );
}
