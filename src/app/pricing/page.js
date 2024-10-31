"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Apple, Smartphone, ArrowRight, ChevronDown, Menu, X } from "lucide-react"; // Added Menu and X icons
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const globalStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

const Header = ({ scrollToPricing, scrollToSignup }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-sm p-4">
      <div className="flex justify-between items-center">
        <Link href="/business" className="flex items-center space-x-2">
          <Image
            src="/images/insta_market_business.png"
            alt="InstaMarkt Logo"
            width={200}
            height={75}
            className="object-contain"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-green-900" />
          ) : (
            <Menu className="h-6 w-6 text-green-900" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          <Button variant="ghost" className="font-bold text-green-900 hover:text-green-700" onClick={() => router.push('/business')}>
            Home
          </Button>
          <Button variant="ghost" className="font-bold text-green-900 hover:text-green-700" onClick={scrollToPricing}>
            Pricing
          </Button>
          
          {/* Services Dropdown */}
          <div className="relative">
            <button
              className="font-bold mt-2 ml-4 text-green-900 hover:text-green-700 flex items-center pb-1"
              onClick={toggleDropdown}
            >
              Services <ChevronDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 p-2 w-48 z-10">
                <Link href="/services/onlineordering" className="block px-4 py-2 text-black hover:bg-gray-100">Online Ordering</Link>
                <Link href="/services/deliveryandpickup" className="block px-4 py-2 text-black hover:bg-gray-100">Delivery & Pickup</Link>
                <Link href="/services/promotions" className="block px-4 py-2 text-black hover:bg-gray-100">Promotions</Link>
              </div>
            )}
          </div>

          <Button variant="ghost" className="font-bold text-green-900 hover:text-green-700" onClick={() => router.push('/contact')}>
            Contact
          </Button>
          <Button variant="ghost" className="font-bold text-green-900 hover:text-green-700" onClick={() => router.push('/aboutus')}>
            About Us
          </Button>
          <Button variant="ghost" className="font-bold text-green-900 hover:text-green-700" onClick={() => router.push('/')}>
            Go To InstaMarkt Store
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50 md:hidden">
            <div className="flex flex-col p-4 space-y-3">
              <Button variant="ghost" className="w-full text-left font-bold text-green-900" onClick={() => router.push('/business')}>
                Home
              </Button>
              <Button variant="ghost" className="w-full text-left font-bold text-green-900" onClick={scrollToPricing}>
                Pricing
              </Button>
              <Button variant="ghost" className="w-full text-left font-bold text-green-900" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                Services {isDropdownOpen ? <ChevronDown className="inline ml-2" /> : <ChevronDown className="inline ml-2" />}
              </Button>
              {isDropdownOpen && (
                <div className="pl-4 space-y-2">
                  <Link href="/services/onlineordering" className="block py-2 text-green-900">Online Ordering</Link>
                  <Link href="/services/deliveryandpickup" className="block py-2 text-green-900">Delivery & Pickup</Link>
                  <Link href="/services/promotions" className="block py-2 text-green-900">Promotions</Link>
                </div>
              )}
              <Button variant="ghost" className="w-full text-left font-bold text-green-900" onClick={() => router.push('/contact')}>
                Contact
              </Button>
              <Button variant="ghost" className="w-full text-left font-bold text-green-900" onClick={() => router.push('/aboutus')}>
                About Us
              </Button>
              <Button variant="ghost" className="w-full text-left font-bold text-green-900" onClick={() => router.push('/')}>
                Go To InstaMarkt Store
              </Button>
            </div>
          </div>
        )}

        <div className="hidden md:flex space-x-2">
          <Button className="bg-green-900 hover:bg-green-700 rounded-full text-white" onClick={scrollToSignup}>
            <p className="text-white font-bold">Get Started</p>
          </Button>
        </div>
      </div>
    </header>
  );
};

  

