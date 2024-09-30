import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

export function AddPatientsInBulk() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div >
      <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
        Bulk Patient Upload
      </h2>
      <div className="grid w-full items-center gap-4">
        <Label htmlFor="csv" className="text-muted-foreground">
          Upload CSV File
        </Label>
        <div className="flex items-center">
          <Input
            id="csv"
            type="file"
            accept=".csv"
            onChange={handleFileChange}

          />
        </div>
        {fileName && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected file: <span className="font-medium">{fileName}</span>
          </p>
        )}
        <Button
          type="button"
          className="mt-4"
          disabled={!fileName} 
        >
          {fileName ? "Upload" : "Choose a file to upload"}
        </Button>
      </div>
    </div>
  );
}
