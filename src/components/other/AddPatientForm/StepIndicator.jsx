
import { Check } from "lucide-react";

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
            </div>
            <span className="text-sm mt-2">{step}</span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-muted mt-4 rounded-full">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}