"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, FileText, Pill } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  return (
    <Card className="flex-1 rounded-none">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => router.push(`/user/patient/vitals`)}
            className="h-20 flex flex-col items-center justify-center"
          >
            <Activity className="h-6 w-6 mb-2" />
            Vitals
          </Button>
          <Button className="h-20 flex flex-col items-center justify-center">
            <Pill className="h-6 w-6 mb-2" />
            Medications
          </Button>
          <Button className="h-20 flex flex-col items-center justify-center">
            <Calendar className="h-6 w-6 mb-2" />
            Schedule Appointment
          </Button>
          <Button className="h-20 flex flex-col items-center justify-center">
            <FileText className="h-6 w-6 mb-2" />
            Add Note
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
