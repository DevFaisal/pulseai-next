"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PatientInformation({ patient }) {
  if (!patient) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Information</CardTitle>
        <CardDescription>View and manage patient details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Name" value={patient.name} />
            <InfoItem label="Age" value={patient.age} />
            <InfoItem label="Gender" value={patient.gender} />
            <InfoItem label="Contact Info" value={patient.contact} />
          </div>
          <InfoItem
            label="Clinical Notes"
            value={patient.clinicalNotes || "No clinical notes available."}
          />
          <InfoItem
            label="Diagnosis"
            value={patient.diagnosis || "No diagnosis available."}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <h4 className="font-medium text-sm text-muted-foreground">{label}</h4>
      <p className="mt-1">{value}</p>
    </div>
  );
}
