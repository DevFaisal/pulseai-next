import FormField from "./FormFieldInput";

const familyHealthHistoryFields = [
  {
    name: "familyConditions",
    label: "Family Health Conditions",
    type: "textarea",
    placeholder: "List any known family health conditions and the relation",
  },
  {
    name: "noKnownFamilyHistory",
    label: "No known family history",
    type: "checkbox",
  },
];

export default function FamilyHealthHistoryForm({ form }) {
  const noKnownFamilyHistory = form.watch(
    "familyHealthHistory.noKnownFamilyHistory"
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Family Health History</h2>
      {familyHealthHistoryFields.map((field) => (
        <FormField
          key={field.name}
          form={form}
          name={`familyHealthHistory.${field.name}`}
          {...field}
          disabled={
            noKnownFamilyHistory && field.name !== "noKnownFamilyHistory"
          }
        />
      ))}
    </div>
  );
}
