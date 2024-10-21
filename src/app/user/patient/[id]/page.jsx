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
import { Activity, Calendar, FileText, Pill } from "lucide-react";
import Loading from "@/components/other/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { fetchPatientByIdOnly } from "@/server/actions/patients/fetch-patients";

export default function PatientDetailsPage({ params }) {
  const patientId = params.id;
  const [patient, setPatient] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchPatientByIdOnly({ patientId });
      console.log(res);
      if (res.error) {
        console.error(`Error fetching patient data: ${res.error}`);
        return;
      }
      setPatient(res.data);
    };
    fetchData();
  }, [patientId]);

  if (!patient.id) {
    return <Loading />;
  }

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
    <div className="px-4 py-6 sm:px-0">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Patient Overview Card */}
        <Card className="flex-1 rounded-none">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${patient.firstName}`}
                  alt={`${patient.firstName} ${patient.lastName}`}
                />
                <AvatarFallback>
                  {patient.firstName && patient.firstName[0]}
                  {patient.lastName && patient.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{`${patient.firstName} ${patient.lastName}`}</CardTitle>
                <CardDescription>
                  {calculateAge(patient.dateOfBirth)} years old •{" "}
                  {patient.gender}
                </CardDescription>
                <Badge variant="secondary">
                  {patient.currentHealthStatus?.symptoms ||
                    "No current symptoms"}
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
                <p>{patient.currentHealthStatus?.diet}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">BMI</p>
                <p>{patient.bmi}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Smoking</p>
                <p>{patient.currentHealthStatus?.smoking}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Exercise Frequency
                </p>
                <p>{patient.currentHealthStatus?.exerciseFrequency}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="flex-1 rounded-none">
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
          <Card className="rounded-none">
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
                  <p>
                    {patient.currentHealthStatus?.symptoms ||
                      "No symptoms reported"}
                  </p>
                  <p>
                    Duration:{" "}
                    {patient.currentHealthStatus?.symptomDuration || "N/A"}
                  </p>
                  <p>
                    Intensity:{" "}
                    {patient.currentHealthStatus?.symptomIntensity || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sleep</h3>
                  <p>
                    {patient.currentHealthStatus?.sleepHours} hours per night
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Family History</h3>
                  <p>
                    {patient.medicalHistory?.noKnownFamilyHistory
                      ? "No known family history"
                      : patient.medicalHistory?.familyConditions}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical-history">
          <Card className="rounded-none">
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
                    {patient.medicalHistory?.medicalConditions ||
                      "No known medical conditions"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Ongoing Treatments</h3>
                  <p>
                    {patient.medicalHistory?.ongoingTreatments ||
                      "No ongoing treatments"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Previous Surgeries</h3>
                  <p>
                    {patient.medicalHistory?.previousSurgeries ||
                      "No previous surgeries"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card className="rounded-none">
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
                      {patient.medicalHistory?.medications ||
                        "No current medications"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allergies">
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle>Allergies</CardTitle>
              <CardDescription>Patient's known allergies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Allergies</h3>
                  <p>
                    {patient.medicalHistory?.allergies || "No known allergies"}
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
