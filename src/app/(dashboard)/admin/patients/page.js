"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Card, CardContent } from "@/components/ui/card";
import { AdminDoctorsSelector, AdminPatientsSelector } from "@/store/AdminAtom";
import PatientTable from "@/components/PatientTable";
import AddPatient from "@/components/AddPatient";
import Loading from "@/components/Loading";
import NotAvailable from "@/components/NotAvailable";
import { doctorDataState } from "@/store/DoctorAtom";

export default function Patients() {
  const patientsSelector = useRecoilValue(AdminPatientsSelector);
  const doctorsSelector = useRecoilValue(AdminDoctorsSelector);

  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setDoctorsAtom = useSetRecoilState(doctorDataState);

  const { data: sessionData } = useSession();
  const hospitalId = sessionData?.user?.hospitalId;

  useEffect(() => {
    const fetchData = async () => {
      setPatients(patientsSelector || []);
      setDoctorsAtom(doctorsSelector);
      setIsLoading(false);
    };
    fetchData();
  }, [hospitalId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h1 className="text-3xl font-bold text-primary">Patients</h1>
          <AddPatient setPatients={setPatients} />
        </div>
        <Card className="shadow-md">
          <CardContent className="p-0">
            {patients.length > 0 ? (
              <PatientTable patients={patients} setPatients={setPatients} />
            ) : (
              <NotAvailable title="patients" />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
