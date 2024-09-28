"use client";

import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { hospitalIdState, userRoleState } from "@/store/AdminAtom";

function RecoilRootProvider({ children }) {
  return (
    <RecoilRoot>
      <FetchHospitalId />
      {children}
    </RecoilRoot>
  );
}

function FetchHospitalId() {
  const { data: session } = useSession();
  const setHospitalId = useSetRecoilState(hospitalIdState);
  const setUserRole = useSetRecoilState(userRoleState);

  useEffect(() => {
    if (session?.user?.hospitalId) {
      setHospitalId(session.user.hospitalId);
      setUserRole(session.user.role);
    }
  }, [session, setHospitalId]);

  return null;
}

export default RecoilRootProvider;
