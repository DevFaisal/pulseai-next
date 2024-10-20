import FormField from "./FormFieldInput";

const lifestyleFactorsFields = [
  {
    name: "smoking",
    label: "Smoking",
    type: "radio",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    name: "alcohol",
    label: "Alcohol Consumption",
    type: "radio",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    name: "diet",
    label: "Diet Type",
    type: "select",
    options: [
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
      { value: "non-vegetarian", label: "Non-Vegetarian" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "exerciseFrequency",
    label: "Exercise Frequency (days per week)",
    type: "slider",
    min: 0,
    max: 7,
    step: 1,
  },
  { name: "sleepHours", label: "Sleep (hours per night)", type: "number" },
];

export default function LifestyleFactorsForm({ form }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Lifestyle Factors</h2>
      {lifestyleFactorsFields.map((field) => (
        <FormField
          key={field.name}
          form={form}
          name={`lifestyleFactors.${field.name}`}
          {...field}
        />
      ))}
    </div>
  );
}
