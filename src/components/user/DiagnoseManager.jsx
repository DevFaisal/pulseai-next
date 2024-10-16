"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Code } from "@/lib/ICD_CODS";

export function DiagnoseManager({ patient, onDiagnoseSubmit }) {
  const [icdCode, setIcdCode] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!icdCode) {
      setError("Please select an ICD code");
      return;
    }
    if (!note.trim()) {
      setError("Please enter a diagnosis note");
      return;
    }
    onDiagnoseSubmit({ icdCode, note });
    setSuccess(true);
    setError(null);
    setTimeout(() => {
      setIcdCode("");
      setNote("");
      setSuccess(false);
    }, 3000);
  };

  return (
    <Card className="w-full rounded-none ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Diagnose Patient</CardTitle>
        <CardDescription>
          Provide a diagnosis for {patient.name} using ICD-10 codes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="icd-code">ICD-10 Code</Label>
          <Select value={icdCode} onValueChange={setIcdCode}>
            <SelectTrigger id="icd-code" className="w-full">
              <SelectValue placeholder="Select ICD-10 Code" />
            </SelectTrigger>
            <SelectContent>
              {Code.map((item, index) => (
                <SelectItem key={index} value={item.code}>
                  {item.code} - {item.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="diagnosis-note">Diagnosis Note</Label>
          <Textarea
            id="diagnosis-note"
            placeholder="Enter your diagnosis notes here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">
            This note will be visible to the patient and other healthcare
            providers.
          </p>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert
            variant="default"
            className="bg-green-50 text-green-800 border-green-200"
          >
            <Check className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Diagnosis submitted successfully.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <div>
          <Button onClick={handleSubmit} className="w-full">
            Submit Diagnosis
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
