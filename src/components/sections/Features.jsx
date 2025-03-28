import React, { memo } from "react";
import { Brain, Activity, Shield, Clock } from "lucide-react";

const features = [
  {
    name: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms provide accurate symptom analysis and health insights.",
    icon: Brain,
  },
  {
    name: "Real-time Monitoring",
    description: "Continuous tracking of vital signs and health metrics for proactive care.",
    icon: Activity,
  },
  {
    name: "Secure Integration",
    description: "Seamless and secure integration with existing healthcare systems and databases.",
    icon: Shield,
  },
  {
    name: "24/7 Availability",
    description: "Round-the-clock access to health data and remote care capabilities.",
    icon: Clock,
  },
];

export const Features = memo(function Features() {
  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Revolutionize Healthcare Management
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Pulse AI brings cutting-edge technology to healthcare, enabling better patient outcomes and streamlined
            operations.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