const Hero = ({ scrollToSignup, scrollToPricing }) => (
  <section className="relative py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-white lg:px-8 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left side text content */}
        <div className="relative z-10 text-center md:text-left">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-black font-bold leading-tight">
              Pick the Best Plan for Your Store
            </h1>
            <p className="text-lg md:text-xl text-black/80 leading-relaxed max-w-xl mx-auto md:mx-0">
              Unlock more sales with products and services that help you scale and find new customers, improve profitability,
              and take your business to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                className="w-full sm:w-auto bg-green-900 hover:bg-green-700 rounded-full text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={scrollToSignup}
              >
                Get Started Now
              </Button>
              {/* <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-green-900 text-green-900 hover:bg-green-50 rounded-full px-8 py-4 text-lg font-medium"
                onClick={scrollToPricing}
              >
                View Pricing
              </Button> */}
            </div>
            {/* Trust badges or social proof */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Trusted by leading brands</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <span className="text-gray-400 text-sm">🏆 4.9/5 Rating</span>
                <span className="text-gray-400 text-sm">💫 1000+ Stores</span>
                <span className="text-gray-400 text-sm">🌟 Top Rated Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side image content */}
        <div className="relative mt-8 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-transparent rounded-full filter blur-3xl opacity-70"></div>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
            <Image
              src="/images/customer_selling.png"
              alt="InstaMarkt Business Plans"
              layout="fill"
              objectFit="contain"
              className="rounded-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-100 rounded-full opacity-50"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-50 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  </section>
);


const HowItWorks = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
    }
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              How to get your business on InstaMarkt
            </h2>
            <ul className="space-y-4 text-black text-base md:text-lg">
              <li>
                <strong>1. Sign up and choose your partnership plan</strong>
                <p>Add store details, products, prices, and business hours to start with InstaMarkt.</p>
              </li>
              <li>
                <strong>2. Set up your delivery options</strong>
                <p>Integrate your inventory system or choose from our delivery management tools.</p>
              </li>
              <li>
                <strong>3. Start receiving orders</strong>
                <p>Activate your store on InstaMarkt and start managing orders to grow your business.</p>
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[600px] aspect-video rounded-lg overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="https://oeffyqfy88qvayhg.public.blob.vercel-storage.com/instamarktbusiness-8X2slbM7t6w4yZX7CRaJDjHwHreHle.mp4"
                playsInline
                controls
                muted
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingPlanCard = ({ 
  title, 
  price, 
  originalPrice, 
  commission, 
  description, 
  features, 
  buttonText, 
  onSelect, 
  selected, 
  skuRange,
  scrollToSignup // Add scrollToSignup prop
}) => {
  // Handle both selection and scroll
  const handleClick = (e) => {
    e.preventDefault();
    onSelect();
    scrollToSignup(); // Scroll to signup form
  };

  return (
    <div
      className={`border-2 rounded-lg p-4 md:p-6 flex flex-col space-y-3 md:space-y-4 transition-transform transform hover:scale-105 hover:shadow-lg ${
        selected ? 'border-green-600 bg-white' : 'border-gray-300 bg-white'
      } min-h-[400px] md:min-h-[450px] w-full`}
    >
      <div className="flex-grow">
        <h2 className="text-xl md:text-2xl font-bold text-black">{title}</h2>
        
        <p className="text-sm md:text-md text-gray-700 font-medium mb-2">
          SKU Range: {skuRange}
        </p>
        
        <div className="flex items-center flex-wrap gap-2 mb-3 md:mb-4">
          {originalPrice && (
            <p className="text-lg md:text-xl text-red-500 line-through">
              {originalPrice}
            </p>
          )}
          <p className="text-lg md:text-xl text-green-600 font-semibold">
            {price}
          </p>
        </div>
        
        <hr className="border-gray-300 my-3 md:my-4" />
        
        <p className="text-sm md:text-md font-medium text-black">{commission}</p>
        <p className="text-sm md:text-md text-gray-600 mb-3 md:mb-4">{description}</p>
        
        <ul className="list-none space-y-1 mb-3 md:mb-4">
          {features.map((feature, index) =>
            feature.included ? (
              <li key={index} className="flex items-start text-sm">
                <span className="text-green-600 mr-2 mt-0.5">&#10003;</span>
                <span className="text-gray-600">{feature.name}</span>
              </li>
            ) : null
          )}
        </ul>
        
        <hr className="border-gray-300 my-3 md:my-4" />
        
        <ul className="list-none space-y-1 mb-3 md:mb-4">
          {features.map((feature, index) =>
            !feature.included ? (
              <li key={index} className="flex items-start text-sm">
                <span className="text-red-600 mr-2 mt-0.5">&#10060;</span>
                <span className="text-gray-600">{feature.name}</span>
              </li>
            ) : null
          )}
        </ul>
      </div>
      
      <div className="space-y-3">
        <Button 
          className="bg-green-900 w-full hover:bg-green-700 rounded-full text-white py-3"
          onClick={handleClick}
        >
          {buttonText}
        </Button>
        <Link 
          href="/contact" 
          className="block text-center text-sm text-green-600 hover:text-green-700 underline"
        >
          Contact Sales for Query
        </Link>
      </div>
    </div>
  );
};

