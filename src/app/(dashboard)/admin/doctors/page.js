"use client";

import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { AdminDoctorsSelector } from "@/store/AdminAtom";
import { toast } from "sonner";
import AddDoctor from "@/components/doctor/AddDoctor";
import Loading from "@/components/other/Loading";
import NotAvailable from "@/components/other/NotAvailable";
import DoctorTable from "@/components/doctor/DoctorTable";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";

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
    <ChildrenWrapper
      title={"Doctors"}
      description={"Manage and view doctor details"}
      LeftComponent={() => <AddDoctor setDoctors={setDoctors} />}
    >
      <div>
        {loading ? (
          <Loading />
        ) : doctors.length > 0 ? (
          <DoctorTable doctors={doctors} setDoctors={setDoctors} />
        ) : (
          <NotAvailable title="doctors" />
        )}
      </div>
    </ChildrenWrapper>
  );
}
