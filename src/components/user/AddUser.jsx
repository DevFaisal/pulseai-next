"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReusableFormWithSelect from "@/components/other/ReusableFormWithSelect";
import Inputs from "@/lib/inputs";
import { useRecoilValue } from "recoil";
import { hospitalIdState } from "@/store/AdminAtom";
import { userSchema } from "@/lib/inputValidation";
import { toast } from "sonner";
import { createUser } from "@/server/actions/users/create-user";

export default function AddUser() {
  const hospitalId = useRecoilValue(hospitalIdState);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const newUser = await createUser({
        formData: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "USER",
        },
        hospitalId,
      });

      if (newUser.error) {
        toast.error(newDoctor.error);
        return;
      }
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding user");
    }
  };

  const inputs = Inputs.AddUserInput;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new User.
          </DialogDescription>
        </DialogHeader>
        {/* Using ReusableFormWithSelect */}
        <ReusableFormWithSelect
          schema={userSchema}
          inputs={inputs}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