const PricingSection = ({ title, plans, scrollToSignup }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  // Function to scroll to specific slide
  const scrollToSlide = (index) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  // Navigation handlers
  const handleNext = () => {
    const nextSlide = currentIndex + 1;
    if (nextSlide < plans.length) {
      scrollToSlide(nextSlide);
    }
  };

  const handlePrev = () => {
    const prevSlide = currentIndex - 1;
    if (prevSlide >= 0) {
      scrollToSlide(prevSlide);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollPosition = scrollRef.current.scrollLeft;
        const cardWidth = scrollRef.current.clientWidth;
        const newActiveSlide = Math.round(scrollPosition / cardWidth);
        setCurrentIndex(newActiveSlide);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="py-8 md:py-12 px-4 md:px-6 bg-white lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 text-center mb-2 md:mb-4">
          {title}
        </h2>

        <Link
          href="/contact"
          className="text-sm text-green-600 hover:text-green-700 flex items-center justify-center mb-4 md:mb-6"
        >
          Contact Sales for Query
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>

        <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 text-center px-4">
          Select a plan that fits your goals and budget. Each plan comes with unique benefits to help your business grow.
        </p>

        {/* Mobile view */}
        <div className="relative md:hidden">
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            <div
              className="flex"
              style={{ width: `${plans.length * 100}%` }}
            >
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `${100 / plans.length}%` }}
                >
                  <div className="px-4">
                    <PricingPlanCard
                      {...plan}
                      onSelect={() => handlePlanSelect(plan.plan)}
                      selected={selectedPlan === plan.plan}
                      scrollToSignup={scrollToSignup}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Plan Indicator */}
          <div className="text-center mt-4 text-sm font-medium text-gray-600">
            {currentIndex + 1} of {plans.length} - {plans[currentIndex].title}
          </div>
        </div>

        {/* Desktop grid layout */}
        <div className="hidden md:grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingPlanCard
              key={index}
              {...plan}
              onSelect={() => handlePlanSelect(plan.plan)}
              selected={selectedPlan === plan.plan}
              scrollToSignup={scrollToSignup}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Add to your global CSS
