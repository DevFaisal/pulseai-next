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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity, Calendar, FileText, Pill } from "lucide-react";
import { useRecoilValueLoadable } from "recoil";
import { patientDetailsId } from "@/store/HospitalAtom";
import Loading from "@/components/other/Loading";
import ErrorPage from "@/components/other/ErrorPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VitalsDrawerExample } from "@/components/other/Drawer";
import { useRouter } from "next/navigation";

export default function PatientDetailsPage({ params }) {
  const patientId = params.id;
  const patientDetailsLoadable = useRecoilValueLoadable(
    patientDetailsId(patientId)
  );
  const router = useRouter();
  if (patientDetailsLoadable.state === "loading") {
    return <Loading />;
  }

  if (patientDetailsLoadable.state === "hasError") {
    return <ErrorPage />;
  }

  const patient = patientDetailsLoadable.contents;

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Patient Overview Card */}
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${patient.firstName}`}
                  alt={`${patient.firstName} ${patient.lastName}`}
                />
                <AvatarFallback>
                  {patient.firstName[0]}
                  {patient.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{`${patient.firstName} ${patient.lastName}`}</CardTitle>
                <CardDescription>
                  {new Date().getFullYear() -
                    new Date(patient.dateOfBirth).getFullYear()}{" "}
                  years old • {patient.gender}
                </CardDescription>
                <Badge variant="secondary">
                  {patient.medicalConditions || "No known conditions"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{patient.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Weight</p>
                <p>{patient.weight} kg</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Diet</p>
                <p>{patient.diet}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Alcohol</p>
                <p>{patient.alcohol}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Smoking</p>
                <p>{patient.smoking}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Exercise Frequency
                </p>
                <p>{patient.exerciseFrequency} times per week</p>
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
              <Button
                onClick={() => router.push(`/user/patient/vitals`)}
                className="h-20 flex flex-col items-center justify-center"
              >
                <Activity className="h-6 w-6 mb-2" />
                Vitals
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
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Patient Overview</CardTitle>
              <CardDescription>
                Key information about the patient
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Symptoms</h3>
                  <p>{patient.symptoms || "No symptoms reported"}</p>
                  <p>Duration: {patient.symptomDuration || "N/A"}</p>
                  <p>Intensity: {patient.symptomIntensity || "N/A"}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sleep</h3>
                  <p>{patient.sleepHours} hours per night</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Family History</h3>
                  <p>
                    {patient.noKnownFamilyHistory
                      ? "No known family history"
                      : patient.familyConditions}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical-history">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>
                Patient's medical conditions and treatments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Medical Conditions</h3>
                  <p>
                    {patient.medicalConditions || "No known medical conditions"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Ongoing Treatments</h3>
                  <p>{patient.ongoingTreatments || "No ongoing treatments"}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Previous Surgeries</h3>
                  <p>{patient.previousSurgeries || "No previous surgeries"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>List of prescribed medications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {patient.medications || "No current medications"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allergies">
          <Card>
            <CardHeader>
              <CardTitle>Allergies</CardTitle>
              <CardDescription>Patient's known allergies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Food Allergies</h3>
                  <p>
                    {patient.foodAllergies ? "Yes" : "No known food allergies"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Medication Allergies</h3>
                  <p>
                    {patient.medicationAllergies
                      ? "Yes"
                      : "No known medication allergies"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Environmental Allergies
                  </h3>
                  <p>
                    {patient.environmentalAllergies
                      ? "Yes"
                      : "No known environmental allergies"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Other Allergies</h3>
                  <p>
                    {patient.otherAllergies || "No other allergies reported"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
