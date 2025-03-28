"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Heart, Thermometer, Wind, Activity, Droplet } from "lucide-react";
import { fetchVitals } from "@/lib/fetchVitals";
import Loading from "../other/Loading";

export default function PatientVitals({ userId }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVitals, setCurrentVitals] = useState({
    blood_pressure: [],
    temperature: [],
    blood_sugar: [],
    weight: [],
    heart_rate: [],
    oxygen_saturation: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchVitals({ firebaseId: userId });

        if (res?.data) {
          const processedVitals = {
            blood_pressure:
              res.data.blood_pressure?.map((item) => ({
                systolic: item.systolic,
                diastolic: item.diastolic,
                timestamp: item.timestamp,
                unit: "mmHg",
                id: item.id,
              })) || [],
            heart_rate:
              res.data.heart_rate?.map((item) => ({
                value: item.value,
                timestamp: item.timestamp,
                unit: "bpm",
                id: item.id,
              })) || [],
            temperature:
              res.data.temperature?.map((item) => ({
                value: item.value,
                timestamp: item.timestamp,
                unit: "°C",
                id: item.id,
              })) || [],
            blood_sugar:
              res.data.blood_sugar?.map((item) => ({
                value: item.value,
                timestamp: item.timestamp,
                unit: "mmol/L",
                id: item.id,
              })) || [],
            oxygen_saturation:
              res.data.oxygen_saturation?.map((item) => ({
                value: item.value,
                timestamp: item.timestamp,
                unit: "%",
                id: item.id,
              })) || [],
            weight:
              res.data.weight?.map((item) => ({
                value: item.value,
                timestamp: item.timestamp,
                unit: "kg",
                id: item.id,
              })) || [],
          };

          setCurrentVitals(processedVitals);
        } else {
          setError("Failed to fetch vitals data");
        }
      } catch (err) {
        console.error("Error fetching vitals:", err);
        setError("An error occurred while fetching vitals");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const getLatestVital = (vitalArray) => (vitalArray.length > 0 ? vitalArray[vitalArray.length - 1] : null);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (err) {
      console.error("Error formatting date:", err);
      return "Invalid Date";
    }
  };

  const renderLineChart = (data, dataKey, color, unit) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tickFormatter={formatDate} />
        <YAxis />
        <Tooltip labelFormatter={formatDate} />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke={color} activeDot={{ r: 8 }} unit={unit} />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderVitalCard = (icon, title, value, unit) => (
    <Card className="flex flex-col items-center justify-center p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      <p className="text-2xl font-bold">
        {value || "N/A"} <span className="text-sm font-normal text-gray-500">{unit}</span>
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
            {data.length > 0 ? (
              data.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(record.timestamp)}</TableCell>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {record[column.key]} {column.unit}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Current Vitals</CardTitle>
          <CardDescription>Last recorded: {formatDate(new Date().toISOString())}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {renderVitalCard(
              <Heart className="text-red-500" />,
              "Blood Pressure",
              `${getLatestVital(currentVitals.blood_pressure)?.systolic || 0}/${
                getLatestVital(currentVitals.blood_pressure)?.diastolic || 0
              }`,
              "mmHg"
            )}
            {renderVitalCard(
              <Activity className="text-blue-500" />,
              "Heart Rate",
              getLatestVital(currentVitals.heart_rate)?.value,
              "bpm"
            )}
            {renderVitalCard(
              <Thermometer className="text-yellow-500" />,
              "Temperature",
              getLatestVital(currentVitals.temperature)?.value,
              "°C"
            )}
            {renderVitalCard(
              <Wind className="text-green-500" />,
              "Blood Sugar",
              getLatestVital(currentVitals.blood_sugar)?.value,
              "mmol/L"
            )}
            {renderVitalCard(
              <Droplet className="text-blue-500" />,
              "Oxygen Saturation",
              getLatestVital(currentVitals.oxygen_saturation)?.value,
              "%"
            )}
            {renderVitalCard(
              <Activity className="text-purple-500" />,
              "Weight",
              getLatestVital(currentVitals.weight)?.value,
              "kg"
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
              <TabsTrigger value="oxygenSaturation">Oxygen Saturation</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
            </TabsList>
            <TabsContent value="bloodPressure">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Pressure History</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderLineChart(currentVitals?.blood_pressure, "systolic", "#8884d8", " mmHg")}
                  {renderLineChart(currentVitals?.blood_pressure, "diastolic", "#82ca9d", " mmHg")}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="heartRate">
              <Card>
                <CardHeader>
                  <CardTitle>Heart Rate History</CardTitle>
                </CardHeader>
                <CardContent>{renderLineChart(currentVitals.heart_rate, "value", "#8884d8", " bpm")}</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="temperature">
              <Card>
                <CardHeader>
                  <CardTitle>Temperature History</CardTitle>
                </CardHeader>
                <CardContent>{renderLineChart(currentVitals.temperature, "value", "#ffc658", "°C")}</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bloodSugar">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Sugar History</CardTitle>
                </CardHeader>
                <CardContent>{renderLineChart(currentVitals.blood_sugar, "value", "#82ca9d", " mmol/L")}</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="oxygenSaturation">
              <Card>
                <CardHeader>
                  <CardTitle>Oxygen Saturation History</CardTitle>
                </CardHeader>
                <CardContent>{renderLineChart(currentVitals.oxygen_saturation, "value", "#8884d8", "%")}</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="weight">
              <Card>
                <CardHeader>
                  <CardTitle>Weight History</CardTitle>
                </CardHeader>
                <CardContent>{renderLineChart(currentVitals.weight, "value", "#ffc658", " kg")}</CardContent>
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
              <TabsTrigger value="bloodPressure-logs">Blood Pressure</TabsTrigger>
              <TabsTrigger value="heartRate-logs">Heart Rate</TabsTrigger>
              <TabsTrigger value="temperature-logs">Temperature</TabsTrigger>
              <TabsTrigger value="bloodSugar-logs">Blood Sugar</TabsTrigger>
              <TabsTrigger value="oxygenSaturation-logs">Oxygen Saturation</TabsTrigger>
              <TabsTrigger value="weight-logs">Weight</TabsTrigger>
            </TabsList>
            <TabsContent value="bloodPressure-logs">
              {renderVitalTable("Blood Pressure Log", currentVitals.blood_pressure, [
                { header: "Systolic", key: "systolic", unit: "mmHg" },
                { header: "Diastolic", key: "diastolic", unit: "mmHg" },
              ])}
            </TabsContent>
            <TabsContent value="heartRate-logs">
              {renderVitalTable("Heart Rate Log", currentVitals.heart_rate, [
                { header: "Heart Rate", key: "value", unit: "bpm" },
              ])}
            </TabsContent>
            <TabsContent value="temperature-logs">
              {renderVitalTable("Temperature Log", currentVitals.temperature, [
                { header: "Temperature", key: "value", unit: "°C" },
              ])}
            </TabsContent>
            <TabsContent value="bloodSugar-logs">
              {renderVitalTable("Blood Sugar Log", currentVitals.blood_sugar, [
                { header: "Blood Glucose", key: "value", unit: "mmol/L" },
              ])}
            </TabsContent>
            <TabsContent value="oxygenSaturation-logs">
              {renderVitalTable("Oxygen Saturation Log", currentVitals.oxygen_saturation, [
                { header: "SpO2", key: "value", unit: "%" },
              ])}
            </TabsContent>
            <TabsContent value="weight-logs">
              {renderVitalTable("Weight Log", currentVitals.weight, [{ header: "Weight", key: "value", unit: "kg" }])}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
