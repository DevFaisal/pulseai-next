"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  getUserData,
  updateUserName,
  updateUserPassword,
} from "@/server/actions/users/fetch-users";
import { toast } from "sonner";
import Loading from "@/components/other/Loading";
import { UserPasswordSchema } from "@/lib/inputValidation";
import ReusableForm from "@/components/other/ReusableForm";
import Inputs from "@/lib/inputs";
import NotAvailable from "@/components/other/NotAvailable";

export default function SettingPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.id) {
        setIsLoading(true);
        try {
          const userData = await getUserData({ userId: session.user.id });
          setUser(userData.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (status === "authenticated") {
      fetchUserData();
    }
  }, [session, status]);

  const handleNameChange = (e) => {
    if (user) {
      setUser({ ...user, name: e.target.value });
    }
  };

  const handleNameSubmit = async () => {
    if (user) {
      try {
        const res = await updateUserName({ id: user.id, name: user.name });
        if (res.error) {
          toast.error(res.error);
        }
        if (res.success) {
          toast.success("Name updated successfully");
        }
      } catch (error) {
        console.error("Failed to update name:");
        toast.error("Failed to update name");
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    if (e.newPassword !== e.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await updateUserPassword({
        id: user.id,
        currentPassword: e.currentPassword,
        confirmPassword: e.confirmPassword,
        newPassword: e.newPassword,
      });
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Password updated successfully");
    } catch (error) {
      console.error("Failed to update password:", error);
      toast.error("Failed to update password");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <NotAvailable title={"User"} />;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Card className="mb-6 rounded-none">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>Your current profile information</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="name" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="name">
            <User className="mr-2 h-4 w-4" /> Name
          </TabsTrigger>
          <TabsTrigger value="password">
            <Lock className="mr-2 h-4 w-4" /> Password
          </TabsTrigger>
        </TabsList>

        <TabsContent value="name">
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle>Change Name</CardTitle>
              <CardDescription>
                Change your display name here. This will be visible to other
                users.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={user.name} onChange={handleNameChange} />
            </CardContent>
            <CardFooter>
              <Button onClick={handleNameSubmit}>Save Name</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Change your password here. We recommend using a strong, unique
                password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ReusableForm
                inputs={Inputs.UserPasswordInput}
                schema={UserPasswordSchema}
                onSubmit={handlePasswordSubmit}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
