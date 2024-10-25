'use client'
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Sidebar from './Sidebar'; // Sidebar component
import MainContent from './mainContent'; // MainContent component
import './style.css';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

// Header Component
const Header = () => (
  <header className="bg-white shadow-sm p-4 w-full">
    <div className="flex justify-between items-center w-full"> {/* Added px-4 for controlled padding */}
      {/* Logo aligned to the left */}
      <div className="flex items-center">
        <Link href="/business" className="flex items-center space-x-2">
          <Image
            src="/images/instamarkt_business.png"
            alt="InstaMarkt Logo"
            width={230}
            height={150}
            className="object-contain"
          />
        </Link>
      </div>
     

      {/* Navigation and action buttons aligned to the right */}
      {/* <div className="flex space-x-4">
        <Button className="bg-green-900 hover:bg-green-700 rounded-full text-white">
          <p className="text-white font-bold">Log In</p>
        </Button>
        <Button className="bg-green-900 hover:bg-green-700 rounded-full text-white">
          <p className="text-white font-bold">Sign Up</p>
        </Button>
      </div> */}
    </div>
  </header>
);

export default function Marketplace() {
  const [selectedStep, setSelectedStep] = useState(1);
  const [steps, setSteps] = useState([
    { id: 1, label: 'Order Method', completed: false, locked: false },
    { id: 2, label: 'Store Hours', completed: false, locked: true },  // Initially locked
    { id: 3, label: 'Products / Menu', completed: false, locked: true },  // Initially locked
    { id: 4, label: 'Pricing Plan', completed: false, locked: true },  // Initially locked
    { id: 5, label: 'Bank Account', completed: false, locked: true },  // Initially locked
  ]);

  // Function to unlock next step and set the selected step
  const handleCompleteStep = (stepId) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId
          ? { ...step, completed: true }  // Mark the current step as completed
          : step
      )
    );
    
    // Unlock the next step
    const nextStepId = stepId + 1;
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === nextStepId ? { ...step, locked: false } : step  // Unlock next step
      )
    );

    // Move to the next step
    setSelectedStep(nextStepId);
  };

  return (
    <div>
      {/* Render the Header at the top */}
      <Header />
      
      <div className="flex">
        <Sidebar steps={steps} selectedStep={selectedStep} onSelectStep={setSelectedStep} />
        <MainContent selectedStep={selectedStep} onComplete={handleCompleteStep} />
      </div>
    </div>
  );
}
