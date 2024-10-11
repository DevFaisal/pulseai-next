"use client";

import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { usersDetailsSelector } from "@/store/HospitalAtom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Loading from "@/components/Loading";
import NotAvailable from "@/components/NotAvailable";
import ErrorPage from "@/components/ErrorPage";
import AddUser from "@/components/AddUser";
import UserTable from "@/components/UserTable";
import ChildrenWrapper from "@/components/ChildrenWrapper";

export default function Users() {
  const usersLoadable = useRecoilValueLoadable(usersDetailsSelector);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (usersLoadable.state === "hasValue") {
      setUsers(usersLoadable.contents || []);
    }
    setIsLoading(usersLoadable.state === "loading");
  }, [usersLoadable]);

  if (isLoading) {
    return <Loading />;
  }

  if (usersLoadable.state === "hasError") {
    return <ErrorPage message="Failed to load users" />;
  }

  return (
    <ChildrenWrapper
      title={"Users"}
      description={"Manage and view user details"}
      LeftComponent={() => <AddUser setUsers={setUsers} />}
    >
      <>
        {users.length > 0 ? (
          <UserTable users={users} setUsers={setUsers} />
        ) : (
          <NotAvailable title="users" />
        )}
      </>
    </ChildrenWrapper>
  );
}
