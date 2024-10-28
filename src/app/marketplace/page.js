"use client";
import { Suspense, useState, useEffect } from "react"; // Add useEffect here
import Sidebar from './Sidebar'; // Sidebar component
import MainContent from './mainContent'; // MainContent component
import './style.css';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'; // Assuming you're using Next.js 13+

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
}

const Header = () => (
  <header className="bg-white shadow-sm p-4 w-full">
    <div className="flex justify-between items-center w-full">
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
    </div>
  </header>
);

function MarketplaceContent() {
  const searchParams = useSearchParams(); // Get query parameters
  const [businessName, setBusinessName] = useState('');
  const [selectedStep, setSelectedStep] = useState(1);
  const [steps, setSteps] = useState([
    { id: 1, label: 'Order Method', completed: false, locked: false },
    { id: 2, label: 'Store Hours', completed: false, locked: true },
    { id: 3, label: 'Products / Menu', completed: false, locked: true },
    { id: 4, label: 'Pricing Plan', completed: false, locked: true },
    { id: 5, label: 'Bank Account', completed: false, locked: true },
  ]);
  
  useEffect(() => {
    const businessNameParam = searchParams.get('businessName');
    if (businessNameParam) {
      setBusinessName(`${businessNameParam} `); // Append 'Tea' to the business name
    }
  }, [searchParams]);
  const handleCompleteStep = (stepId) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, completed: true } : step
      )
    );

    const nextStepId = stepId + 1;
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === nextStepId ? { ...step, locked: false } : step
      )
    );
    setSelectedStep(nextStepId);
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar steps={steps} selectedStep={selectedStep} onSelectStep={setSelectedStep} />
        <MainContent
          selectedStep={selectedStep}
          onComplete={handleCompleteStep}
          businessName={businessName} // Passing businessName to MainContent
        />
      </div>
    </div>
  );
}

export default function Marketplace() {
  
  return (
    <Suspense fallback={<LoadingState />}>
      <MarketplaceContent />
    </Suspense>
  );
}
