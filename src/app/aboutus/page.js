"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Apple, ArrowRight, Smartphone,ChevronDown, Menu, X } from "lucide-react"; // Added Menu and X icons
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
            width={300}
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-400 leading-tight mb-6">
            Boost Your Retail Business With{" "}
            <span className="text-green-600 inline-block">Quick Commerce{" "}</span> 
            {" "} and Increase Your Sale With Promotion And Offers For Your{" "}
            <span className="text-green-600 inline-block">Current and Potential Customers</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
            <Button
              onClick={scrollToSignup}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started with InstaMarkt Business
            </Button>
            
            <Link
              href="/contact"
              className="group flex items-center justify-center sm:justify-start text-green-800 hover:text-green-700 font-semibold px-4"
            >
              Contact sales for demo
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="relative order-first md:order-last mb-8 md:mb-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-transparent rounded-full filter blur-3xl opacity-70"></div>
          <div className="relative transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/deliveryorders.png"
              alt="InstaMarkt Business Plans"
              width={500}
              height={400}
              className="rounded-2xl shadow-xl"
            />
          </div>
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
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-black mb-4">How to Get Your Business on InstaMarkt</h2>
          <ul className="space-y-4 text-black text-lg">
            <li>
              <strong>1. Sign Up and Choose Your Partnership Plan</strong>
              <p>Add store details, products, prices, and business hours to start with InstaMarkt.</p>
            </li>
            <li>
              <strong>2. Set Up Your Delivery Options</strong>
              <p>Integrate your inventory system or choose from our delivery management tools.</p>
            </li>
            <li>
              <strong>3. Start Receiving Orders</strong>
              <p>Activate your store on InstaMarkt and start managing orders to grow your business.</p>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <video
            ref={videoRef}
            src="/images/instamarktbusiness.mp4"
            alt="InstaMarkt Store Setup"
            width="600"
            height="400"
            className="rounded-lg"
            controls
            autoPlay
            loop
            muted
          />
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
  
const GrowBrand = () => {
    return (
      <section className="bg-white py-20">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl text-4xl text-green-900 font-bold mb-12 text-black">With InstaMart's Promotions Reach New Customers and Existing Customers To Increase Your Sale</h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      
      {/* Column 1 */}
      <div className="mt-10 flex flex-col items-center">
        <Image
          src="/images/moresales.png" // Replace with the actual path to your icon image
          alt="Instant Order Management Icon"
          width={150}
          height={200}
          className="mb-4"
        />
        <h3 className="text-xl font-semibold text-black mb-2">Boost Sales</h3>
        <p className="text-gray-700">
          Increase your sales by 20-30% by offering promotions offer to your potential customers. 
        </p>
      </div>
      
      {/* Column 2 */}
      <div className="flex flex-col items-center">
        <Image
          src="/images/customizepffer.png" // Replace with the actual path to your icon image
          alt="Real-Time Tracking Icon"
          width={150}
          height={200}
          className="mb-4"
        />
        <h3 className="text-xl font-semibold text-black mb-2">Customize Your Offers</h3>
        <p className="text-gray-700">
         Provide your customers offers they need on regular basis using realtime in-app push notification or with instamarkt banners. 
        </p>
      </div>
      
      {/* Column 3 */}
      <div className="flex flex-col items-center">
        <Image
          src="/images/discovered.png" // Replace with the actual path to your icon image
          alt="24/7 Support Icon"
          width={150}
          height={200}
          className="mb-4"
        />
        <h3 className="text-xl font-semibold text-black mb-2">Discover Your Potential Customers </h3>
        <p className="text-gray-700">
        Access insights and engage with potential customers who frequently buy from the categories you offer, as well as nearby shoppers, based on the platform plan you choose.

      </p>
      </div>

    </div>
  </div>
</section>

    );
  };
  

  const PromotionsSection = () => {
    return (
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-green-900">Explore InstaMarkt Promotions</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Promotion 1 */}
            <div className="flex flex-col items-center">
              <Image
                src="/images/discountscustomer.png" // Replace with your actual icon path
                alt="Discounts for Customers"
                width={200}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-2">Discounts for Customers</h3>
              <p className="text-gray-700">
                Attract new customers or win back past ones by sending them with push notifications and in-app exclusive discounts on their favorite products. 
              </p>
            </div>
            
            {/* Promotion 2 */}
            <div className="flex flex-col items-center">
              <Image
                src="/images/freedelivery.png" // Replace with your actual icon path
                alt="Free Delivery"
                width={115}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-2">Free Delivery</h3>
              <p className="text-gray-700">
                Encourage customers to place orders by covering the delivery fee on their first few purchases and we waive off delivery comission of first 200 orders.
              </p>
            </div>
            
            {/* Promotion 3 */}
            <div className="flex flex-col items-center">
              <Image
                src="/images/growsales.png" // Replace with your actual icon path
                alt="Free or Discounted Item"
                width={200}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-2">Free or Discounted Item</h3>
              <p className="text-gray-700">
                Boost engagement by offering a free or discounted item on orders above a certain amount.
              </p>
            </div>
  
          </div>
        </div>
      </section>
    );
  };


