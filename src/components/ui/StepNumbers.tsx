'use client';

import React from 'react';

interface StepNumbersProps {
  currentStep: number;
  steps: string[];
}

export default function StepNumbers({ currentStep, steps }: StepNumbersProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className={`h-1 w-10 lg:w-16 mx-1 ${
                index <= currentStep 
                  ? 'bg-blue-600 dark:bg-blue-500' 
                  : 'bg-gray-300 dark:bg-gray-700'
              }`} />
            )}
            <div className="flex flex-col items-center">
              <div className={`
                flex items-center justify-center h-10 w-10 rounded-full 
                text-sm font-medium transition-colors
                ${
                  index === currentStep
                    ? 'bg-blue-600 text-white' 
                    : index < currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }
              `}>
                {index + 1}
              </div>
              <div className={`
                text-xs mt-1 text-center w-16 lg:w-24 truncate
                ${
                  index === currentStep
                    ? 'text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-gray-500 dark:text-gray-400'
                }
              `}>
                {step}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
} 