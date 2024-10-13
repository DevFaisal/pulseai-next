import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BarChart from "@/components/other/BarChart";
import AdminHeaderCards from "@/components/other/AdminHeaderCards";

export default async function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <AdminHeaderCards />
      <Tabs defaultValue="patients" className="mt-6">
        <TabsList>
          <TabsTrigger value="patients">Patient Growth</TabsTrigger>
        </TabsList>
        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>New Patients Over Time</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 h-[500px] w-full">
              <BarChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