const styles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
  const AdditionalPricingOptionsSection = () => {
    return (
      <section className="py-12 px-4 md:px-6 bg-gray-100 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-green-900 text-center">
            Flexible Pricing Options Tailored for You, Call Customer Care to Create Customized Plan. 
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            We believe in empowering retailers by offering flexible pricing models that suit your business needs.
          </p>
          {/* Horizontal stretch cards with hover and border */}
          <div className="space-y-6">
            {/* Option 1: Per Order Commission */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center border border-green-100 transition-transform transform hover:scale-105 hover:border-green-500">
              {/* Left side content */}
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <Image src="/images/orders.png" alt="Per Order Commission" width={60} height={60} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">Per Order Commission</h3>
                  <ul className="text-gray-700 text-sm mt-2">
                    <li>100 - 200 orders: <strong>Free</strong></li>
                    <li>200 - 500 orders: <strong>5% Per Order</strong></li>
                    <li>Above 500 orders: <strong>10% Per Order</strong></li>
                  </ul>
                </div>
              </div>
              {/* Right side content */}
              <div className="text-right">
                <ul className="text-gray-700 text-sm">
                  <li>No hidden charges</li>
                  <li>No contracts; cancel anytime</li>
                </ul>
              </div>
            </div>
  
            {/* Option 2: Delivery Fees */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center border border-green-100 transition-transform transform hover:scale-105 hover:border-green-500">
              {/* Left side content */}
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <Image src="/images/delivery.png" alt="Delivery Fees" width={60} height={60} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">Delivery Fees</h3>
                  <p className="text-gray-700 text-sm mt-2">Delivery Fee: <strong>₹0</strong></p>
                  <p className="text-gray-700 text-sm">
                    Pay fixed delivery fees directly to drivers. We help you connect with drivers.
                  </p>
                </div>
              </div>
              {/* Right side content */}
              <div className="text-right">
                <ul className="text-gray-700 text-sm">
                  <li>Free delivery for first 200 orders</li>
                  <li>Flexible driver options</li>
                </ul>
              </div>
            </div>
  
            {/* Option 3: Custom Plans */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center border border-green-100 transition-transform transform hover:scale-105 hover:border-green-500">
              {/* Left side content */}
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <Image src="/images/support.png" alt="Custom Plans" width={60} height={60} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">Custom Plans</h3>
                  <p className="text-gray-700 text-sm mt-2">
                    Plans ranging from <strong>₹10,000</strong> to <strong>₹50,000</strong> per month.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Suitable for small to large scale retailers. Call to enquire.
                  </p>
                </div>
              </div>
              {/* Right side content */}
              <div className="text-right">
                <ul className="text-gray-700 text-sm">
                  <li>24/7 customer support</li>
                  <li>Lead customer generation</li>
                  <li>Free delivery for first 200 orders</li>
                  <li>No contracts; cancel anytime</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  
  

  
  

// Plans for Small Scale Retailers
// Plans for Small Scale Retailers
const smallScalePlans = [
  {
    title: "Free Trial",
    originalPrice: "Rs 499",
    price: "Rs 0 for 15 Days",
    commission: "14% per order",
    description: "Get started at zero cost! Ideal for new small businesses.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Basic Support", included: true },
      { name: "Delivery for First 50 Orders Free", included: true },
      { name: "Limited Reach", included: true },
      { name: "No Premium Listing", included: false },
    ],
    buttonText: "Start Free Trial",
    plan: 'trial',
    skuRange: '0-250', // SKU range for small retailers
  },
  {
    title: "Starter Plan",
    originalPrice: "Rs 999",
    price: "Rs 499 for 30 Days",
    commission: "12% per order",
    description: "Perfect for small businesses to increase visibility.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Standard Support", included: true },
      { name: "Delivery for First 200 Orders Free", included: true },
      { name: "Expanded Reach", included: true },
      { name: "No Premium Listing", included: false },
    ],
    buttonText: "Select Starter",
    plan: 'starter',
    skuRange: '250-500',
  },
  {
    title: "Basic Plan",
    originalPrice: "Rs 1,499",
    price: "Rs 999 for 60 Days",
    commission: "10% per order",
    description: "Upgrade to grow your business with better reach.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Priority Support", included: true },
      { name: "Delivery for First 500 Orders Free", included: true },
      { name: "Expanded Reach", included: true },
      { name: "Premium Listing", included: true },
    ],
    buttonText: "Select Basic",
    plan: 'basic',
    skuRange: '500-999',
  },
];


