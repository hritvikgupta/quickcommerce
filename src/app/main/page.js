"use client";

import { Suspense } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import StoreCards from "../components/StoreCard";
import SpooktacularSavings from "../components/SpooktacularSavings";
import { CartSidebar } from "../components/CartSidebar";

// Loading component for Suspense fallback
function LoadingState() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
}

// Promotional Banner Component
function PromotionalBanner() {
  return (
    <header className="bg-orange-600 text-black p-2">
      <div className="container mx-auto text-center">
        <p className="text-white font-bold">
          🎉 Limited Time Offer: Get FREE delivery on all orders over ₹999! Use code{" "}
          <strong>FREESHIP</strong> at checkout! 🎉
        </p>
      </div>
    </header>
  );
}

// Main content component
function MainContent() {
  return (
    <div className="flex-1 overflow-y-auto">
      <Header />
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg"/>}>
          <StoreCards />
        </Suspense>
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg"/>}>
          <SpooktacularSavings />
        </Suspense>
      </div>
    </div>
  );
}

// Home component that wraps everything
function HomeContent() {
  return (
    <div className="flex flex-col h-screen">
      <PromotionalBanner />
      <div className="flex h-full bg-white">
        <Suspense fallback={<div className="w-64 bg-gray-100 animate-pulse"/>}>
          <SideBar />
        </Suspense>
        <MainContent />
        <Suspense fallback={<div className="w-80 bg-gray-100 animate-pulse"/>}>
          <CartSidebar />
        </Suspense>
      </div>
    </div>
  );
}

// Main page export with top-level Suspense
export default function Home() {
  return (
    <Suspense fallback={<LoadingState />}>
      <HomeContent />
    </Suspense>
  );
}