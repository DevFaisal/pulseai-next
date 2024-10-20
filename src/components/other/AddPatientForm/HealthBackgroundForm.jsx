import FormField from "./FormFieldInput";

const healthBackgroundFields = [
  {
    name: "medicalConditions",
    label: "Medical Conditions",
    type: "select",
    options: [
      { value: "diabetes", label: "Diabetes" },
      { value: "hypertension", label: "Hypertension" },
      { value: "asthma", label: "Asthma" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "previousSurgeries",
    label: "Previous Surgeries",
    type: "textarea",
    placeholder: "List any previous surgeries with dates",
  },
  {
    name: "ongoingTreatments",
    label: "Ongoing Treatments or Therapies",
    type: "textarea",
    placeholder: "List any ongoing treatments or therapies",
  },
  {
    name: "noKnownHistory",
    label: "No known medical history",
    type: "checkbox",
  },
];

export default function HealthBackgroundForm({ form }) {
  const noKnownHistory = form.watch("healthBackground.noKnownHistory");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Health Background</h2>
      {healthBackgroundFields.map((field) => (
        <FormField
          key={field.name}
          form={form}
          name={`healthBackground.${field.name}`}
          {...field}
          disabled={noKnownHistory && field.name !== "noKnownHistory"}
        />
      ))}
    </div>
  );
}
