"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Heart, Thermometer, Wind, Activity, Droplet } from "lucide-react";
import axios from "axios";

export default function PatientVitalsPage() {
  const [patient, setPatient] = useState({
    id: 1,
    name: "Fatima Johnson",
    age: 42,
    gender: "Female",
    bloodType: "A+",
    primaryCondition: "Type 2 Diabetes",
    status: "Stable",
  });

  // const [currentVitals, setCurrentVitals] = useState({
  // blood_pressure: [],
  // temperature: [],
  // blood_sugar: [],
  // weight: [],
  // heart_rate: [],
  // oxygen_saturation: [],
  // });

  //Mock data
  const [currentVitals, setCurrentVitals] = useState({
    blood_pressure: [
      {
        id: 0,
        systolic: "120",
        diastolic: "80",
        created_date: "2024-10-01T07:50:30.467000",
      },
      {
        id: 1,
        systolic: "118",
        diastolic: "76",
        created_date: "2024-10-05T07:51:30.467000",
      },
      {
        id: 2,
        systolic: "115",
        diastolic: "78",
        created_date: "2024-10-10T08:01:02.345000",
      },
      {
        id: 3,
        systolic: "117",
        diastolic: "79",
        created_date: "2024-10-15T08:00:47.606000",
      },
      {
        id: 4,
        systolic: "116",
        diastolic: "75",
        created_date: "2024-10-20T08:05:30.467000",
      },
      {
        id: 5,
        systolic: "114",
        diastolic: "77",
        created_date: "2024-10-25T07:52:30.467000",
      },
      {
        id: 6,
        systolic: "113",
        diastolic: "76",
        created_date: "2024-10-29T08:01:02.345000",
      },
    ],
    temperature: [
      {
        id: 1,
        temperature: "36.8",
        unit: "C",
        created_date: "2024-10-01T07:53:02.446000",
      },
      {
        id: 2,
        temperature: "37.0",
        unit: "C",
        created_date: "2024-10-10T07:53:02.446000",
      },
      {
        id: 3,
        temperature: "36.9",
        unit: "C",
        created_date: "2024-10-20T07:53:02.446000",
      },
      {
        id: 4,
        temperature: "37.1",
        unit: "C",
        created_date: "2024-10-25T07:53:02.446000",
      },
      {
        id: 5,
        temperature: "36.7",
        unit: "C",
        created_date: "2024-10-29T07:53:02.446000",
      },
    ],
    blood_sugar: [
      {
        id: 1,
        blood_glucose: "5.8",
        unit: "mmol/L",
        created_date: "2024-10-02T07:51:10.496000",
      },
      {
        id: 2,
        blood_glucose: "6.0",
        unit: "mmol/L",
        created_date: "2024-10-15T07:51:10.496000",
      },
      {
        id: 3,
        blood_glucose: "6.2",
        unit: "mmol/L",
        created_date: "2024-10-28T07:51:10.496000",
      },
    ],
    weight: [
      {
        id: 1,
        weight: "126.5",
        unit: "lb",
        created_date: "2024-10-01T07:51:29.653000",
      },
      {
        id: 2,
        weight: "127.0",
        unit: "lb",
        created_date: "2024-10-10T07:51:29.653000",
      },
      {
        id: 3,
        weight: "126.8",
        unit: "lb",
        created_date: "2024-10-20T07:51:29.653000",
      },
      {
        id: 4,
        weight: "126.7",
        unit: "lb",
        created_date: "2024-10-29T07:51:29.653000",
      },
    ],
    heart_rate: [
      {
        id: 1,
        heart_rate: "65",
        created_date: "2024-10-01T07:50:31.716000",
      },
      {
        id: 2,
        heart_rate: "63",
        created_date: "2024-10-05T07:50:47.606000",
      },
      {
        id: 3,
        heart_rate: "70",
        created_date: "2024-10-10T07:54:10.054000",
      },
      {
        id: 4,
        heart_rate: "68",
        created_date: "2024-10-15T08:01:02.345000",
      },
      {
        id: 5,
        heart_rate: "72",
        created_date: "2024-10-20T08:01:02.345000",
      },
      {
        id: 6,
        heart_rate: "64",
        created_date: "2024-10-25T08:01:02.345000",
      },
    ],
    oxygen_saturation: [
      {
        id: 1,
        spo2: "98",
        created_date: "2024-10-01T07:54:10.054000",
      },
      {
        id: 2,
        spo2: "97",
        created_date: "2024-10-10T07:54:10.054000",
      },
      {
        id: 3,
        spo2: "96",
        created_date: "2024-10-20T07:54:10.054000",
      },
      {
        id: 4,
        spo2: "98",
        created_date: "2024-10-29T07:54:10.054000",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await axios.get("/api/patient/1");
        setPatient(patientResponse.data);

        const vitalsResponse = await axios.get("/api/patient/1/vitals"); // Replace with actual API endpoint
        setCurrentVitals(vitalsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getLatestVital = (vitalArray) => {
    return vitalArray.length > 0 ? vitalArray[vitalArray.length - 1] : null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const renderLineChart = (data, dataKey, color, unit) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_date" tickFormatter={formatDate} />
        <YAxis />
        <Tooltip labelFormatter={formatDate} />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          activeDot={{ r: 8 }}
          unit={unit}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${patient.name}`}
                alt={patient.name}
              />
              <AvatarFallback>
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{patient.name}</CardTitle>
              <CardDescription>
                {patient.age} years old • {patient.gender} • {patient.bloodType}
              </CardDescription>
              <Badge
                variant={
                  patient.status === "Stable"
                    ? "secondary"
                    : patient.status === "Needs Attention"
                    ? "warning"
                    : patient.status === "Critical"
                    ? "destructive"
                    : "default"
                }
              >
                {patient.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Vitals</CardTitle>
          <CardDescription>
            Last recorded: {formatDate(new Date().toISOString())}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Blood Pressure
                </p>
                <p className="text-lg font-semibold">
                  {getLatestVital(currentVitals.blood_pressure)?.systolic}/
                  {getLatestVital(currentVitals.blood_pressure)?.diastolic} mmHg
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Heart Rate</p>
                <p className="text-lg font-semibold">
                  {getLatestVital(currentVitals.heart_rate)?.heart_rate} bpm
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Temperature</p>
                <p className="text-lg font-semibold">
                  {getLatestVital(currentVitals.temperature)?.temperature}°
                  {getLatestVital(currentVitals.temperature)?.unit}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Blood Sugar</p>
                <p className="text-lg font-semibold">
                  {getLatestVital(currentVitals.blood_sugar)?.blood_glucose}{" "}
                  {getLatestVital(currentVitals.blood_sugar)?.unit}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Droplet className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Oxygen Saturation
                </p>
                <p className="text-lg font-semibold">
                  {getLatestVital(currentVitals.oxygen_saturation)?.spo2}%
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Weight</p>
                <p className="text-lg font-semibold">
                  {getLatestVital(currentVitals.weight)?.weight}{" "}
                  {getLatestVital(currentVitals.weight)?.unit}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vitals History</CardTitle>
          <CardDescription>Trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bloodPressure">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
              <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="bloodSugar">Blood Sugar</TabsTrigger>
              <TabsTrigger value="oxygenSaturation">
                Oxygen Saturation
              </TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
            </TabsList>
            <TabsContent value="bloodPressure">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Pressure History</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderLineChart(
                    currentVitals.blood_pressure,
                    "systolic",
                    "#8884d8",
                    " mmHg"
                  )}
                  {renderLineChart(
                    currentVitals.blood_pressure,
                    "diastolic",
                    "#82ca9d",
                    " mmHg"
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="heartRate">
              <Card>
                <CardHeader>
                  <CardTitle>Heart Rate History</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderLineChart(
                    currentVitals.heart_rate,
                    "heart_rate",
                    "#8884d8",
                    " bpm"
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="temperature">
              <Card>
                <CardHeader>
                  <CardTitle>Temperature History</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderLineChart(
                    currentVitals.temperature,
                    "temperature",
                    "#ffc658",
                    "°C"
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bloodSugar">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Sugar History</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderLineChart(
                    currentVitals.blood_sugar,
                    "blood_glucose",
                    "#82ca9d",
                    " mmol/L"
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="oxygenSaturation">
              <Card>
                <CardHeader>
                  <CardTitle>Oxygen Saturation History</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderLineChart(
                    currentVitals.oxygen_saturation,
                    "spo2",
                    "#8884d8",
                    "%"
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="weight">
              <Card>
                <CardHeader>
                  <CardTitle>Weight History</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderLineChart(
                    currentVitals.weight,
                    "weight",
                    "#ffc658",
                    " lb"
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Vitals Log</CardTitle>
          <CardDescription>Detailed history of recorded vitals</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Blood Pressure</TableHead>
                <TableHead>Heart Rate</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Blood Sugar</TableHead>
                <TableHead>Oxygen Saturation</TableHead>
                <TableHead>Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentVitals.blood_pressure.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(record.created_date)}</TableCell>
                  <TableCell>
                    {record.systolic}/{record.diastolic} mmHg
                  </TableCell>
                  <TableCell>
                    {currentVitals.heart_rate[index]?.heart_rate || "-"} bpm
                  </TableCell>
                  <TableCell>
                    {currentVitals.temperature[index]?.temperature || "-"}°
                    {currentVitals.temperature[index]?.unit || "C"}
                  </TableCell>
                  <TableCell>
                    {currentVitals.blood_sugar[index]?.blood_glucose || "-"}{" "}
                    {currentVitals.blood_sugar[index]?.unit || "mmol/L"}
                  </TableCell>
                  <TableCell>
                    {currentVitals.oxygen_saturation[index]?.spo2 || "-"}%
                  </TableCell>
                  <TableCell>
                    {currentVitals.weight[index]?.weight || "-"}{" "}
                    {currentVitals.weight[index]?.unit || "lb"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
