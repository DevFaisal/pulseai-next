"use client";

import React, { useEffect, useState, useCallback } from "react";

import { useRecoilValue } from "recoil";
import { doctorDetailsSelector } from "@/store/DoctorAtom";
import { useSession } from "next-auth/react";
import PatientList from "@/components/user/PatientList";
import ActionDialog from "@/components/user/ActionDialog";
import ChildrenWrapper from "@/components/ChildrenWrapper";

export default function DoctorDashboard() {
  const { data: session } = useSession();
  const doctorId = session?.user?.id;
  const doctorDetails = useRecoilValue(doctorDetailsSelector(doctorId));

  const [patients, setPatients] = useState([]);
  const [diagnose, setDiagnose] = useState(null);
  const [medication, setMedication] = useState([
    { id: 1, name: "Aspirin", dosage: "100mg", frequency: "Daily" },
  ]);
  const [thresholds, setThresholds] = useState([
    { id: 1, name: "Blood Pressure", min: 80, max: 120, unit: "mmHg" },
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
  });
  const [newThreshold, setNewThreshold] = useState({
    name: "",
    value: 0,
    unit: "",
  });

  useEffect(() => {
    if (doctorDetails?.patients) {
      setPatients(doctorDetails.patients);
    }
  }, [doctorDetails]);

  const handleAddMedication = useCallback(() => {
    setMedication((prev) => [
      ...prev,
      { ...newMedication, id: prev.length + 1 },
    ]);
    setNewMedication({ name: "", dosage: "", frequency: "" });
  }, [newMedication]);

  const handleAddThreshold = useCallback(() => {
    setThresholds((prev) => [
      ...prev,
      { ...newThreshold, id: prev.length + 1 },
    ]);
    setNewThreshold({ name: "", value: 0, unit: "" });
  }, [newThreshold]);

  const onDiagnoseSubmit = useCallback((diagnosis) => {
    setDiagnose(diagnosis);
  }, []);

  const handleFinalSave = async () => {
    console.log("Saving changes to patient", medication, thresholds, diagnose);
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
        medication={medication}
        newMedication={newMedication}
        setNewMedication={setNewMedication}
        newThreshold={newThreshold}
        setNewThreshold={setNewThreshold}
        handleAddMedication={handleAddMedication}
        handleAddThreshold={handleAddThreshold}
        thresholds={thresholds}
        onDiagnoseSubmit={onDiagnoseSubmit}
        handleFinalSave={handleFinalSave}
      />
    </>
  );
}
