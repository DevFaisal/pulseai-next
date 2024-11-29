import React from 'react';
import { Users, Building2, Brain } from 'lucide-react';

const stats = [
  { label: 'Healthcare Providers', value: '2,000+', icon: Building2 },
  { label: 'Patients Served', value: '1M+', icon: Users },
  { label: 'AI Predictions', value: '99.9%', icon: Brain },
];

export function Stats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-8 lg:mt-12">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}