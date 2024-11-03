'use client'

import React, { useState } from 'react';
import { ChevronRight, Info, Calendar, CreditCard } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const CartCheckoutPage = () => {
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('4:49am-5:49am');
  const [selectedTip, setSelectedTip] = useState(100);
  
  const deliveryTimes = [
    { time: '4:49am-5:49am', type: 'Priority', price: 199 },
    { time: '5:19am-6:20am', type: 'Standard', price: 199 },
    { time: 'Schedule a time', type: 'Later', price: 199, discount: 100 }
  ];

  const tipOptions = [50, 100, 150, 200, 'Other'];

  const summary = {
    items: 2,
    subtotal: 1848,
    deliveryFee: 199,
    serviceFee: 299,
    tax: 143,
    tip: selectedTip
  };

  const total = Object.values(summary).reduce((acc, curr) => 
    typeof curr === 'number' ? acc + curr : acc, 0
  );

  // Helper function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Summary Component
  const SummarySection = () => (
    <div className="lg:w-[380px] w-full">
      <Card>
        <CardContent className="p-4 lg:p-6">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-black">Summary</h2>
          <div className="space-y-2 mb-4 text-black">
            <div className="flex justify-between">
              <p>{summary.items} items</p>
              <p>₹{formatNumber(summary.subtotal)}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery fee</p>
              <p>₹{formatNumber(summary.deliveryFee)}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <p>Service fee</p>
                <Info size={16} className="text-gray-400" />
              </div>
              <p>₹{formatNumber(summary.serviceFee)}</p>
            </div>
            <div className="flex justify-between">
              <p>Est. tax</p>
              <p>₹{formatNumber(summary.tax)}</p>
            </div>
          </div>

          <div className="mb-4 text-black">
            <p className="mb-2">Delivery Tip</p>
            <p className="text-sm text-gray-600 mb-2">100% of your tip goes to the delivery person</p>
            <div className="grid grid-cols-5 gap-2">
              {tipOptions.map((tip) => (
                <Button
                  key={tip}
                  variant={selectedTip === tip ? 'default' : 'outline'}
                  className={`w-full ${selectedTip === tip ? 'bg-gray-900 text-white' : ''}`}
                  onClick={() => setSelectedTip(typeof tip === 'number' ? tip : selectedTip)}
                >
                  {typeof tip === 'number' ? `₹${tip}` : tip}
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 mb-4 text-black">
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <div className="text-right">
                <p className="text-gray-500 line-through text-sm">₹{formatNumber(2990)}</p>
                <p>₹{formatNumber(total)}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2 flex items-center flex-wrap">
              <span>Pay in 4 installments of ₹{formatNumber(Math.ceil(total/4))} with Klarna</span>
              <Info size={16} className="ml-1" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
              <span className="text-gray-700">Add promo code or gift card</span>
              <ChevronRight className="text-gray-400" />
            </div>
            
            <Button className="w-full bg-green-600 hover:bg-green-700 text-lg h-12 text-white">
              Place order
            </Button>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                By placing your order, you agree to the{' '}
                <a href="#" className="text-green-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>.
              </p>

              <p>
                You accept full responsibility for the order once it's delivered. Items that do not require ID or delivery confirmation may be left at your door if requested or if you are not present when the order arrives.
              </p>

              <p>
                Your credit/debit card will be authorized for ₹{formatNumber(Math.ceil(total * 1.1))}. Amounts will be finalized after order completion.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="w-full lg:w-[calc(100%-380px-1.5rem)]">
            {/* Delivery Section */}
            <Card className="mb-6">
              <CardContent className="p-4 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-black">Deliver to</h2>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-black">20341 Bluffside Circle, Apt 104</p>
                    <p className="text-sm text-gray-600">Huntington Beach, CA</p>
                    <p className="text-sm text-gray-600">Meet at the door • Apt 104, Call me on 9513861671</p>
                  </div>
                  <ChevronRight className="text-gray-400 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>

            {/* Timing Section */}
            <Card className="mb-6">
              <CardContent className="p-4 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-black">When</h2>
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-purple-600">
                        <Info size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-purple-800">₹3,000 off Instacart+</p>
                        <p className="text-sm text-purple-700">Get unlimited ₹0 delivery fees. Service fees apply.</p>
                      </div>
                    </div>
                    <Button className="bg-purple-800 hover:bg-purple-900 text-white w-full lg:w-auto">
                      Try free
                    </Button>
                  </div>
                </div>
                
                {deliveryTimes.map((option) => (
                  <div
                    key={option.time}
                    className={`p-4 rounded-lg border mb-2 cursor-pointer ${
                      selectedDeliveryTime === option.time ? 'border-green-600' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedDeliveryTime(option.time)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          {option.time === 'Schedule a time' ? (
                            <Calendar className="text-gray-600" size={20} />
                          ) : (
                            <div className="w-5 h-5" />
                          )}
                          <p className="font-medium text-black">{option.time}</p>
                        </div>
                        <p className="text-sm text-gray-600 ml-7">{option.type}</p>
                        {option.discount && (
                          <p className="text-sm text-green-600 ml-7">Get ₹{formatNumber(option.discount)} off</p>
                        )}
                      </div>
                      <p className="font-medium text-black">₹{formatNumber(option.price)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card className="mb-6 lg:mb-0">
              <CardContent className="p-4 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-black">Pay with</h2>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <CreditCard className="text-gray-600" />
                    <p className="text-black">Mastercard *7746</p>
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-[380px]">
            <SummarySection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckoutPage;