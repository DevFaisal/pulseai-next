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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="flex flex-col justify-between w-full rounded-none h-[66vh]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              Patient Information
            </CardTitle>
            <CardDescription>View and manage patient details</CardDescription>
          </div>
          <StatusBadge
            status={
              patient.medicalHistory.medicalConditions
                ? "Under Treatment"
                : "Stable"
            }
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <Tabs defaultValue="general" className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          </TabsList>
          <div className="flex-grow overflow-hidden">
            <TabsContent value="general" className="h-full">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <InfoItem
                      label="Date of Birth"
                      value={formatDate(patient.dateOfBirth)}
                    />
                    <InfoItem label="Doctor" value={patient.doctor.name} />
                    <InfoItem label="Hospital" value={patient.hospital.name} />
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="medical" className="h-full">
              <ScrollArea className="h-full pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem
                    label="Medical Conditions"
                    value={patient.medicalHistory.medicalConditions || "None"}
                  />
                  <InfoItem
                    label="Previous Surgeries"
                    value={patient.medicalHistory.previousSurgeries || "None"}
                  />
                  <InfoItem
                    label="Ongoing Treatments"
                    value={patient.medicalHistory.ongoingTreatments || "None"}
                  />
                  <InfoItem
                    label="Symptoms"
                    value={patient.currentHealthStatus.symptoms || "None"}
                  />
                  <InfoItem
                    label="Symptom Intensity"
                    value={
                      patient.currentHealthStatus.symptomIntensity
                        ? `${patient.currentHealthStatus.symptomIntensity}/10`
                        : "N/A"
                    }
                  />
                  <InfoItem
                    label="Symptom Duration"
                    value={patient.currentHealthStatus.symptomDuration || "N/A"}
                  />
                  <InfoItem
                    label="Medications"
                    value={patient.medicalHistory.medications || "None"}
                  />
                  <InfoItem
                    label="Allergies"
                    value={patient.medicalHistory.allergies || "None"}
                  />
                  <InfoItem
                    label="Family Medical History"
                    value={
                      patient.medicalHistory.noKnownFamilyHistory
                        ? "No known history"
                        : patient.medicalHistory.familyConditions ||
                          "Not specified"
                    }
                  />
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="lifestyle" className="h-full">
              <ScrollArea className="h-full pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem
                    label="Smoking"
                    value={patient.currentHealthStatus.smoking}
                  />
                  <InfoItem
                    label="Alcohol Consumption"
                    value={patient.currentHealthStatus.alcohol}
                  />
                  <InfoItem
                    label="Diet"
                    value={patient.currentHealthStatus.diet || "Not specified"}
                  />
                  <InfoItem
                    label="Exercise Frequency"
                    value={
                      patient.currentHealthStatus.exerciseFrequency ||
                      "Not specified"
                    }
                  />
                  <InfoItem
                    label="Sleep Hours"
                    value={
                      patient.currentHealthStatus.sleepHours
                        ? `${patient.currentHealthStatus.sleepHours} hours per night`
                        : "Not specified"
                    }
                  />
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      <div className="p-6 flex justify-end space-x-4">
        <Button onClick={() => router.push(`vitals`)}>View Vitals</Button>
      </div>
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
