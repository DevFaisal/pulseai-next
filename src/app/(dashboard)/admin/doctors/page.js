import AddDoctor from "@/components/doctor/AddDoctor";
import Loading from "@/components/other/Loading";
import NotAvailable from "@/components/other/NotAvailable";
import DoctorTable from "@/components/doctor/DoctorTable";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import { fetchDoctors } from "@/server/actions/doctors/fetch-doctors";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Doctors() {
  const { user } = await getServerSession(NEXT_AUTH);
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
