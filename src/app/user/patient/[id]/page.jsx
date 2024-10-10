"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  AlertCircle,
  Calendar,
  FileText,
  Heart,
  Pill,
  Stethoscope,
} from "lucide-react";

import { useRecoilValueLoadable } from "recoil";
import { patientDetailsId } from "@/store/HospitalAtom";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/ErrorPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VitalsDrawerExample } from "@/components/Drawer";

export default function PatientDetailsPage({ params }) {
  const patientId = params.id;
  const patientDetailsLoadable = useRecoilValueLoadable(
    patientDetailsId(patientId)
  );
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    if (patientDetailsLoadable.state === "hasValue") {
      console.log("Patient details loaded:", patientDetailsLoadable.contents);
      setSelectedPatient(patientDetailsLoadable.contents);
    }
  }, [patientDetailsLoadable]);

  // Handle loading, error, and success states
  if (patientDetailsLoadable.state === "loading") {
    return <Loading />;
  }

  if (patientDetailsLoadable.state === "hasError") {
    return <ErrorPage />;
  }

  let vitals = {
    bloodPressure: selectedPatient?.vitalSigns[0].bloodPressure + " mmHg",
    heartRate: selectedPatient?.vitalSigns[0].heartRate + " bpm",
    temperature: selectedPatient?.vitalSigns[0].temperature + "°F",
    respiratoryRate:
      selectedPatient?.vitalSigns[0].respiratoryRate + " breaths/min",
    oxygenSaturation: selectedPatient?.vitalSigns[0].oxygenSaturation + "%",
  };
  console.log(vitals);

  const patientDetails = patientDetailsLoadable.contents;
  // Mock patient data
  const patient = {
    id: 1,
    name: "Emily Johnson",
    age: 42,
    gender: "Female",
    bloodType: "A+",
    height: "5'6\"",
    weight: "140 lbs",
    bmi: 22.6,
    primaryCondition: "Type 2 Diabetes",
    status: "Stable",
    lastChecked: "2023-09-28",
    contactInfo: {
      phone: "(555) 123-4567",
      email: "emily.johnson@email.com",
      address: "123 Main St, Anytown, USA 12345",
    },
    emergencyContact: {
      name: "Michael Johnson",
      relation: "Husband",
      phone: "(555) 987-6543",
    },
    vitals: {
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      respiratoryRate: "14 breaths/min",
      oxygenSaturation: "98%",
    },
    medications: [
      { name: "Metformin", dosage: "1000mg", frequency: "Twice daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      {
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily at bedtime",
      },
    ],
    allergies: ["Penicillin", "Sulfa drugs"],
    labResults: [
      {
        test: "HbA1c",
        value: "6.8%",
        date: "2023-09-15",
        normalRange: "4.0-5.6%",
      },
      {
        test: "Fasting Blood Glucose",
        value: "126 mg/dL",
        date: "2023-09-15",
        normalRange: "70-99 mg/dL",
      },
      {
        test: "Total Cholesterol",
        value: "185 mg/dL",
        date: "2023-09-15",
        normalRange: "<200 mg/dL",
      },
    ],
    upcomingAppointments: [
      {
        date: "2023-10-15",
        time: "10:00 AM",
        doctor: "Dr. Sarah Smith",
        type: "Endocrinology Follow-up",
      },
      {
        date: "2023-11-01",
        time: "2:00 PM",
        doctor: "Dr. John Doe",
        type: "General Check-up",
      },
    ],
    treatmentPlan: {
      dietaryRecommendations: "Low-carb diet, limit sugar intake",
      exerciseRecommendations: "30 minutes of moderate exercise 5 days a week",
      medicationAdjustments:
        "Increase Metformin to 1500mg if blood glucose remains high",
      followUpInstructions: "Schedule HbA1c test in 3 months",
    },
    medicalHistory: [
      { condition: "Gestational Diabetes", year: 2015, status: "Resolved" },
      { condition: "Hypertension", year: 2018, status: "Ongoing" },
      { condition: "Type 2 Diabetes", year: 2020, status: "Ongoing" },
    ],
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Patient Overview Card */}
        {selectedPatient && (
          <Card className="flex-1">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedPatient.name}`}
                    alt={patient.name}
                  />
                  <AvatarFallback>
                    {selectedPatient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedPatient.name}</CardTitle>
                  <CardDescription>
                    {selectedPatient.age} years old • {selectedPatient.gender} •{" "}
                    {selectedPatient.bloodType}
                  </CardDescription>
                  <Badge
                    variant={
                      selectedPatient.status === "Stable"
                        ? "secondary"
                        : patient.status === "Needs Attention"
                        ? "warning"
                        : patient.status === "Critical"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {selectedPatient.status || "Stable"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Primary Condition
                  </p>
                  <p>{patient.primaryCondition}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Last Checked
                  </p>
                  <p>{patient.lastChecked}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Height</p>
                  <p>{selectedPatient.height}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Weight</p>
                  <p>{selectedPatient.weight}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">BMI</p>
                  <p>{selectedPatient.BMI}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{selectedPatient.contact || "XXX,XXX,"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions Card */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center">
                <Activity className="h-6 w-6 mb-2" />
                <VitalsDrawerExample />
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center">
                <Pill className="h-6 w-6 mb-2" />
                Medications
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center">
                <Calendar className="h-6 w-6 mb-2" />
                Schedule Appointment
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center">
                <FileText className="h-6 w-6 mb-2" />
                Add Note
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="dr-notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Patient Overview</CardTitle>
              <CardDescription>
                Key information and upcoming appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Emergency Contact</h3>
                  <p>
                    {patient.emergencyContact.name} (
                    {patient.emergencyContact.relation})
                  </p>
                  <p>{patient.emergencyContact.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="outline">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Upcoming Appointments</h3>
                  <ul className="space-y-2">
                    {patient.upcomingAppointments.map((appointment, index) => (
                      <li key={index} className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {appointment.date} - {appointment.time}:{" "}
                          {appointment.type} with {appointment.doctor}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <CardTitle>Vitals</CardTitle>
              <CardDescription>Current vitals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Current Vitals</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(vitals).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-red-500" />
                        <div>
                          <p className="text-sm font-medium">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p className="text-lg font-semibold">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>
                List of prescribed medications and dosages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedPatient?.medications.map((med, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.dosage}</TableCell>
                      <TableCell>{med.frequency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dr-notes">
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Notes from the patient's doctor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h1>No notes available</h1>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
