"use client";
import { Phone, Clock, Users, TrendingUp, Headphones } from "lucide-react";

import { useState, useEffect, useRef } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Apple, Smartphone, ArrowRight, ChevronDown, Menu, X } from "lucide-react"; // Added Menu and X icons
import { useRouter } from 'next/navigation'; // For navigation

// Custom Label Component with Black Text
const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-black mb-2">
    {children}
  </label>
);

// Custom Select Components with proper positioning and dropdown handling
const Select = ({ children }) => (
  <div className="relative w-full">
    {children}
  </div>
);

const SelectTrigger = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left text-black"
  >
    {children}
  </button>
);

const SelectContent = ({ children, isVisible }) => (
  <div
    className={`absolute mt-1 w-full rounded-md bg-white shadow-lg max-h-40 overflow-y-auto z-50 ${
      isVisible ? "block" : "hidden"
    }`}
    style={{ position: "absolute", top: "100%", left: 0 }}
  >
    {children}
  </div>
);

const SelectItem = ({ value, children, onClick }) => (
  <div
    onClick={() => onClick(value)}
    className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100"
  >
    {children}
  </div>
);

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
            onClick={scrollToPricing}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
const ContactPage = () => {
  const [businessType, setBusinessType] = useState("");
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 to-green-600 text-white py-16 lg:py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] -z-0" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Let's Grow Your Business Together
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Want to speak to a sales representative? Our team is here to help you scale your business with InstaMarkt.
              </p>
              
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                  <Phone className="h-6 w-6 mb-3 text-white" />
                  <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                  <p className="text-white/90">Monday-Saturday</p>
                  <a href="tel:7023454603" className="block text-lg font-medium mt-2 hover:text-white/80">
                    7023454603
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                  <Clock className="h-6 w-6 mb-3 text-white" />
                  <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                  <p className="text-white/90">9:00 AM - 6:00 PM</p>
                  <p className="text-white/90">Monday to Saturday</p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/30 to-transparent rounded-3xl filter blur-2xl"></div>
              <Image
                src="/images/customer_selling.png"
                alt="InstaMarkt Sales Team"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <Card className="overflow-visible border-0 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="businessName" className="text-gray-700">Business Name</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your business name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessAddress" className="text-gray-700">Business Address</Label>
                      <Input
                        id="businessAddress"
                        value={formData.businessAddress}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your business address"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-green-500 focus:border-green-500"
                          placeholder="name@business.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-700">Business Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-green-500 focus:border-green-500"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="businessType" className="text-gray-700">Business Type</Label>
                      <Select value={businessType} onValueChange={setBusinessType}>
                        <SelectTrigger className="w-full mt-1">
                          {businessType || "Select business type"}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="grocery">Grocery Store</SelectItem>
                          <SelectItem value="retail">Retail Store</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3 px-8 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      Contact Sales Team
                      {/* <ArrowRight className="ml-2 h-5 w-5" /> */}
                    </Button>
                  </form>
                </div>

                <div className="md:w-1/2 relative">
                  <div className="sticky top-8">
                    <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Partner With Us?</h3>
                      
                      <div className="space-y-4">
                        {[
                          { icon: Users, title: "Reach More Customers", desc: "Connect with millions of potential customers" },
                          { icon: TrendingUp, title: "Grow Your Revenue", desc: "Increase sales with our platform" },
                          { icon: Clock, title: "Quick Setup", desc: "Get started in less than 24 hours" },
                          { icon: Headphones, title: "24/7 Support", desc: "Always here to help you succeed" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="bg-green-100 p-2 rounded-lg">
                              <item.icon className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <p className="text-gray-600">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
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
    <section ref={signUpRef} className="bg-green-500 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start justify-between max-w-6xl mx-auto">
          {/* Left side content */}
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Frequently Asked Questions</h2>
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
export default function BusinessPage() {
  const pricingRef = useRef(null);

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const signUpRef = useRef(null);

  const scrollToSignup = () => {
    if (signUpRef.current) {
      signUpRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header scrollToPricing={scrollToSignup} />
      <main>
        <ContactPage />
        <SignUpForm signUpRef={signUpRef} />  {/* Pass the signUpRef to the SignUpForm */}
        <FAQ/>
        <Footer />
      </main>
    </div>
  );
}
