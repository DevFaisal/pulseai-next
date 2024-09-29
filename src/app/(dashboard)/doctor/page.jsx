"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRecoilValueLoadable } from "recoil";
import { doctorDetailsSelector } from "@/store/DoctorAtom";
import { useSession } from "next-auth/react";
import { useAPI } from "@/hooks/useAPI";

export default function DoctorDashboard() {
  const { data: session } = useSession();
  const doctorId = session?.user.id;
  const doctorDetails = useRecoilValueLoadable(doctorDetailsSelector(doctorId));

  const [patients, setPatients] = useState([]);
  const [medications, setMedications] = useState([]);
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

  // Fetch doctor details and patients
  useEffect(() => {
    if (doctorDetails.state === "hasValue") {
      setPatients(doctorDetails.contents.patients || []);
    }
  }, [doctorDetails]);

  // Add medication to the selected patient
  const handleAddMedication = useCallback(
    async (patientId) => {
      try {
        const res = await api.updatePatientMedication(newMedication, patientId);
        if (res.status === 200) {
          setMedications((prev) => [...prev, newMedication]); // Add to the local state
          setNewMedication({ name: "", dosage: "", frequency: "" });
        }
      } catch (error) {
        console.error("Error adding medication:", error);
      }
    },
    [newMedication, api]
  );

  // Add new threshold
  const handleAddThreshold = useCallback(() => {
    setThresholds((prev) => [
      ...prev,
      { ...newThreshold, id: thresholds.length + 1 },
    ]);
    setNewThreshold({ name: "", value: 0, unit: "" });
  }, [newThreshold, thresholds.length]);

  return (
    <div>
      <main className="py-6 sm:px-6 lg:px-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Patient Management
          </h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
            <CardDescription>Manage and view patient details</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      {patient.name}
                    </TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          patient.status === "Stable"
                            ? "secondary"
                            : patient.status === "Needs Attention"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <Dialog
        open={!!selectedPatient}
        onOpenChange={() => setSelectedPatient(null)}
      >
        <DialogContent className="sm:max-w-[600px] pt-10">
          <Tabs defaultValue="information">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="information">Information</TabsTrigger>
              <TabsTrigger value="medication">Medication</TabsTrigger>
              <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
            </TabsList>
            <TabsContent value="information">
              <Card>
                <CardHeader>
                  <CardTitle>Information</CardTitle>
                  <CardDescription>
                    View and manage patient information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedPatient ? (
                    <div className="space-y-4">
                      {/* Basic Information */}
                      <div className="flex items-center space-x-4">
                        <div className="w-1/2">
                          <h4 className="font-medium">Name:</h4>
                          <p>{selectedPatient.name}</p>
                        </div>
                        <div className="w-1/2">
                          <h4 className="font-medium">Age:</h4>
                          <p>{selectedPatient.age}</p>
                        </div>
                      </div>

                      {/* Gender and Contact Info */}
                      <div className="flex items-center space-x-4">
                        <div className="w-1/2">
                          <h4 className="font-medium">Gender:</h4>
                          <p>{selectedPatient.gender}</p>
                        </div>
                        <div className="w-1/2">
                          <h4 className="font-medium">Contact Info:</h4>
                          <p>{selectedPatient.contact}</p>
                        </div>
                      </div>

                      {/* Clinical Notes */}
                      <div className="space-y-2">
                        <h4 className="font-medium">Clinical Notes:</h4>
                        <p>
                          {selectedPatient.clinicalNotes ||
                            "No clinical notes available."}
                        </p>
                      </div>

                      {/* Diagnosis */}
                      <div className="space-y-2">
                        <h4 className="font-medium">Diagnosis:</h4>
                        <p>
                          {selectedPatient.diagnosis ||
                            "No diagnosis available."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p>No patient selected.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medication">
              <Card>
                <CardHeader>
                  <CardTitle>Medications</CardTitle>
                  <CardDescription>Manage patient medications</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] mb-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Frequency</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPatient?.medications?.map((medication) => (
                          <TableRow key={medication.id}>
                            <TableCell>{medication.name}</TableCell>
                            <TableCell>{medication.dosage}</TableCell>
                            <TableCell>{medication.frequency}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Medication name"
                      value={newMedication.name}
                      onChange={(e) =>
                        setNewMedication({
                          ...newMedication,
                          name: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Dosage"
                      value={newMedication.dosage}
                      onChange={(e) =>
                        setNewMedication({
                          ...newMedication,
                          dosage: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Frequency"
                      value={newMedication.frequency}
                      onChange={(e) =>
                        setNewMedication({
                          ...newMedication,
                          frequency: e.target.value,
                        })
                      }
                    />
                    <Button
                      onClick={() => handleAddMedication(selectedPatient.id)}
                    >
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="thresholds">
              <Card>
                <CardHeader>
                  <CardTitle>Thresholds</CardTitle>
                  <CardDescription>
                    Set alert thresholds for patient vitals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] mb-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Vital Sign</TableHead>
                          <TableHead>Threshold</TableHead>
                          <TableHead>Unit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {thresholds.map((threshold) => (
                          <TableRow key={threshold.id}>
                            <TableCell>{threshold.name}</TableCell>
                            <TableCell>{threshold.value}</TableCell>
                            <TableCell>{threshold.unit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Threshold name"
                      value={newThreshold.name}
                      onChange={(e) =>
                        setNewThreshold({
                          ...newThreshold,
                          name: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Value"
                      type="number"
                      value={newThreshold.value}
                      onChange={(e) =>
                        setNewThreshold({
                          ...newThreshold,
                          value: parseFloat(e.target.value),
                        })
                      }
                    />
                    <Input
                      placeholder="Unit"
                      value={newThreshold.unit}
                      onChange={(e) =>
                        setNewThreshold({
                          ...newThreshold,
                          unit: e.target.value,
                        })
                      }
                    />
                    <Button onClick={handleAddThreshold}>Add</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
