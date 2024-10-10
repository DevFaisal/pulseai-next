"use client";

import React, { useEffect, useState, useCallback } from "react";

import { useRecoilValue } from "recoil";
import { doctorDetailsSelector } from "@/store/DoctorAtom";
import { useSession } from "next-auth/react";
import PatientList from "@/components/user/PatientList";
import ActionDialog from "@/components/user/ActionDialog";
import ChildrenWrapper from "@/components/ChildrenWrapper";
import { DiagnosePatient } from "@/server/actions/patients/diagnose-patient";
import { toast } from "sonner";

export default function DoctorDashboard() {
  const { data: session } = useSession();
  const doctorId = session?.user?.id;
  const doctorDetails = useRecoilValue(doctorDetailsSelector(doctorId));

  const [patients, setPatients] = useState([]);
  const [diagnose, setDiagnose] = useState(null);

  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    if (doctorDetails?.patients) {
      setPatients(doctorDetails.patients);
    }
  }, [doctorDetails]);

  const onDiagnoseSubmit = useCallback((diagnosis) => {
    setDiagnose(diagnosis);
  }, []);

  const handleFinalSave = async () => {
    try {
      const res = await DiagnosePatient({
        patientId: selectedPatient.id,
        diagnose,
        newMedication,
        thresholds,
      });
      if (res.error) {
        console.error("Failed to save changes", res.error);
        toast.error("Failed to save changes");
        return;
      }
      toast.success("Changes saved successfully");
      console.log(res);
    } catch (error) {
      console.error("Failed to save changes", error);
      toast.error("Failed to save changes");
    }
  };

  return (
    <>
      <ChildrenWrapper
        title={"Patients"}
        description={"View and manage your patients"}
        LeftComponent={null}
      >
        <PatientList
          patients={patients}
          setSelectedPatient={setSelectedPatient}
        />
      </ChildrenWrapper>
      <ActionDialog
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
        onDiagnoseSubmit={onDiagnoseSubmit}
        handleFinalSave={handleFinalSave}
      />
    </>
  );
}
