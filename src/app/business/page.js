"use client";

import { useState, useEffect, useRef } from 'react'; // Import useRef for referencing sections
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Apple, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // For navigation

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
  <section className="relative bg-white py-32 min-h-[800px] flex items-center justify-center">
    <div className="container mx-auto flex flex-col items-center text-center relative">
      <div className="w-full mb-10 z-10">
        <h1 className="text-6xl font-bold mb-6 text-black">
          Boost Your Retail Business With <br />
          <span className="text-green-600">Quick Commerce</span>
        </h1>
        <p className="text-xl mb-8 text-black">
          Reach millions of shoppers and grow your brand.
        </p>
        {/* Modify the button to scroll to the SignUpForm */}
        <Button onClick={scrollToSignup} className="bg-green-900 hover:bg-green-700 rounded-full text-white">
          <p className="text-white font-bold rounded-full">Get Started</p>
        </Button>
      </div>
      <div className="absolute mt-20 top-[-300px] right-[-50px] w-[100px] md:w-[400px]">
        <Image
          src="/images/quick-commerce.png"
          alt="Top Right Image"
          width={300}
          height={400}
          className="rounded-lg"
        />
      </div>
      <div className="absolute  bottom-[-200px] left-[-150px] md:bottom-0 md:left-[-50px] w-[250px] md:w-[300px]">
        <Image
          src="/images/quick_commerce_2.png"
          alt="Bottom Left Image"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
    const videoRef = useRef(null); // Reference to the video element
  
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 2.0; // Set playback speed to 2x
      }
    }, []);
  
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-black mb-4">How to get your business on InstaMarkt</h2>
            <ul className="space-y-4 text-black text-lg">
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
              ref={videoRef} // Attach ref to video element
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

  const GrowBrand = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const benefits = [
    {
      title: "Online Ordering",
      description: "Add online ordering for your products directly from retail store in the city to keep up with quick commerce and pay only 1% per product of delivery and monthly platform fees.",
      image: "/images/customer_notification.png"
    },
    {
      title: "Actionable insights and incremental sales",
      description: "With thoughtful controls and automation at your fingertips, Instacart helps you create impactful ads backed by industry-leading insights and real-time reporting.",
      image: "/images/insights.png"
    },
    {
      title: "Reach a wider audience with ease",
      description: "Leverage our platform's expansive network to help your retail brand connect with a wider audience across multiple channels, enhancing your brand's visibility.",
      image: "/images/audience.png"
    },
    {
      title: "Efficient inventory management",
      description: "Stay ahead with streamlined inventory tracking and real-time updates, minimizing stockouts and ensuring product availability for customers.",
      image: "/images/inventory.png"
    },
    {
      title: "Real-time customer notifications",
      description: "Keep customers engaged and informed with instant notifications about new arrivals, restocks, and promotions, creating a personalized shopping experience.",
      image: "/images/customer_notification.png"
    },
    {
      title: "24/7 Support",
      description: "We Offer Free Customer Support 24/7 Via Email, Phone and Live Chat Support",
      image: "/images/customer_support.png"
    }
  ];

  // Function to navigate to the next slide (moving two items at a time)
  const handleNext = () => {
    if (!isSliding) {
      setIsSliding(true);
      setCurrentIndex((prevIndex) => (prevIndex + 2) % benefits.length);
    }
  };

  // Function to navigate to the previous slide (moving two items at a time)
  const handlePrev = () => {
    if (!isSliding) {
      setIsSliding(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? benefits.length - 2 : prevIndex - 2
      );
    }
  };

  // Function to update index based on dot click
  const handleDotClick = (index) => {
    if (!isSliding) {
      setIsSliding(true);
      setCurrentIndex(index * 2);
    }
  };

  // Reset sliding state after animation
  useEffect(() => {
    if (isSliding) {
      const timer = setTimeout(() => setIsSliding(false), 700); // Animation duration in ms
      return () => clearTimeout(timer);
    }
  }, [isSliding]);


  return (
    <section className="bg-white py-20 relative">
    <div className="container mx-auto relative">
      <h2 className="text-5xl font-bold mb-12 text-center text-green-900">Grow your brand with us</h2>
  
      {/* Carousel wrapper */}
      <div className="relative mx-auto">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full z-10 shadow-md"
        >
          &#8592;
        </button>
  
        {/* Carousel content */}
        <div className="relative overflow-hidden mb-[-10px]">
          <div
            className="flex transition-all duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 26}%)` }}
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="w-[42%] flex-shrink-0 mx-[-45px] mb-40" // Reduced the spacing (was mx-6, now mx-2)
              >
                <Card className="h-full ml-20 w-3/5 hover:scale-105 transition-transform hover:shadow-2xl rounded-lg shadow-lg overflow-hidden">
                  <div className="relative w-full h-[250px]">
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2 text-black">{benefit.title}</h3>
                    <p className="text-black">{benefit.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
  
        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute right-[-60px] top-1/2 bg-white text-black transform -translate-y-1/2 px-4 py-2 rounded-full z-10 shadow-md"
        >
          &#8594;
        </button>
      </div>
  
      {/* Pagination Dots */}
      <div className="flex justify-center mt-[-100px] space-x-2">
        {Array.from({ length: Math.ceil(benefits.length / 2) }).map((_, idx) => (
          <div
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${idx * 2 === currentIndex ? 'bg-green-800' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  </section>
  
  
  );
  };
  

const SignUpForm = ({ signUpRef }) => {
    const [businessName, setBusinessName] = useState('');
    const router = useRouter(); // Now router should work correctly
  
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
            <h2 className="text-4xl font-bold mb-6">Sign up and unlock sales</h2>
            <p className="text-xl mb-4">Increase your retail business to reach audiences on their doorsteps</p>
            <Image
          src="/images/boostsales.png"
          alt="Bottom Left Image"
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
const PricingPlanCard = ({ title, price, originalPrice, commission, description, features, buttonText, onSelect, selected }) => {
  return (
    <div
      onClick={onSelect}
      className={`border-2 rounded-lg p-6 flex flex-col space-y-4 w-full md:w-1/3 transition-transform transform hover:scale-105 hover:shadow-lg ${
        selected ? 'border-green-600 bg-white' : 'border-gray-300 bg-white'
      } min-h-[450px]`}
    >
      <div className="flex-grow">
        {/* Title Section */}
        <h2 className="text-2xl font-bold text-black">{title}</h2>
        
        {/* Pricing Section */}
        <div className="flex items-center space-x-2 mb-4">
          <p className="text-xl text-red-500 line-through">{originalPrice}</p>
          <p className="text-xl text-green-600 font-semibold">{price}</p>
        </div>
        {/* Line Below Pricing */}
        <hr className="border-gray-300 my-4" />
  
        {/* Commission and Description */}
        <p className="text-md font-medium text-black">{commission}</p>
        <p className="text-md text-gray-600 mb-4">{description}</p>
  
        {/* Features Section */}
        <ul className="list-none ml-6 text-gray-600 space-y-1 mb-4">
          {features.map((feature, index) => (
            feature.included ? (
              <li key={index} className="flex items-center text-sm">
                <span className="text-green-600 mr-2">&#10003;</span>
                {feature.name}
              </li>
            ) : null
          ))}
        </ul>

        {/* Line Above Excluded Features */}
        <hr className="border-gray-300 my-4" />
        
        {/* Excluded Features */}
        <ul className="list-none ml-6 text-gray-600 space-y-1 mb-4">
          {features.map((feature, index) => (
            !feature.included ? (
              <li key={index} className="flex items-center text-sm">
                <span className="text-red-600 mr-2">&#10060;</span>
                {feature.name}
              </li>
            ) : null
          ))}
        </ul>
      </div>

      {/* Button positioned at the bottom */}
      <Button className="bg-green-900 mt-auto w-full hover:bg-green-700 rounded-full text-white">{buttonText}</Button>
    </div>
  );
};

const PricingSection = ({ pricingRef }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const plans = [
    {
      title: "Starter Plan",
      originalPrice: "Rs 999",
      price: "Rs 499 for 7 Days",
      commission: "12% per order",
      description: "Ideal for new small businesses.",
      features: [
        { name: "Online Ordering", included: true },
        { name: "Basic Support", included: true },
        { name: "Limited Reach", included: false },
        { name: "Premium Listing", included: false },
      ],
      buttonText: "Select Starter",
      plan: 'starter',
    },
    {
      title: "Basic Plan",
      originalPrice: "Rs 1,499",
      price: "Rs 1,099 for 30 Days",
      commission: "10% per order",
      description: "Grow your small business.",
      features: [
        { name: "Online Ordering", included: true },
        { name: "Standard Support", included: true },
        { name: "Expanded Reach", included: true },
        { name: "Premium Listing", included: false },
      ],
      buttonText: "Select Basic",
      plan: 'basic',
    },
    {
      title: "Advanced Plan",
      originalPrice: "Rs 2,499",
      price: "Rs 2,099 for 60 Days",
      commission: "8% per order",
      description: "Maximize your small business potential.",
      features: [
        { name: "Online Ordering", included: true },
        { name: "Priority Support", included: true },
        { name: "Expanded Reach", included: true },
        { name: "Premium Listing", included: true },
      ],
      buttonText: "Select Advanced",
      plan: 'advanced',
    },
  ];

  return (
    <section ref={pricingRef} className="py-12 px-4 md:px-6 bg-white lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Link aligned to the right above the heading */}
        <div className="flex justify-end mb-4">
          <Link
            href="/pricing"
            className="text-green-900 text-bold hover:text-green-800 flex items-center"
          >
            See more pricing
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
  
        {/* Centered heading */}
        <h2 className="text-4xl font-bold mb-6 text-center text-green-900">
          Platform Fee Starting Price Of just Rs 499 Rs For Small Retailers Of 50 Outlets or Less PAN India
        </h2>
  
        {/* Subheading or description */}
        <p className="text-lg text-gray-600 mb-8 text-center">
          Select a plan that fits your goals and budget. Each plan comes with unique benefits to help your business grow.
        </p>
  
        {/* Pricing Plan Cards */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {plans.map((plan, index) => (
            <PricingPlanCard
              key={index}
              title={plan.title}
              originalPrice={plan.originalPrice}
              price={plan.price}
              commission={plan.commission}
              description={plan.description}
              features={plan.features}
              buttonText={plan.buttonText}
              onSelect={() => handlePlanSelect(plan.plan)}
              selected={selectedPlan === plan.plan}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default function BusinessPage() {
  const signUpRef = useRef(null); // Ref for the SignUpForm section
  const pricingRef = useRef(null); // Ref for the Pricing Section

  // Function to scroll to the SignUpForm section
  const scrollToSignup = () => {
    if (signUpRef.current) {
      signUpRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll to the Pricing section
  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  

  return (
    <div className="min-h-screen flex flex-col">
      <Header scrollToPricing={scrollToPricing} /> {/* Pass the scrollToPricing function as a prop */}
      <main>
        <Hero scrollToSignup={scrollToSignup} />
        <GrowBrand />
        <HowItWorks />
        <PricingSection pricingRef={pricingRef} /> {/* Pricing Section */}
        <SignUpForm signUpRef={signUpRef} />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}



