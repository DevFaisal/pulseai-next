"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AdminDoctorsSelector, AdminPatientsSelector } from "@/store/AdminAtom";
import PatientTable from "@/components/patient/PatientTable";
import Loading from "@/components/other/Loading";
import NotAvailable from "@/components/other/NotAvailable";
import { doctorDataState } from "@/store/DoctorAtom";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Patients() {
  const patientsSelector = useRecoilValue(AdminPatientsSelector);
  const doctorsSelector = useRecoilValue(AdminDoctorsSelector);

  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setDoctorsAtom = useSetRecoilState(doctorDataState);

  const router = useRouter();
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
    <ChildrenWrapper
      title={"Patients"}
      description={"Manage and view patient details"}
      LeftComponent={() => (
        <div>
          <Button onClick={() => router.push("patients/add-patient")}>
            Add Patient
          </Button>
        </div>
      )}
    >
      <div>
        {patients.length > 0 ? (
          <PatientTable patients={patients} setPatients={setPatients} />
        ) : (
          <NotAvailable title="patients" />
        )}
      </div>
    </ChildrenWrapper>
  );
}
