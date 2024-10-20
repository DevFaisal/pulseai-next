import FormField from "./FormFieldInput";

const medicationAllergiesFields = [
  {
    name: "medications",
    label: "Current Medications",
    type: "textarea",
    placeholder: "List current medications and dosages",
  },
  {
    name: "allergies",
    label: "Allergies",
    type: "textarea",
    placeholder: "List any allergies",
  },
];

export default function MedicationAllergiesForm({ form }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Medication & Allergies</h2>
      {medicationAllergiesFields.map((field) => (
        <FormField
          key={field.name}
          form={form}
          name={`medicationAllergies.${field.name}`}
          {...field}
        />
      ))}
    </div>
  );
}
