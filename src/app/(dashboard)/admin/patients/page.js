"use client";

import { Card, CardContent } from "@/components/ui/card";
import PatientTable from "@/components/PatientTable";
import { useRecoilValueLoadable } from "recoil";
import { AdminDoctorsSelector, AdminPatientsSelector } from "@/store/AdminAtom";
import AddPatient from "@/components/AddPatient";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Component() {
  const patientsLoadable = useRecoilValueLoadable(AdminPatientsSelector);
  const doctorsLoadable = useRecoilValueLoadable(AdminDoctorsSelector);

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (patientsLoadable.state === "hasValue") {
      setPatients(patientsLoadable.contents.data || []);
    }
    if (doctorsLoadable.state === "hasValue") {
      setDoctors(doctorsLoadable.contents.data || []);
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
    return <Loading />;
  }

  // Handle error states
  if (patientsLoadable.state === "hasError") {
    return <div>Error: {patientsLoadable.contents.message}</div>;
  }

  if (doctorsLoadable.state === "hasError") {
    return <div>Error: {doctorsLoadable.contents.message}</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h1 className="text-3xl font-bold text-primary">Patients</h1>
          <AddPatient doctors={doctors} setPatients={setPatients} />
        </div>
        <Card>
          {patients && patients.length > 0 ? (
            <CardContent>
              <PatientTable
                patients={patients}
                setPatients={setPatients}
                doctors={doctors}
              />
            </CardContent>
          ) : (
            <div className="flex flex-col items-center justify-center h-96">
              <h1 className="text-2xl font-semibold text-center text-gray-500">
                No patients available
              </h1>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
