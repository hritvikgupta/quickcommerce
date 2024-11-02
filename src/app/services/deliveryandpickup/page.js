"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Apple, Smartphone, ArrowRight, ChevronDown, Menu, X } from "lucide-react"; // Added Menu and X icons
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
            onClick={scrollToPricing}
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-400 leading-tight">
                We will help you connected to delivery partners with realtime tracking for{" "}
                <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Quick commerce store
                </span>
              </h1>
  
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                <span className="font-bold text-green-800 block text-2xl mb-2">
                  Rs 0 Commission on the first 200 orders
                </span>
                You can jumpstart your quick commerce journey! Reach your customers directly, 
                boost your brand, and enjoy seamless sales with no hidden costs.
              </p>
  
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
              src="/images/deliveryorders.png"
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
    <h2 className="text-4xl text-4xl text-green-900 font-bold mb-12 text-black">With InstaMart's Delivery Partner, Receive Orders And Deliver Them Instantly</h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      
      {/* Column 1 */}
      <div className="flex flex-col items-center">
        <Image
          src="/images/manageorder.png" // Replace with the actual path to your icon image
          alt="Instant Order Management Icon"
          width={150}
          height={200}
          className="mb-4"
        />
        <h3 className="text-xl font-semibold text-black mb-2">Manage Orders Seamlessly</h3>
        <p className="text-gray-700">
          Handle orders instantly and keep your operations smooth with real-time updates and automated order management.
        </p>
      </div>
      
      {/* Column 2 */}
      <div className="flex flex-col items-center">
        <Image
          src="/images/realtimetracking.png" // Replace with the actual path to your icon image
          alt="Real-Time Tracking Icon"
          width={150}
          height={200}
          className="mb-4"
        />
        <h3 className="text-xl font-semibold text-black mb-2">Real-Time Delivery Tracking</h3>
        <p className="text-gray-700">
          Provide your customers with live tracking, keeping them informed about the delivery status every step of the way.
        </p>
      </div>
      
      {/* Column 3 */}
      <div className="flex flex-col items-center">
        <Image
          src="/images/247support.png" // Replace with the actual path to your icon image
          alt="24/7 Support Icon"
          width={150}
          height={200}
          className="mb-4"
        />
        <h3 className="text-xl font-semibold text-black mb-2">24/7 Dedicated Support</h3>
        <p className="text-gray-700">
          Access round-the-clock support for all your delivery needs, from technical assistance to live order help.
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
  
  
  const PartnerBenefits = () => {
    return (
      <section className="bg-white py-12 md:py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
            
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-transparent rounded-2xl filter blur-2xl opacity-70"></div>
                
                {/* Main Image */}
                <div className="relative">
                  <Image
                    src="/images/customerinstantly.png"
                    alt="InstaMart Delivery Partner"
                    width={1000}
                    height={1000}
                    className="rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-full h-auto"
                    priority
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-100 rounded-full opacity-50 hidden md:block"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-50 rounded-full opacity-50 hidden md:block"></div>
              </div>
            </div>
            
            {/* Text Section */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight">
                  Reach InstaMart Customers Instantly
                </h2>
                
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-gray-700">
                    Boost your business by partnering with InstaMart's delivery network. Tap into a growing customer base that values convenience and speed. With zero delivery fees on the first 200 orders, attract more customers without any extra cost.
                  </p>
                  
                  <p className="text-base md:text-lg text-gray-700">
                    Promote your store to our extensive network of InstaMart shoppers who order frequently. Enjoy increased visibility and watch your take-home revenue grow as you deliver a seamless experience.
                  </p>
                </div>
                
                {/* Features List */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Zero delivery fees for first 200 orders</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Access to growing customer base</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Increased store visibility</span>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="flex justify-center md:justify-start pt-4">
                <Link href="/pricing">
                  <span className="inline-flex items-center justify-center bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg">
                    Explore plans and pricing
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
  };


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
        <PartnerBenefits/>
        <AdditionalPricingOptionsSection />

        <HowItWorks />
        <SignUpForm signUpRef={signUpRef} />  {/* Pass the signUpRef to the SignUpForm */}
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
