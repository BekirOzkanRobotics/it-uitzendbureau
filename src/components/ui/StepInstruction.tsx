'use client';

interface StepInstructionProps {
  stepNumber: number;
  title: string;
  description: string;
}

export default function StepInstruction({
  stepNumber,
  title,
  description
}: StepInstructionProps) {
  return (
    <div className="mb-6 bg-blue-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
            {stepNumber}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-blue-700 dark:text-blue-400">{title}</h3>
          <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
} 