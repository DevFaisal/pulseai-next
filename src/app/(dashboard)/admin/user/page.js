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
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h1 className="text-3xl font-bold text-primary">User Management</h1>
          {/* Add user button can be added here if needed */}
          <AddUser setUsers={setUsers} />
        </div>
        <Card className="shadow-md">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[250px] font-bold">User</TableHead>
                  <TableHead className="w-[200px] font-bold">Email</TableHead>
                  <TableHead className="w-[150px] font-bold">Role</TableHead>
                  <TableHead className="w-[200px] font-bold">
                    Member Since
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  <UserTable users={users} setUsers={setUsers} />
                ) : (
                  <NotAvailable title="users" />
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
