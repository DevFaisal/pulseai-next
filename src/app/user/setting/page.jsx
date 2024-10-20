import Settings from "@/components/other/Settings";
import { authOptions } from "@/lib/auth";
import { getUserData } from "@/server/actions/users/fetch-users";
import { getServerSession } from "next-auth";

export default async function SettingPage() {
  const { user } = await getServerSession(authOptions);
  const userId = user.id;
  const userData = await getUserData({ userId });

  return <Settings user={userData.data} />;
}

export function generateMetadata() {
  return {
    title: "Settings",
    description: "Update your profile information and change your password",
  };
}
