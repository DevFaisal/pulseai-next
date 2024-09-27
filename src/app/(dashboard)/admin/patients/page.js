"use client";

import { Card, CardContent } from "@/components/ui/card";
import PatientTable from "@/components/PatientTable";
import { useRecoilValueLoadable } from "recoil";
import { AdminDoctorsSelector, AdminPatientsSelector } from "@/store/AdminAtom";
import AddPatient from "@/components/AddPatient";
import SpinnerLoader from "@/components/SpinnerLoader";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Component() {
  const patientsLoadable = useRecoilValueLoadable(AdminPatientsSelector);
  const doctorsLoadable = useRecoilValueLoadable(AdminDoctorsSelector);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (patientsLoadable.state === "hasValue") {
      setPatients(patientsLoadable.contents || []);
    }
    if (doctorsLoadable.state === "hasValue") {
      setDoctors(doctorsLoadable.contents || []);
    }
    if (
      patientsLoadable.state !== "loading" &&
      doctorsLoadable.state !== "loading"
    ) {
      setIsLoading(false);
    }
  }, [patientsLoadable, doctorsLoadable]);

  if (
    isLoading ||
    patientsLoadable.state === "loading" ||
    doctorsLoadable.state === "loading"
  ) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1>Loading...</h1>
      </div>
    );
  }

  // Handle error states
  if (patientsLoadable.state === "hasError") {
    return <div>Error: {patientsLoadable.contents.message}</div>;
  }

  if (doctorsLoadable.state === "hasError") {
    return <div>Error: {doctorsLoadable.contents.message}</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Patients</h1>
          <AddPatient doctors={doctors} setPatients={setPatients} />
        </div>
        <Card>
          {patients && patients.length > 0 ? ( // Check if patients is defined and has length
            <CardContent>
              <PatientTable
                patients={patients}
                setPatients={setPatients}
                doctors={doctors}
              />
            </CardContent>
          ) : (
            <div>No patients available</div>
          )}
        </Card>
      </main>
    </div>
  );
}
