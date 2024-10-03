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
import ChildrenWrapper from "@/components/ChildrenWrapper";

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
    <ChildrenWrapper
      title={"Patients"}
      description={"Manage and view patient details"}
      LeftComponent={() => <AddPatient setPatients={setPatients} />}
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
