"use client";

import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { AdminDoctorsSelector } from "@/store/AdminAtom";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import AddDoctor from "@/components/AddDoctor";
import Loading from "@/components/Loading";
import NotAvailable from "@/components/NotAvailable";
import DoctorTable from "@/components/DoctorTable";

export default function Doctors() {
  const doctorsLoadable = useRecoilValueLoadable(AdminDoctorsSelector);
  const [doctors, setDoctors] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (doctorsLoadable.state === "hasValue") {
      setDoctors(doctorsLoadable.contents || []);
      setIsLoading(false);
    } else if (doctorsLoadable.state === "loading") {
      setIsLoading(true);
    } else if (doctorsLoadable.state === "hasError") {
      setIsLoading(false);
      toast.error("Failed to load doctors.");
    }
  }, [doctorsLoadable]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h1 className="text-3xl font-bold text-primary">Doctors</h1>
          <AddDoctor setDoctors={setDoctors} />
        </div>
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <Loading />
            ) : doctors.length > 0 ? (
              <DoctorTable doctors={doctors} setDoctors={setDoctors} />
            ) : (
              <NotAvailable title="doctors" />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
