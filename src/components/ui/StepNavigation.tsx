'use client';

import React from 'react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
  isComplete?: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isNextDisabled = false,
  isComplete = false
}: StepNavigationProps) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        {/* Stappen indicator */}
        <div className="flex items-center">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <div 
                  className={`h-1 w-6 ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
              <div 
                className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                  index < currentStep
                    ? 'bg-blue-600 text-white' 
                    : index === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
            </React.Fragment>
          ))}
        </div>
        
        {/* Stap indicator tekst */}
        <div className="text-sm text-gray-600">
          Stap {currentStep + 1} van {totalSteps}
        </div>
      </div>
      
      {/* Navigatie knoppen */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-md ${
            currentStep === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          } transition-colors`}
        >
          Vorige
        </button>
        
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`px-6 py-2 rounded-md ${
            isComplete
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : isNextDisabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } transition-colors`}
        >
          {isComplete ? 'Verzenden' : 'Volgende'}
        </button>
      </div>
    </div>
  );
} 