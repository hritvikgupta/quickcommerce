"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Apple, ArrowRight, ChevronDown, Menu, X } from "lucide-react"; // Added Menu and X icons
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
const styles = `
  .bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
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
    <header className="bg-white shadow-sm p-4 relative z-50"> {/* Added relative and z-50 */}
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
        <nav className="hidden md:flex space-x-1 items-center"> {/* Added items-center */}
          <Button variant="ghost" className="font-bold text-green-900 hover:text-green-700" onClick={() => router.push('/business')}>
            Home
          </Button>
          <Button variant="ghost" className="font-bold text-green-900 hover:text-green-700" onClick={() => router.push('/pricing')}>
            Pricing
          </Button>
          
          {/* Services Dropdown */}
          <div className="relative group"> {/* Added group for hover effect */}
            <button
              className="font-bold px-4 py-2 text-green-900 hover:text-green-700 flex items-center"
              onClick={toggleDropdown}
            >
              Services <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"> {/* Improved dropdown styling */}
                <Link 
                  href="/services/onlineordering" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition-colors duration-150"
                >
                  Online Ordering
                </Link>
                <Link 
                  href="/services/deliveryandpickup" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition-colors duration-150"
                >
                  Delivery & Pickup
                </Link>
                <Link 
                  href="/services/promotions" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition-colors duration-150"
                >
                  Promotions
                </Link>
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
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-100"> {/* Improved mobile menu positioning */}
            <div className="flex flex-col p-4 space-y-3">
              <Button variant="ghost" className="w-full text-left font-bold text-green-900" onClick={() => {
                router.push('/business');
                toggleMobileMenu();
              }}>
                Home
              </Button>
              <Button variant="ghost" className="w-full text-left font-bold text-green-900" onClick={() => {
                router.push('/pricing');
                toggleMobileMenu();
              }}>
                Pricing
              </Button>
              
              {/* Mobile Services Dropdown */}
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full text-left font-bold text-green-900 flex items-center justify-between"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Services
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {isDropdownOpen && (
                  <div className="pl-4 space-y-2 bg-gray-50 rounded-lg p-2">
                    <Link 
                      href="/services/onlineordering" 
                      className="block py-2 text-green-900 hover:text-green-700"
                      onClick={toggleMobileMenu}
                    >
                      Online Ordering
                    </Link>
                    <Link 
                      href="/services/deliveryandpickup" 
                      className="block py-2 text-green-900 hover:text-green-700"
                      onClick={toggleMobileMenu}
                    >
                      Delivery & Pickup
                    </Link>
                    <Link 
                      href="/services/promotions" 
                      className="block py-2 text-green-900 hover:text-green-700"
                      onClick={toggleMobileMenu}
                    >
                      Promotions
                    </Link>
                  </div>
                )}
              </div>

              <Button variant="ghost" className="w-full text-left font-bold text-green-900" onClick={() => {
                router.push('/contact');
                toggleMobileMenu();
              }}>
                Contact
              </Button>
              <Button variant="ghost" className="w-full text-left font-bold text-green-900" onClick={() => {
                router.push('/aboutus');
                toggleMobileMenu();
              }}>
                About Us
              </Button>
              <Button variant="ghost" className="w-full text-left font-bold text-green-900" onClick={() => {
                router.push('/');
                toggleMobileMenu();
              }}>
                Go To InstaMarkt Store
              </Button>
            </div>
          </div>
        )}

        <div className="hidden md:flex space-x-2">
          <Button 
            className="bg-green-900 hover:bg-green-700 rounded-full text-white px-6 py-2 transform hover:scale-105 transition-all duration-200"
            onClick={scrollToSignup}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
  

  const Hero = ({ scrollToSignup }) => (
    <section className="relative py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative z-10 text-center md:text-left">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-400 font-bold leading-tight">
                Grow Your Sales with Online Ordering and open your{" "}
                <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Quick commerce store
                </span>
              </h1>
  
              <div className="bg-green-50 p-6 rounded-xl">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  With platform fee starting with as low as{" "}
                  <span className="font-bold text-green-800 text-2xl block my-2">Rs 499</span>
                  Connect with more customers, boost sales by offering what your customers want and 
                  get your product delivered to them, and build your retail brand with us.
                </p>
              </div>
  
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={scrollToSignup}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Started with InstaMarkt Business
                </Button>
  
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center sm:justify-start text-green-800 hover:text-green-700 font-semibold px-4"
                >
                  Contact sales for demo
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
  
          <div className="relative mt-10 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-transparent rounded-full filter blur-3xl opacity-70"></div>
            <Image
              src="/images/onlineordering.png"
              alt="InstaMarkt Business Plans"
              width={500}
              height={400}
              className="rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
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
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">How to get your business on InstaMarkt</h2>
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
              <video
                ref={videoRef}
                src="https://oeffyqfy88qvayhg.public.blob.vercel-storage.com/instamarktbusiness-8X2slbM7t6w4yZX7CRaJDjHwHreHle.mp4"
                alt="InstaMarkt Store Setup"
                className="w-full max-w-[600px] rounded-lg"
                controls
                autoPlay
                loop
                muted
              />
            </div>
          </div>
        </div>
      </section>
    );
  };

  
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
  
  
  

  
  


  const SignUpForm = ({ signUpRef }) => {
    const [businessName, setBusinessName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
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
  
          const businessRecordId = businessResponse.data.id;
          console.log("Business record ID:", businessRecordId);
  
        } catch (error) {
          console.error("Error adding data to Airtable:", error);
          console.error("Error details:", error.response ? error.response.data : "No response data");
        }
      }
    };
  
    return (
      <section ref={signUpRef} className="bg-green-500 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start justify-between max-w-6xl mx-auto">
            {/* Left side content */}
            <div className="w-full md:w-5/12 mb-10 md:mb-0 md:pr-8">
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
  
            {/* Right side form */}
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Business Address</label>
                  <input
                    type="text"
                    placeholder="Enter your business address"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Business Type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="" disabled hidden>Select Business Type</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Alcohol">Alcohol</option>
                    <option value="Convenience">Convenience</option>
                    <option value="Flower Shop">Flower Shop</option>
                    <option value="Pet Store">Pet Store</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
  
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Total SKUs</label>
                  <select
                    value={skuCount}
                    onChange={(e) => setSkuCount(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
  
                <button 
                  type="submit" 
                  className="w-full p-3 bg-green-900 hover:bg-green-700 text-white rounded-full font-medium transition-colors duration-200"
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
const GrowBrand = () => {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl text-green-900 font-bold mb-12 text-black">Move your retail business to quick commerce retail and deliver customers instantly</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Column 1 */}
            <div className="flex flex-col items-center">
              <Image
                src="/images/growsales.png" // Replace with the actual path to your icon image
                alt="Grow Your Sales Icon"
                width={300}
                height={200}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-2">Grow Your Sales</h3>
              <p className="text-gray-700">
              We help you connect with new and returning customers, building a reliable marketplace for your business. 
              Create a seamless online ordering experience to keep your customers engaged and loyal to your brand.              </p>
            </div>
            
            {/* Column 2 */}
            <div className="flex flex-col items-center">
              <Image
                src="/images/buildbrand.png" // Replace with the actual path to your icon image
                alt="Build Your Brand Icon"
                width={300}
                height={200}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-2">Build Your Quick Commerce Brand</h3>
              <p className="text-gray-700">
              With our online ordering platform, you can offer your customers the convenience of ordering from anywhere, 
  at any time, we will help to connect with drivers. Increase your reach and visibility, attract new customers, and retain existing.
              </p>
            </div>
            
            {/* Column 3 */}
            <div className="flex flex-col items-center">
              <Image
                src="/images/customerloyality.png" // Replace with the actual path to your icon image
                alt="Increase Customer Loyalty Icon"
                width={250}
                height={200}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-4 ">Increase Customer Loyalty</h3>
              <p className="text-gray-700">
              Sell effortlessly on your InstaMarkt quick commerce store. Engage customers with real-time product notifications, attract new buyers, and keep them coming back.
           </p>
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
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-black">Get deliveries with InstaMarkt</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-black border-green-900">
                <Apple className="mr-2 h-4 w-4" /> iOS
              </Button>
              <Button variant="outline" size="sm" className="text-black border-green-900">
                <ArrowRight className="mr-2 h-4 w-4" /> Android
              </Button>
            </div>
          </div>
          {[
            { title: "Popular Departments", items: ["Fashion", "Electronics", "Home Essentials", "Beauty & Personal Care", "Health & Wellness"] },
            { title: "More Departments", items: ["Alcohol", "Beverages", "Frozen Food", "Organic Grocery"] },
            { title: "Get to Know Us", items: ["Press", "Careers", "Blog", "Ideas & Guides", "Help"] },
            { title: "Groceries & Essentials", items: ["Grocery", "Dairy Products", "Meat", "Seafood", "Pantry Food"] }
          ].map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4 text-black">{column.title}</h3>
              <ul className="space-y-2">
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link href="#" className="text-black hover:text-gray-700">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-300">
          <div className="flex justify-between items-center">
            <p className="text-black">&copy; 2024 InstaMarkt</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-black hover:text-gray-700">
                Terms of Service
              </Link>
              <Link href="#" className="text-black hover:text-gray-700">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
  );

export default function BusinessPage() {
  const signUpRef = useRef(null);
  const pricingRef = useRef(null); // Ref for the Pricing Section

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToSignup = () => {
    if (signUpRef.current) {
      signUpRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header scrollToPricing={scrollToSignup} /> {/* Pass the scrollToPricing function as a prop */}
      <main>
        <Hero scrollToSignup={scrollToSignup} />
        <GrowBrand/>
        <AdditionalPricingOptionsSection />

        <HowItWorks />
        <SignUpForm signUpRef={signUpRef} />  {/* Pass the signUpRef to the SignUpForm */}
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
