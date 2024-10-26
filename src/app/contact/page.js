"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Apple, ArrowRight, ChevronDown } from "lucide-react";
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

const Header = ({ scrollToPricing }) => {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
    };
  
    return (
      <header className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <Link href="/business" className="flex items-center space-x-2">
            <Image
              src="/images/insta_market_business.png"
              alt="InstaMarkt Logo"
              width={400}
              height={150}
              className="object-contain"
            />
          </Link>
          <div className="hidden md:flex space-x-4">
            <Button variant="ghost" className="font-bold text-green-900 hover:text-green-700" onClick={() => router.push('/business')}>
              Home
            </Button>
            <Button variant="ghost" className="font-bold text-green-900 hover:text-green-700" onClick={scrollToPricing}>
              Pricing
            </Button>
  
            {/* Services Button with Dropdown */}
            <div className="relative">
              <button
                className="font-bold mt-2 text-green-900 hover:text-green-700 flex items-center pb-1" // Adjust padding-bottom
                onClick={toggleDropdown}
              >
                Services <ChevronDown className="ml-1" />
              </button>
              {isDropdownOpen && (
                <div className="absolute bg-white shadow-lg rounded-md mt-2 p-2 w-48 z-10">
                  <Link href="/services/onlineordering" className="block px-4 py-2 text-black hover:bg-gray-100">Online Ordering</Link>
                  <Link href="/services/deliveryandpickup" className="block px-4 py-2 text-black hover:bg-gray-100">Delivery & Pickup</Link>
                  <Link href="/services/promotions" className="block px-4 py-2 text-black hover:bg-gray-100">Promotions</Link>
                  {/* <Link href="/sponsored-listings" className="block px-4 py-2 text-black hover:bg-gray-100">Sponsored Listings</Link>
                  <Link href="/phone-ordering" className="block px-4 py-2 text-black hover:bg-gray-100">Phone Ordering</Link> */}
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
  
          <div className="flex space-x-2">
            <Button className="bg-green-900 hover:bg-green-700 rounded-full text-white">
              <p className="text-white font-bold">Log In</p>
            </Button>
            <Button className="bg-green-900 hover:bg-green-700 rounded-full text-white">
              <p className="text-white font-bold">Sign Up</p>
            </Button>
          </div>
        </div>
      </header>
    );
  };
const ContactPage = () => {
    const [businessType, setBusinessType] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
  
    const toggleDropdown = () => setDropdownVisible((prev) => !prev);
    const handleSelectItem = (value) => {
      setBusinessType(value);
      setDropdownVisible(false);
    };
  
    return (
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-green-500 text-black py-12 px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src="/images/customer_selling.png?height=400&width=600"
                alt="DoorDash representative talking to a merchant"
                className="rounded-lg shadow-lg"
                width={600}
                height={400}
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h1 className="text-4xl font-bold mb-4">Talk to our sales team</h1>
              <p className="mb-4">
                Want to speak to a sales representative?{' '}
                <a href="#contact-form" className="underline">
                  Contact us online
                </a>{' '}
                and we'll get back to you as soon as possible, or call us Monday-Saturday:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  India: 7023454603, 1800-717-576
                </li>

              </ul>
            </div>
          </div>
        </section>
  
        {/* Contact Form Section */}
        <section id="contact-form" className="py-12 px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
          <Card className="w-fullm overflow-visible">
            <CardContent className="flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <p className="mb-4 text-black">
                  If you're a merchant or store owner interested in partnering, we'd love to hear from you.
                </p>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" placeholder="Enter your business name" />
                  </div>
                  <div>
                    <Label htmlFor="businessAddress">Business Address</Label>
                    <Input id="businessAddress" placeholder="Enter your business address" />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="w-1/2">
                      <Label htmlFor="phone">Business Phone</Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="businessType">Select your business type</Label>
                    <Select>
                      <SelectTrigger onClick={toggleDropdown}>
                        {businessType || "Select business type"}
                      </SelectTrigger>
                      <SelectContent isVisible={dropdownVisible}>
                        <SelectItem value="restaurant" onClick={handleSelectItem}>Restaurant</SelectItem>
                        <SelectItem value="grocery" onClick={handleSelectItem}>Grocery Store</SelectItem>
                        <SelectItem value="retail" onClick={handleSelectItem}>Retail Store</SelectItem>
                        <SelectItem value="other" onClick={handleSelectItem}>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button  type="submit" className="w-full bg-green-900 hover:bg-green-700 rounded-full text-white">
                  Contact sales
        </Button>
               
                </form>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/images/customer-support.png?height=100&width=200"
                  alt="Restaurant staff preparing food"
                  className="rounded-lg m-10 shadow-lg"
                  width={400}
                  height={200}
                />
              </div>
            </CardContent>
          </Card>
          </div>
        </section>
      </div>
    );
  };
  


const Footer = () => (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto grid md:grid-cols-5 gap-8">
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
  const signUpRef = useRef(null);
  const pricingRef = useRef(null);

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header scrollToPricing={scrollToPricing} />
      <main>
        <ContactPage />
        <FAQ/>
        <Footer />
      </main>
    </div>
  );
}