// Plans for Medium Scale Retailers
// Plans for Medium Scale Retailers
const mediumScalePlans = [
  {
    title: "Growth Plan",
    originalPrice: "Rs 4,999",
    price: "Rs 3,999 for 30 Days",
    commission: "12% per order",
    description: "Scale your medium business with extensive reach.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Standard Support", included: true },
      { name: "Expanded Reach", included: true },
      { name: "Access Premium Customers", included: false },
      { name: "Free Delivery for First 300 Orders", included: true },
    ],
    buttonText: "Select Growth",
    plan: 'growth',
    skuRange: '0-500', // SKU range for medium retailers
  },
  {
    title: "Premium Plan",
    originalPrice: "Rs 8,999",
    price: "Rs 6,999 for 60 Days",
    commission: "10% per order",
    description: "Gain premium features to grow your business faster.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Priority Support", included: true },
      { name: "Expanded Reach", included: true },
      { name: "Access Premium Customers", included: true },
      { name: "Free Delivery for First 600 Orders", included: true },
      { name: "Premium Listing", included: true },
    ],
    buttonText: "Select Premium",
    plan: 'premium',
    skuRange: '500-999',
  },
  {
    title: "Enterprise Plan",
    originalPrice: "Rs 15,999",
    price: "Rs 12,999 for 90 Days",
    commission: "8% per order",
    description: "Maximize reach and growth with exclusive features.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Dedicated Support", included: true },
      { name: "Expanded Reach", included: true },
      { name: "Access Premium Customers", included: true },
      { name: "Premium Listing", included: true },
      { name: "Growth Guarantee", included: true },
    ],
    buttonText: "Select Enterprise",
    plan: 'enterprise',
    skuRange: '1000-4999',
  },
];

// Plans for Large Scale Retailers
const largeScalePlans = [
  {
    title: "Pro Plan",
    originalPrice: "Rs 25,999",
    price: "Rs 19,999 for 60 Days",
    commission: "10% per order",
    description: "High-growth plan for large retailers.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Priority Support", included: true },
      { name: "Maximum Reach", included: true },
      { name: "Access Premium Customers", included: true },
      { name: "Free Delivery for First 1000 Orders", included: true },
    ],
    buttonText: "Select Pro",
    plan: 'pro',
    skuRange: '0-500',
  },
  {
    title: "Elite Plan",
    originalPrice: "Rs 45,999",
    price: "Rs 39,999 for 120 Days",
    commission: "8% per order",
    description: "Premium visibility for maximum expansion.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Dedicated Support", included: true },
      { name: "Maximum Reach", included: true },
      { name: "Access Premium Customers", included: true },
      { name: "Premium Listing", included: true },
      { name: "Free Delivery for First 2000 Orders", included: true },
      { name: "Growth Guarantee", included: true },
    ],
    buttonText: "Select Elite",
    plan: 'elite',
    skuRange: '500-999',
  },
  {
    title: "Ultimate Plan",
    originalPrice: "Rs 75,999",
    price: "Rs 69,999 for 180 Days",
    commission: "5% per order",
    description: "The most comprehensive plan for large retailers.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Dedicated VIP Support", included: true },
      { name: "Maximum Reach with Targeted Campaigns", included: true },
      { name: "Access Premium Customers", included: true },
      { name: "Premium Listing & Custom Branding", included: true },
      { name: "Free Delivery for First 3000 Orders", included: true },
      { name: "Growth Guarantee with ROI Assurance", included: true },
    ],
    buttonText: "Select Ultimate",
    plan: 'ultimate',
    skuRange: '1000+',
  },
];


