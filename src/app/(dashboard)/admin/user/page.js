import NotAvailable from "@/components/other/NotAvailable";
import AddUser from "@/components/user/AddUser";
import UserTable from "@/components/user/UserTable";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import { fetchUsers } from "@/server/actions/users/fetch-users";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Users() {
  const { user } = await getServerSession(authOptions);
  const hospitalId = user.hospitalId;
  const users = await fetchUsers({ hospitalId });

  return (
    <ChildrenWrapper
      title={"Users"}
      description={"Manage and view user details"}
      LeftComponent={() => <AddUser />}
    >
      {users.data?.length > 0 ? (
        <UserTable users={users.data} />
      ) : (
        <NotAvailable title={"Users"} />
      )}
    </ChildrenWrapper>
  );
}

export function generateMetadata() {
  return {
    title: "Users",
    description: "Manage and view user details",
  };
}
