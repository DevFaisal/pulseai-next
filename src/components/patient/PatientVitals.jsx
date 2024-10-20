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
import { fetchVitals, getAuthToken } from "@/lib/fetchVitals";
import Loading from "../other/Loading";

const VALID_VITAL_TYPES = [
  "blood_pressure",
  "blood_sugar",
  "temperature",
  "weight",
  "heart_rate",
  "oxygen_saturation",
];

export default function PatientVitals() {
  const [patient, setPatient] = useState({
    id: 1,
    name: "Johnson",
    age: 42,
    gender: "Male",
    bloodType: "A+",
    primaryCondition: "Type 2 Diabetes",
    status: "Stable",
  });

  const [currentVitals, setCurrentVitals] = useState({
    blood_pressure: [],
    temperature: [],
    blood_sugar: [],
    weight: [],
    heart_rate: [],
    oxygen_saturation: [],
  });

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const patientId = "my_id_1001";

  const fetchDataWithToken = async (authToken) => {
    try {
      const res = await Promise.all(
        VALID_VITAL_TYPES.map((type) =>
          fetchVitals({ type, firebaseId: patientId, token: authToken })
        )
      );
      const newVitals = VALID_VITAL_TYPES.reduce((acc, type, index) => {
        acc[type] = res[index]?.[type] || [];
        return acc;
      }, {});
      setCurrentVitals(newVitals);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch vitals:", error.status);
      if (error.status === 401) {
        console.log("Refreshing token...");
        const newToken = await getAuthToken();
        setToken(newToken);
        await fetchDataWithToken(newToken);
      }
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      const initialToken = await getAuthToken();
      setToken(initialToken);
      await fetchDataWithToken(initialToken);
    };

    initFetch();
  }, []);

  useEffect(() => {
    if (token) {
      fetchDataWithToken(token);
    }
  }, [token]);

  const getLatestVital = (vitalArray) =>
    vitalArray.length > 0 ? vitalArray[vitalArray.length - 1] : null;
  const formatDate = (dateString) => new Date(dateString).toLocaleString();

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

  const renderVitalCard = (icon, title, value, unit) => (
    <Card className="flex flex-col items-center justify-center p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      <p className="text-2xl font-bold">
        {value}{" "}
        <span className="text-sm font-normal text-gray-500">{unit}</span>
      </p>
    </Card>
  );

  const renderVitalTable = (title, data, columns) => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              {columns.map((column, index) => (
                <TableHead key={index}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(record.created_date)}</TableCell>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {record[column.key]} {column.unit}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <Card className="mb-8 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20 border-4 border-white">
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
              <CardTitle className="text-3xl">{patient.name}</CardTitle>
              <CardDescription className="text-gray-200">
                {patient.age} years old • {patient.gender} • {patient.bloodType}
              </CardDescription>
              <Badge
                className="mt-2"
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Current Vitals</CardTitle>
          <CardDescription>
            Last recorded: {formatDate(new Date().toISOString())}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {renderVitalCard(
              <Heart className="text-red-500" />,
              "Blood Pressure",
              `${getLatestVital(currentVitals.blood_pressure)?.systolic}/${
                getLatestVital(currentVitals.blood_pressure)?.diastolic
              }`,
              "mmHg"
            )}
            {renderVitalCard(
              <Activity className="text-blue-500" />,
              "Heart Rate",
              getLatestVital(currentVitals.heart_rate)?.heart_rate,
              "bpm"
            )}
            {renderVitalCard(
              <Thermometer className="text-yellow-500" />,
              "Temperature",
              getLatestVital(currentVitals.temperature)?.temperature,
              `°${getLatestVital(currentVitals.temperature)?.unit}`
            )}
            {renderVitalCard(
              <Wind className="text-green-500" />,
              "Blood Sugar",
              getLatestVital(currentVitals.blood_sugar)?.blood_glucose,
              getLatestVital(currentVitals.blood_sugar)?.unit
            )}
            {renderVitalCard(
              <Droplet className="text-blue-500" />,
              "Oxygen Saturation",
              getLatestVital(currentVitals.oxygen_saturation)?.spo2,
              "%"
            )}
            {renderVitalCard(
              <Activity className="text-purple-500" />,
              "Weight",
              getLatestVital(currentVitals.weight)?.weight,
              getLatestVital(currentVitals.weight)?.unit
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Vitals History</CardTitle>
          <CardDescription>Trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bloodPressure" className="space-y-4">
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
                    currentVitals?.blood_pressure,
                    "systolic",
                    "#8884d8",
                    " mmHg"
                  )}
                  {renderLineChart(
                    currentVitals?.blood_pressure,
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

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Vitals Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bloodPressure-logs">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-4">
              <TabsTrigger value="bloodPressure-logs">
                Blood Pressure
              </TabsTrigger>
              <TabsTrigger value="heartRate-logs">Heart Rate</TabsTrigger>
              <TabsTrigger value="temperature-logs">Temperature</TabsTrigger>
              <TabsTrigger value="bloodSugar-logs">Blood Sugar</TabsTrigger>
              <TabsTrigger value="oxygenSaturation-logs">
                Oxygen Saturation
              </TabsTrigger>
              <TabsTrigger value="weight-logs">Weight</TabsTrigger>
            </TabsList>
            <TabsContent value="bloodPressure-logs">
              {renderVitalTable(
                "Blood Pressure Log",
                currentVitals.blood_pressure,
                [
                  { header: "Systolic", key: "systolic", unit: "mmHg" },
                  { header: "Diastolic", key: "diastolic", unit: "mmHg" },
                ]
              )}
            </TabsContent>
            <TabsContent value="heartRate-logs">
              {renderVitalTable("Heart Rate Log", currentVitals.heart_rate, [
                { header: "Heart Rate", key: "heart_rate", unit: "bpm" },
              ])}
            </TabsContent>
            <TabsContent value="temperature-logs">
              {renderVitalTable("Temperature Log", currentVitals.temperature, [
                { header: "Temperature", key: "temperature", unit: "°C" },
              ])}
            </TabsContent>
            <TabsContent value="bloodSugar-logs">
              {renderVitalTable("Blood Sugar Log", currentVitals.blood_sugar, [
                {
                  header: "Blood Glucose",
                  key: "blood_glucose",
                  unit: "mmol/L",
                },
              ])}
            </TabsContent>
            <TabsContent value="oxygenSaturation-logs">
              {renderVitalTable(
                "Oxygen Saturation Log",
                currentVitals.oxygen_saturation,
                [{ header: "SpO2", key: "spo2", unit: "%" }]
              )}
            </TabsContent>
            <TabsContent value="weight-logs">
              {renderVitalTable("Weight Log", currentVitals.weight, [
                { header: "Weight", key: "weight", unit: "lb" },
              ])}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