const SignUpForm = ({ signUpRef }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessState, setBusinessState] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [businessPincode, setBusinessPincode] = useState('');
  const [skuCount, setSkuCount] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (businessName) {
      router.push(`/marketplace?businessName=${encodeURIComponent(businessName)}`);
  
      const businessData = {
        fields: {
          Name: businessName,
          Type: businessType,
          Address: businessAddress.trim(),
          State: businessState.trim(),
          City: businessCity.trim(),
          Pincode: parseInt(businessPincode.trim()), // Convert to number
          "SKU Count": skuCount,
          "Business Email": businessEmail,
          "Business Phone": businessPhone,
          Status: 'Pending'
        }
      };
  
      try {
        const businessResponse = await axios.post(
          `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table`,
          businessData,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log("Business record ID:", businessResponse.data.id);
      } catch (error) {
        console.error("Error adding data to Airtable:", error);
        console.error("Error details:", error.response ? error.response.data : "No response data");
      }
    }
  };

  return (
    <section ref={signUpRef} className="bg-green-500 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start justify-between max-w-6xl mx-auto">
          <div className="w-full md:w-5/12 mb-10 md:mb-0 md:pr-8 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Sign up and unlock sales
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Increase your retail business to reach audiences on their doorsteps.
              Join thousands of businesses that trust us with their delivery needs.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center">
                <span className="mr-3">✓</span>
                Quick and easy setup
              </li>
              <li className="flex items-center">
                <span className="mr-3">✓</span>
                No hidden fees
              </li>
              <li className="flex items-center">
                <span className="mr-3">✓</span>
                24/7 support team
              </li>
            </ul>
          </div>

          <div className="w-full md:w-6/12 bg-white rounded-lg shadow-xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Business Name</label>
                <input
                  type="text"
                  placeholder="Enter your business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Business Type</label>
                <select
value={businessType}
onChange={(e) => setBusinessType(e.target.value)}
required
className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
>
<option value="" disabled hidden>Select Business Type</option>
<option value="Restaurant">Restaurant</option>
<option value="Grocery">Grocery</option>
<option value="Convenience">Convenience</option>
<option value="Flower Shop">Flower Shop</option>
<option value="Pet Store">Pet Store</option>
<option value="Retail">Retail</option>
<option value="Coffee Shop">Coffee Shop</option>
<option value="Shoes">Shoes</option>
<option value="Fashion">Fashion</option>
<option value="Lifestyle">Lifestyle</option>
<option value="Electronics">Electronics</option>
<option value="Books">Books</option>
<option value="Home Decor">Home Decor</option>
<option value="Health & Wellness">Health & Wellness</option>
<option value="Pharmacy">Pharmacy</option>
</select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Business Address</label>
                <input
                  type="text"
                  placeholder="Enter your business address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  placeholder="Enter state"
                  value={businessState}
                  onChange={(e) => setBusinessState(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={businessCity}
                  onChange={(e) => setBusinessCity(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Pincode</label>
                <input
                  type="number"
                  placeholder="Enter pincode"
                  value={businessPincode}
                  onChange={(e) => setBusinessPincode(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Total SKUs</label>
                <select
                  value={skuCount}
                  onChange={(e) => setSkuCount(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                >
                  <option value="" disabled hidden>Total SKUs for Sale</option>
                  <option value="0-500">Less than 100</option>
                  <option value="500-1000">100 to 500</option>
                  <option value="1000-5000">500 to 1000</option>
                  <option value="5000+">1000 or more</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Business Email</label>
                <input
                  type="email"
                  placeholder="Enter your business email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Business Phone</label>
                <input
                  type="tel"
                  placeholder="Enter your business phone"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>

              <button 
                type="submit" 
                className="w-full p-3 bg-green-900 hover:bg-green-700 text-white rounded-full font-medium transition-colors duration-200 mt-6"
              >
                Start Free Trial
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/data/business_faq.json');
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 md:px-0">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Frequently asked questions</h2>
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="border-b pb-4 border-gray-500">
              <button
                className="flex justify-between items-center w-full text-left text-white"
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              >
                <span className="font-semibold">{q.q}</span>
                <ChevronDown className={`transform transition-transform ${openQuestion === index ? 'rotate-180' : ''}`} />
              </button>
              {openQuestion === index && <p className="mt-2">{q.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Footer = () => (
  <footer className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 shadow-inner">
    <div className="container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="space-y-6">
          <h3 className="font-bold text-xl text-gray-800 mb-4">Get deliveries with InstaMarkt</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-green-700 hover:border-green-800 transition-all duration-300 shadow-sm hover:shadow"
            >
              <Apple className="mr-2 h-5 w-5" /> 
              <span>iOS <span className="text-green-700">(Coming Soon)</span></span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-green-700 hover:border-green-800 transition-all duration-300 shadow-sm hover:shadow"
            >
              <Smartphone className="mr-2 h-5 w-5" /> 
              <span>Android <span className="text-green-700">(Coming Soon)</span></span>
            </Button>
          </div>
        </div>

        {[
          { 
            title: "Popular Departments", 
            items: ["Fashion", "Electronics", "Home Essentials", "Beauty & Personal Care", "Health & Wellness"],
            isDisabled: true
          },
          { 
            title: "More Departments", 
            items: ["Alcohol", "Beverages", "Frozen Food", "Organic Grocery"],
            isDisabled: true
          },
          { 
            title: "Get To Know Us", 
            items: [
              { text: "About Us", link: "/aboutus" },
              { text: "Contact Us", link: "/contact" },
              { text: "Promotions", link: "/services/promotions" },
              { text: "Online Ordering", link: "/services/onlineordering" },
              { text: "Delivery & Pickup", link: "/services/deliveryandpickup" }
            ],
            isDisabled: false
          },
          { 
            title: "Groceries & Essentials", 
            items: ["Grocery", "Dairy Products", "Meat", "Seafood", "Pantry Food"],
            isDisabled: true
          }
        ].map((column, index) => (
          <div key={index} className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800 border-b border-gray-200 pb-2">
              {column.title}
            </h3>
            <ul className="space-y-3">
              {column.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {column.isDisabled ? (
                    <span className="text-gray-500 cursor-not-allowed hover:text-gray-600 transition-colors duration-200">
                      {typeof item === 'object' ? item.text : item}
                    </span>
                  ) : (
                    <Link 
                      href={typeof item === 'object' ? item.link : '#'} 
                      className="text-gray-600 hover:text-green-700 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 opacity-0 -ml-5 group-hover:opacity-100 transition-all duration-200 text-green-700" />
                      {typeof item === 'object' ? item.text : item}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-center sm:text-left">
            &copy; 2024 InstaMarkt. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link 
              href="#" 
              className="text-gray-600 hover:text-green-700 transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link 
              href="#" 
              className="text-gray-600 hover:text-green-700 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);


export default function BusinessPage() {
  const signUpRef = useRef(null);
  const pricingRef = useRef(null);

  const scrollToSignup = () => {
    if (signUpRef.current) {
      signUpRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header scrollToSignup={scrollToSignup} /> {/* Pass scrollToSignup here */}
      <main>
        <Hero scrollToSignup={scrollToSignup} scrollToPricing={scrollToPricing} />

        {/* Pricing Sections */}
        <PricingSection
  title="Affordable Platform Fee Plans for Small Retailers (Up to 50 Outlets PAN India)"
  plans={smallScalePlans}
  scrollToSignup={scrollToSignup}
/>
<PricingSection
  title="Growth-Driven Platform Fee Plans for Medium Retailers (50 to 500 Outlets PAN India)"
  plans={mediumScalePlans}
  scrollToSignup={scrollToSignup}
/>
<PricingSection
  title="Comprehensive Platform Fee Plans for Large Retailers (500+ Outlets PAN India)"
  plans={largeScalePlans}
  scrollToSignup={scrollToSignup}
/>

        <AdditionalPricingOptionsSection />

        <HowItWorks />
        <SignUpForm signUpRef={signUpRef} />  {/* Pass the signUpRef to the SignUpForm */}
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
