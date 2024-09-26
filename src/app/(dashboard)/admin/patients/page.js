"use client";

import AddPatient from "@/components/AddPatient";
import { Card, CardContent } from "@/components/ui/card";
import PatientTable from "@/components/PatientTable";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Component() {
  const { data: session } = useSession();
  const hospitalId = session?.user?.hospitalId;
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `/api/patient?hospitalId=${hospitalId}`
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [hospitalId]);

  // const patients = [
  //   {
  //     name: "John Doe",
  //     age: 35,
  //     gender: "Male",
  //     doctor: "Dr. Jane Smith",
  //   },
  //   {
  //     name: "Kaiser Doe",
  //     age: 22,
  //     gender: "Female",
  //     doctor: "Dr. John Smith",
  //   },
  // ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Patients</h1>
          <AddPatient />
        </div>
        <Card>
          <CardContent>
            <PatientTable patients={patients} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
