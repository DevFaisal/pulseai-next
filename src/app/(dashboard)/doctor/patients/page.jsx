"use client";

import React, { useEffect, useState, useCallback } from "react";

import { useRecoilValue } from "recoil";
import { doctorDetailsSelector } from "@/store/DoctorAtom";
import { useSession } from "next-auth/react";
import { useAPI } from "@/hooks/useAPI";
import PatientList from "@/components/user/PatientList";
import ActionDialog from "@/components/user/ActionDialog";
import ChildrenWrapper from "@/components/ChildrenWrapper";
import { addMedication } from "@/server/actions/patients/add-medication";
import { toast } from "sonner";

export default function DoctorDashboard() {
  const { data: session } = useSession();
  const doctorId = session?.user?.id;
  const doctorDetails = useRecoilValue(doctorDetailsSelector(doctorId));

  const [patients, setPatients] = useState([]);
  const [thresholds, setThresholds] = useState([
    { id: 1, name: "Blood Pressure", value: 140, unit: "mmHg" },
    { id: 2, name: "Blood Glucose", value: 126, unit: "mg/dL" },
    { id: 3, name: "Heart Rate", value: 100, unit: "bpm" },
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

  const api = useAPI();

  useEffect(() => {
    if (doctorDetails?.patients) {
      setPatients(doctorDetails.patients);
    }
  }, [doctorDetails]);

const handleAddMedication = useCallback(
    async (patientId) => {
      try {
        const res = await addMedication({ formData: newMedication, patientId });
        if (res.data) {
          setSelectedPatient((prev) => ({
            ...prev,
            medications: [...(prev.medications || []), newMedication],
          }));
          setNewMedication({ name: "", dosage: "", frequency: "" });
          toast.success("Medication added successfully");
        }
      } catch (error) {
        console.error("Error adding medication:", error);
      }
    },
    [newMedication, api]
  );

const handleAddThreshold = useCallback(() => {
    setThresholds((prev) => [
      ...prev,
      { ...newThreshold, id: prev.length + 1 },
    ]);
    setNewThreshold({ name: "", value: 0, unit: "" });
  }, [newThreshold]);

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
        newMedication={newMedication}
        setNewMedication={setNewMedication}
        newThreshold={newThreshold}
        setNewThreshold={setNewThreshold}
        handleAddMedication={handleAddMedication}
        handleAddThreshold={handleAddThreshold}
        thresholds={thresholds}
      />
    </>
  );
}
