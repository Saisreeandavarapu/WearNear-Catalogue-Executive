import React from 'react';
import { CheckCircle2, Clock, Truck, PackageCheck, Layers, Box } from 'lucide-react';

export interface TimelineStep {
  id: string;
  title: string;
  timestamp: string;
  description?: string;
  isCompleted: boolean;
  isCurrent?: boolean;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDD7CA]">
      {steps.map((step) => (
        <div key={step.id} className="relative group">
          {/* Node Icon */}
          <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border ${
            step.isCompleted
              ? 'bg-emerald-500 text-white border-emerald-600'
              : step.isCurrent
              ? 'bg-[#243FBA] text-white border-[#172B82] ring-4 ring-blue-100'
              : 'bg-[#F5F0E6] text-[#687085] border-[#DDD7CA]'
          }`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h5 className={`text-xs font-bold ${step.isCompleted || step.isCurrent ? 'text-[#172033]' : 'text-[#687085]'}`}>
                {step.title}
              </h5>
              <span className="text-[11px] font-mono text-[#687085]">
                {step.timestamp}
              </span>
            </div>
            {step.description && (
              <p className="text-xs text-[#687085] mt-0.5">
                {step.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
