'use client';

import SideBar from "../components/SideBar";
import Header from "../components/Header";
import StoreCards from "../components/StoreCard";
import Promotions from "../components/Promotions";
import SpooktacularSavings from "../components/SpooktacularSavings";
import { CartSidebar } from "../components/CartSidebar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Orange header at the top with a sales or discount offer */}
      <header className="bg-orange-600 text-black p-2">
        <div className="container mx-auto text-center">
          <p className="text-white font-bold">
            🎉 Limited Time Offer: Get FREE delivery on all orders over ₹999! Use code <strong>FREESHIP</strong> at checkout! 🎉
          </p>
        </div>
      </header>

      {/* Main content layout */}
      <div className="flex h-full bg-white">
        <SideBar />

        <main className="flex-1 overflow-y-auto">
          <Header />
          <div className="max-w-7xl mx-auto p-4 space-y-8">
            <StoreCards />
            {/* <Promotions /> */}
            <SpooktacularSavings />
          </div>
        </main>

        <CartSidebar />
      </div>
    </div>
  );
}