const PartnerBenefits = () => {
  return (
    <section className="bg-white py-20 min-h-[700px]">
      <div className="container mt-10 mx-auto flex flex-col md:flex-row items-center gap-8">
        
        {/* Image Section */}
        <div className="md:w-1/2">
          <Image
            src="/images/customerinstantly.png" // Replace with your actual image path
            alt="InstaMart Delivery Partner"
            width={1000}
            height={1000}
            className="rounded-lg"
          />
        </div>
        
        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-black mb-4">Get Started With A Free Marketing Credit</h2>
          <p className="text-lg text-gray-700 mb-6">
            Boost your business by partnering with InstaMart’s Marketing. Tap into a growing customer base that values your store and increase your sales. With free first time marketing credit of Rs 2000 delivery, attract more customers without any extra cost.
          </p>
        
          
          {/* Link to Pricing Page */}
          <Link href="/pricing">
            <span className="bg-green-700 text-white font-bold py-3 px-6 rounded-full hover:bg-green-800 inline-block cursor-pointer">
              Explore plans and pricing
            </span>
          </Link>
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
          <h3 className="font-bold text-xl text-gray-800 mb-4 text-center md:text-left">
            Get deliveries with InstaMarkt
          </h3>
          <div className="flex flex-col items-center md:items-start gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full max-w-[250px] bg-white hover:bg-gray-50 text-gray-800 border-2 border-green-700 hover:border-green-800 transition-all duration-300 shadow-sm hover:shadow flex justify-center items-center"
            >
              <div className="flex items-center justify-center">
                <Apple className="h-5 w-5" />
                <span className="ml-2">iOS <span className="text-green-700">(Coming Soon)</span></span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full max-w-[250px] bg-white hover:bg-gray-50 text-gray-800 border-2 border-green-700 hover:border-green-800 transition-all duration-300 shadow-sm hover:shadow flex justify-center items-center"
            >
              <div className="flex items-center justify-center">
                <Smartphone className="h-5 w-5" />
                <span className="ml-2">Android <span className="text-green-700">(Coming Soon)</span></span>
              </div>
            </Button>
          </div>
        </div>

        {/* Rest of the footer content remains the same */}
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
            <h3 className="font-bold text-lg text-gray-800 border-b border-gray-200 pb-2 text-center md:text-left">
              {column.title}
            </h3>
            <ul className="space-y-3">
              {column.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-center md:text-left">
                  {column.isDisabled ? (
                    <span className="text-gray-500 cursor-not-allowed hover:text-gray-600 transition-colors duration-200">
                      {typeof item === 'object' ? item.text : item}
                    </span>
                  ) : (
                    <Link 
                      href={typeof item === 'object' ? item.link : '#'} 
                      className="text-gray-600 hover:text-green-700 transition-colors duration-200 inline-flex items-center group"
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




const AboutUsSection = () => {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center md:text-left md:px-6 lg:px-8 max-w-6xl">
          
          {/* Section Title */}
          <h2 className="text-4xl text-green-900 font-bold text-black mb-6">About InstaMarkt</h2>
          
          {/* Simple Introduction */}
          <p className="text-lg text-gray-700 mb-6">
            InstaMarkt is a quick commerce platform where retailers can list their products and deliver them to customers instantly. We empower retailers to reach their customers faster and streamline the entire ordering process, creating a seamless shopping experience.
          </p>
          
          {/* How We Work */}
          <h3 className="text-2xl font-semibold text-green-900 mb-4">How It Works</h3>
          <p className="text-lg text-gray-700 mb-6">
            Getting started with InstaMarkt is simple! Just sign up, add your store details, upload your product catalog, and set your business hours. Once your store is live, customers can browse your offerings, place orders, and track deliveries in real-time. InstaMarkt’s network of delivery drivers ensures that each order reaches customers quickly and reliably, so you can focus on growing your business.
          </p>
          
          {/* Connecting with Delivery Partners */}
          <h3 className="text-2xl font-semibold text-green-900 mb-4">Connecting with InstaMarkt Drivers</h3>
          <p className="text-lg text-gray-700 mb-6">
            InstaMarkt connects you directly with our dedicated delivery drivers who handle the logistics of getting your products to customers. With real-time tracking and seamless communication, both retailers and customers can stay updated on the status of each order, enhancing customer trust and satisfaction.
          </p>
          
          {/* What We Offer */}
          <h3 className="text-2xl font-semibold text-green-900 mb-4">What We Offer</h3>
          <p className="text-lg text-gray-700 mb-6">
            InstaMarkt provides a complete suite of tools tailored for quick commerce, allowing retailers to manage orders, offer promotions, and access valuable insights. Whether you're a small business or a large chain, InstaMarkt adapts to your needs and scales with your growth.
          </p>
          
          {/* How We Help Retailers Boost Sales */}
          <h3 className="text-2xl font-semibold text-green-900 mb-4">How We Help Retailers Boost Sales</h3>
          <p className="text-lg text-gray-700 mb-6">
            With real-time tracking, targeted promotions, and personalized marketing features, InstaMarkt helps you engage customers effectively. Our platform enables you to create exclusive discounts, provide free delivery options, and offer loyalty rewards that encourage repeat purchases, helping you drive more sales.
          </p>
          
          {/* Our Services */}
          <h3 className="text-2xl font-semibold text-green-900 mb-4">Our Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
            
            {/* Service 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-green-900 mb-2">Real-Time Delivery Tracking</h4>
              <p className="text-gray-700">
                Keep your customers updated with live tracking for all orders, enhancing their experience and building trust.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-green-900 mb-2">Seamless Order Management</h4>
              <p className="text-gray-700">
                Manage all your orders in one place for smooth operations and minimized delays.
              </p>
            </div>
            
            {/* Service 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-green-900 mb-2">Targeted Promotions</h4>
              <p className="text-gray-700">
                Attract and retain customers with customized promotions, discounts, and loyalty programs.
              </p>
            </div>
            
            {/* Service 4 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-green-900 mb-2">Inventory Management</h4>
              <p className="text-gray-700">
                Stay on top of your inventory with automated alerts and real-time updates.
              </p>
            </div>
            
            {/* Service 5 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-green-900 mb-2">In-Depth Analytics</h4>
              <p className="text-gray-700">
                Make data-driven decisions with insights into customer preferences and sales trends.
              </p>
            </div>
            
            {/* Service 6 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-green-900 mb-2">24/7 Customer Support</h4>
              <p className="text-gray-700">
                Access dedicated support any time, from technical assistance to live order help.
              </p>
            </div>
            
          </div>
        </div>
      </section>
    );
  };
  
  
  const faqs = [
    {
      category: "General Information",
      questions: [
        {
          question: "What is InstaMarkt?",
          answer: "InstaMarkt is a quick commerce platform where retailers can list their products and deliver them instantly to customers, empowering businesses with tools to expand their reach and engage with local shoppers.",
        },
        {
          question: "How can InstaMarkt help my business grow?",
          answer: "InstaMarkt provides tools for online ordering, real-time delivery tracking, targeted promotions, and data insights that help you reach new customers, increase sales, and drive repeat business.",
        },
        {
          question: "What types of businesses can use InstaMarkt?",
          answer: "InstaMarkt serves a variety of retailers, from small local shops to large chains, helping them manage and fulfill customer orders quickly and efficiently.",
        },
      ],
    },
    {
      category: "Delivery",
      questions: [
        {
          question: "Why should I offer delivery through InstaMarkt?",
          answer: "Offering delivery allows you to reach customers who prefer the convenience of shopping from home, expanding your customer base and enhancing customer satisfaction.",
        },
        {
          question: "What delivery options are available?",
          answer: "InstaMarkt provides multiple delivery options, including same-day delivery, scheduled deliveries, and real-time tracking to ensure customers receive their orders on time.",
        },
        {
          question: "How does real-time delivery tracking work?",
          answer: "With real-time tracking, customers can follow their orders from dispatch to delivery, providing transparency and increasing customer confidence in your business.",
        },
        {
          question: "What is the delivery radius for InstaMarkt?",
          answer: "The delivery radius depends on your location and delivery partners. Contact InstaMarkt support for specific details about your area.",
        },
      ],
    },
    {
      category: "Product Listings",
      questions: [
        {
          question: "What products can I list on InstaMarkt?",
          answer: "You can list a variety of products depending on your chosen plan. Products include grocery items, personal care, household goods, and more, tailored to local demand.",
        },
        {
          question: "Does InstaMarkt integrate with my POS system?",
          answer: "Yes, InstaMarkt supports integration with several popular POS systems. Contact us to learn more about supported systems and how to connect yours.",
        },
        {
          question: "How do I manage my inventory on InstaMarkt?",
          answer: "InstaMarkt offers inventory management tools to track stock levels, set alerts for low stock, and ensure you can fulfill orders efficiently.",
        },
        {
          question: "Can I update product details after listing?",
          answer: "Yes, you can easily update product details such as price, description, and stock availability through the InstaMarkt dashboard.",
        },
      ],
    },
    {
      category: "Pricing",
      questions: [
        {
          question: "What is the pricing structure for InstaMarkt?",
          answer: "InstaMarkt offers a range of plans with different pricing options to fit various business needs. Plans include platform fees, commission rates, and transaction fees based on the services you require.",
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, InstaMarkt maintains a transparent pricing structure. All costs are clearly outlined in each plan to avoid any surprises.",
        },
        {
          question: "How can I change my pricing plan?",
          answer: "You can upgrade or downgrade your pricing plan anytime through your InstaMarkt account settings or by contacting our support team.",
        },
        {
          question: "Is there a free trial for new businesses?",
          answer: "Yes, InstaMarkt offers a free trial period for new businesses to explore the platform's features. Contact our sales team for more details on how to start.",
        },
      ],
    },
    {
      category: "Promotions & Marketing",
      questions: [
        {
          question: "How can I use promotions to attract customers?",
          answer: "InstaMarkt allows you to create custom promotions, discounts, and loyalty rewards to attract new customers and retain existing ones. These promotions can be tailored to specific products or customer groups.",
        },
        {
          question: "Can I offer free delivery as a promotion?",
          answer: "Yes, you can set up free delivery promotions for select customers or orders. This is an effective way to increase order volume and improve customer satisfaction.",
        },
        {
          question: "How do loyalty programs work on InstaMarkt?",
          answer: "Our loyalty program feature allows you to reward repeat customers with discounts, points, or exclusive offers, helping to build long-term customer relationships.",
        },
      ],
    },
    {
      category: "Getting Started",
      questions: [
        {
          question: "What are the requirements to join InstaMarkt?",
          answer: "You need a business license and to meet InstaMarkt's onboarding requirements. Our team will guide you through each step to ensure a smooth start.",
        },
        {
          question: "How do I sign up for InstaMarkt?",
          answer: "You can sign up directly on our website by following the on-screen instructions, or contact our sales team for personalized onboarding assistance.",
        },
        {
          question: "How quickly can I start selling after signing up?",
          answer: "Once you complete the onboarding process and list your products, you can start selling immediately. Our team is here to help you with setup if needed.",
        },
        {
          question: "Can I get a demo of the platform before signing up?",
          answer: "Absolutely! Contact our sales team to schedule a demo, and we’ll walk you through InstaMarkt's features and benefits tailored to your business needs.",
        },
      ],
    },
    {
      category: "Support & Assistance",
      questions: [
        {
          question: "What support options does InstaMarkt offer?",
          answer: "InstaMarkt provides 24/7 support through phone, email, and live chat. Our team is ready to assist you with any questions or issues you may encounter.",
        },
        {
          question: "How do I report a problem with my account?",
          answer: "You can report issues directly from your dashboard or contact our support team via email or phone for immediate assistance.",
        },
        {
          question: "Can I customize my support plan?",
          answer: "Yes, businesses can opt for additional support options based on their selected plan. Contact our team to discuss premium support options tailored to your needs.",
        },
      ],
    },
  ];
  
  const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
  
    const toggleQuestion = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-10 text-green-900">Frequently Asked Questions</h2>
  
          {faqs.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-900">{section.category}</h3>
              <div className="border-t border-b border-gray-300">
                {section.questions.map((item, index) => (
                  <div key={index} className="border-b border-gray-300">
                    <button
                      className="flex justify-between items-center w-full text-left py-4 px-4 text-black hover:text-green-600"
                      onClick={() => toggleQuestion(`${sectionIdx}-${index}`)}
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`transform transition-transform ${
                          openIndex === `${sectionIdx}-${index}` ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openIndex === `${sectionIdx}-${index}` && (
                      <div className="px-4 pb-4 text-gray-700">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }; 
  
  

export default function BusinessPage() {
  const signUpRef = useRef(null);

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
        <AboutUsSection/>
        <FAQSection/>
        <SignUpForm signUpRef={signUpRef} />
        <Footer />
      </main>
    </div>
  );
}
