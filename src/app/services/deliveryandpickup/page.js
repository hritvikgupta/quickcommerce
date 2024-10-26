"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Apple, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

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
        <div className="hidden md:flex space-x-1"> {/* Reduced from space-x-4 to space-x-2 */}
          <Button variant="ghost" className="font-bold text-green-900 hover:text-green-700" onClick={() => router.push('/business')}>
            Home
          </Button>
          <Button variant="ghost" className="font-bold text-green-900 hover:text-green-700" onClick={scrollToPricing}>
            Pricing
          </Button>

          {/* Services Button with Dropdown */}
          <div className="relative">
            <button
              className="font-bold mt-2 ml-4 text-green-900 hover:text-green-700 flex items-center pb-1" // Adjust padding-bottom
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
          <Button variant="ghost" className="ml-[-10px] font-bold text-green-900 hover:text-green-700" onClick={() => router.push('/')}>
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

  const Hero = ({ scrollToSignup }) => (
    <section className="py-12 px-4 md:px-6 bg-white lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 min-h-[550px] md:grid-cols-2 gap-8 items-center">
        {/* Left side text content */}
        <div>
        <h1 className="text-4xl text-black md:text-5xl font-bold mb-4">
  We will help you connected to delivery partners with realtime tracking for <span className="text-green-600">Quick commerce store</span>
</h1>
<p className="text-xl text-black mb-8">
  <span className="font-bold text-green-800">With Rs 0 Commission on the first 200 orders</span>, you can jumpstart your quick commerce journey! Reach your customers directly, boost your brand, and enjoy seamless sales with no hidden costs.
</p>


          <Button
            className="bg-green-600 hover:bg-green-700 rounded-full text-white"
            onClick={scrollToSignup}  // Scrolls to the signup form when clicked
          >
            <p className='text-bold'>Get Started with InstaMarkt Business</p>
          </Button>
          <Link
              href="/contact"
              className="text-green-800 mt-5 ml-3 text-bold hover:text-green-800 flex items-center"
            >
              Contact sales for demo and customized planning
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
        </div>
  
        {/* Right side image content */}
        <div className="flex justify-center">
          <Image
            src="/images/deliveryorders.png" // Replace with your image path
            alt="InstaMarkt Business Plans"
            width={500}
            height={400}
            className="object-cover rounded-lg"
          />
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
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (businessName) {
      router.push(`/marketplace?businessName=${encodeURIComponent(businessName)}`);
    }
  };

  return (
    <section ref={signUpRef} className="bg-green-500 text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-4xl font-bold mb-6">Sign Up and Unlock Sales</h2>
          <p className="text-xl mb-4">Increase your retail business to reach audiences on their doorsteps</p>
          <Image
            src="/images/boostsales.png"
            alt="Boost Sales"
            width={400}
            height={400}
            className="rounded-lg mx-20"
          />
        </div>
        <div className="md:w-1/2 bg-white text-black p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Business Address"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-1/2 p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="tel"
                placeholder="Business Phone"
                className="w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button type="submit" className="w-full h-10 bg-green-900 hover:bg-green-600 text-white rounded-full">
              Start Free Trial
            </button>
          </form>
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
          <h2 className="text-3xl font-bold text-black mb-4">Reach InstaMart Customers Instantly</h2>
          <p className="text-lg text-gray-700 mb-6">
            Boost your business by partnering with InstaMart’s delivery network. Tap into a growing customer base that values convenience and speed. With zero delivery fees on the first 200 orders, attract more customers without any extra cost.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Promote your store to our extensive network of InstaMart shoppers who order frequently. Enjoy increased visibility and watch your take-home revenue grow as you deliver a seamless experience.
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
  <footer className="bg-gray-100 py-12">
    <div className="container mx-auto grid md:grid-cols-5 gap-8">
      <div>
        <h3 className="font-semibold mb-4 text-black">Get Deliveries with InstaMarkt</h3>
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
        {
          title: "Popular Departments",
          items: ["Fashion", "Electronics", "Home Essentials", "Beauty & Personal Care", "Health & Wellness"],
        },
        { title: "More Departments", items: ["Alcohol", "Beverages", "Frozen Food", "Organic Grocery"] },
        { title: "Get to Know Us", items: ["Press", "Careers", "Blog", "Ideas & Guides", "Help"] },
        { title: "Groceries & Essentials", items: ["Grocery", "Dairy Products", "Meat", "Seafood", "Pantry Food"] },
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

  const scrollToSignup = () => {
    if (signUpRef.current) {
      signUpRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
