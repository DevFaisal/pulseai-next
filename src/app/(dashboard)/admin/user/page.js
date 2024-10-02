"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRecoilValueLoadable } from "recoil";
import { useEffect, useState } from "react";
import { usersDetailsSelector } from "@/store/HospitalAtom";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import DeleteDialog from "@/components/DeleteDialog";
import Loading from "@/components/Loading";
import NotAvailable from "@/components/NotAvailable";

export default function Component() {
  const usersLoadable = useRecoilValueLoadable(usersDetailsSelector);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to handle loadable state changes
  useEffect(() => {
    if (usersLoadable.state === "hasValue") {
      setUsers(usersLoadable.contents || []);
    }
    setIsLoading(usersLoadable.state === "loading");
  }, [usersLoadable]);

  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle error state
  if (usersLoadable.state === "hasError") {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <h1 className="text-2xl font-semibold text-red-500">
          Error loading users
        </h1>
        <p>{usersLoadable.contents?.message || "Something went wrong."}</p>
      </div>
    );
  }

  // Render users table or empty state
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h1 className="text-3xl font-bold text-primary">Users</h1>
        </div>
        <Card>
          {users.length > 0 ? (
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Since</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-bold">{user.name}</div>
                      </TableCell>
                      <TableCell>
                        <div>{user.email}</div>
                      </TableCell>
                      <TableCell>
                        <div>{new Date(user.createdAt).toDateString()}</div>
                      </TableCell>
                      <TableCell>
                        <DeleteDialog
                          title={"Delete User"}
                          description={
                            "Are you sure you want to delete this user?"
                          }
                          onClick={() => {}}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          ) : (
            <NotAvailable title="users" />
          )}
        </Card>
      </main>
    </div>
  );
}
