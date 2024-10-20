import AddDoctor from "@/components/doctor/AddDoctor";
import Loading from "@/components/other/Loading";
import NotAvailable from "@/components/other/NotAvailable";
import DoctorTable from "@/components/doctor/DoctorTable";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import { fetchDoctors } from "@/server/actions/doctors/fetch-doctors";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Doctors() {
  const { user } = await getServerSession(authOptions);
  const hospitalId = user.hospitalId;
  const doctors = await fetchDoctors({ hospitalId });


  return (
    <ChildrenWrapper
      title={"Doctors"}
      description={"Manage and view doctor details"}
      LeftComponent={() => <AddDoctor />}
    >
      {doctors?.data?.length > 0 ? (
        <DoctorTable doctors={doctors.data} />
      ) : (
        <NotAvailable title={"Doctors"} />
      )}
    </ChildrenWrapper>
  );
}

export function generateMetadata() {
  return {
    title: "Doctors",
    description: "Manage and view doctor details",
  };
}
