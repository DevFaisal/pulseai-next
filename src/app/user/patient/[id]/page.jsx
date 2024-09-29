"use client";
import React from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  ArrowLeft,
  Calendar,
  FileText,
  Heart,
  PenLine,
  Pill,
  Stethoscope,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PatientDetailsPage() {
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

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size="icon"
              className="mr-4"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Patient Details
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Patient Overview Card */}
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${patient.name}`}
                      alt={patient.name}
                    />
                    <AvatarFallback>
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{patient.name}</CardTitle>
                    <CardDescription>
                      {patient.age} years old • {patient.gender} •{" "}
                      {patient.bloodType}
                    </CardDescription>
                    <Badge
                      variant={
                        patient.status === "Stable"
                          ? "secondary"
                          : patient.status === "Needs Attention"
                          ? "warning"
                          : patient.status === "Critical"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {patient.status}
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
                    <p>{patient.height}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Weight</p>
                    <p>{patient.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">BMI</p>
                    <p>{patient.bmi}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p>{patient.contactInfo.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center">
                    <Activity className="h-6 w-6 mb-2" />
                    View Vitals
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
              <TabsTrigger value="vitals">Vitals & Lab Results</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="history">Medical History</TabsTrigger>
              <TabsTrigger value="treatment">Treatment Plan</TabsTrigger>
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
                      <h3 className="font-semibold mb-2">
                        Upcoming Appointments
                      </h3>
                      <ul className="space-y-2">
                        {patient.upcomingAppointments.map(
                          (appointment, index) => (
                            <li key={index} className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>
                                {appointment.date} - {appointment.time}:{" "}
                                {appointment.type} with {appointment.doctor}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vitals">
              <Card>
                <CardHeader>
                  <CardTitle>Vitals & Lab Results</CardTitle>
                  <CardDescription>
                    Current vitals and recent lab results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Current Vitals</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(patient.vitals).map(([key, value]) => (
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
                    <div>
                      <h3 className="font-semibold mb-2">Recent Lab Results</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Test</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Normal Range</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {patient.labResults.map((result, index) => (
                            <TableRow key={index}>
                              <TableCell>{result.test}</TableCell>
                              <TableCell>{result.value}</TableCell>
                              <TableCell>{result.date}</TableCell>
                              <TableCell>{result.normalRange}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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
                      {patient.medications.map((med, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {med.name}
                          </TableCell>
                          <TableCell>{med.dosage}</TableCell>
                          <TableCell>{med.frequency}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                  <CardDescription>
                    Past and ongoing medical conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Condition</TableHead>
                        <TableHead>Year Diagnosed</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patient.medicalHistory.map((condition, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {condition.condition}
                          </TableCell>
                          <TableCell>{condition.year}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                condition.status === "Ongoing"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {condition.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="treatment">
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Plan</CardTitle>
                  <CardDescription>
                    Current treatment recommendations and follow-up instructions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Dietary Recommendations
                      </h3>
                      <p>{patient.treatmentPlan.dietaryRecommendations}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Exercise Recommendations
                      </h3>
                      <p>{patient.treatmentPlan.exerciseRecommendations}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Medication Adjustments
                      </h3>
                      <p>{patient.treatmentPlan.medicationAdjustments}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Follow-up Instructions
                      </h3>
                      <p>{patient.treatmentPlan.followUpInstructions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
