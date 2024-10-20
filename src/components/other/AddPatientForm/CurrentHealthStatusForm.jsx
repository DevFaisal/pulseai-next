import FormField from "./FormFieldInput";

const currentHealthStatusFields = [
  {
    name: "symptoms",
    label: "Symptoms",
    type: "text",
    placeholder: "List any symptoms you are experiencing",
  },
  {
    name: "symptomIntensity",
    label: "Symptom Intensity",
    type: "slider",
    min: 0,
    max: 10,
    step: 1,
  },
  {
    name: "symptomDuration",
    label: "Symptom Duration",
    type: "text",
    placeholder: "e.g., 2 days, 1 week",
  },
  {
    name: "doctorAssigned",
    label: "Doctor Assigned",
    type: "select",
    options: [], // This will be populated with doctors data
  },
];

export default function CurrentHealthStatusForm({ form, doctors }) {
  const doctorOptions = doctors.map((doctor) => ({
    value: doctor.id,
    label: doctor.name,
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Current Health Status</h2>
      {currentHealthStatusFields.map((field) => (
        <FormField
          key={field.name}
          form={form}
          name={`currentHealthStatus.${field.name}`}
          {...field}
          options={
            field.name === "doctorAssigned" ? doctorOptions : field.options
          }
        />
      ))}
    </div>
  );
}
