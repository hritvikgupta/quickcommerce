'use client';

import { CheckCircle, Lock, Circle } from 'lucide-react'; // Icons for checkmark and lock
import { useSearchParams } from 'next/navigation'; // For retrieving query parameters in App Router
import { useEffect, useState } from 'react';

export default function Sidebar({ steps, selectedStep, onSelectStep }) {
  const searchParams = useSearchParams(); // Use this hook to get query parameters
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    const businessNameParam = searchParams.get('businessName');
    if (businessNameParam) {
      setBusinessName(`${businessNameParam}`); // Append 'Tea' to the business name
    }
  }, [searchParams]);

  return (
    <div className="w-64 bg-white p-4 border-r border-gray-200 h-full">
      <div className="mb-4">
        <h3 className="font-bold text-black text-lg mb-4">{businessName || 'Your Store Name'}</h3>
        <span className="text-sm text-gray-500">Store</span>
      </div>
      <ul className="space-y-4">
        {steps.map((step) => (
          <li key={step.id}>
            <button
              className={`flex items-center space-x-2 p-2 w-full rounded-lg ${
                step.id === selectedStep ? 'bg-red-100 text-red-600' : 'text-black hover:bg-gray-100'
              }`}
              onClick={() => !step.locked && onSelectStep(step.id)}
              disabled={step.locked}
            >
              {step.completed ? (
                <CheckCircle className="text-green-600" />
              ) : step.locked ? (
                <Lock className="text-gray-400" />
              ) : (
                <Circle className="text-gray-400" />
              )}
              <span className={`font-medium ${step.id === selectedStep ? 'text-red-600' : 'text-black'}`}>
                {step.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
