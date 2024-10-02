"use client";

import { Card, CardContent } from "@/components/ui/card";
import PatientTable from "@/components/PatientTable";
import AddPatient from "@/components/AddPatient";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import NotAvailable from "@/components/NotAvailable";
import { useSession } from "next-auth/react";
import { fetchDoctors } from "@/server/actions/fetch-doctors";
import { AdminPatientsSelector } from "@/store/AdminAtom";
import { useRecoilValue } from "recoil";

export default function Patients() {
  const patientsSelector = useRecoilValue(AdminPatientsSelector);

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: sessionData } = useSession();
  const hospitalId = sessionData?.user?.hospitalId;

  useEffect(() => {
    const fetchPatientsData = async () => {
      const doctors = await fetchDoctors({ hospitalId });
      setDoctors(doctors.data);
    };
    fetchPatientsData();

    setPatients(patientsSelector.data);
    setIsLoading(false);
  }, [hospitalId]);

  if (isLoading) {
    return <Loading />;
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
            <NotAvailable title="patient" />
          )}
        </Card>
      </main>
    </div>
  );
}
