"use client";

import { useState, useEffect, useRef } from 'react'; // Import useRef for referencing sections
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { 
  Apple, 
  Smartphone, 
  ArrowRight, 
  ChevronDown, 
  Menu, 
  X, 
  CheckIcon,
  ChevronLeft, 
  ChevronRight,
  Info,
  Calendar,
  CreditCard
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // For navigation
import axios from 'axios';
 
const Header = ({ scrollToPricing, scrollToSignup }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link href="/business" className="flex items-center space-x-2">
          <Image
            src="/images/insta_market_business.png"
            alt="InstaMarkt Logo"
            width={300}
            height={150}
            className="object-contain"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-green-900" />
          ) : (
            <Menu className="h-6 w-6 text-green-900" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          <Button 
            variant="ghost" 
            className="font-bold text-green-900 hover:text-green-700" 
            onClick={() => router.push('/business')}
          >
            Home
          </Button>
          <Button 
            variant="ghost" 
            className="font-bold text-green-900 hover:text-green-700" 
            onClick={scrollToPricing}
          >
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
                <Link href="/services/onlineordering" className="block px-4 py-2 text-black hover:bg-gray-100">
                  Online Ordering
                </Link>
                <Link href="/services/deliveryandpickup" className="block px-4 py-2 text-black hover:bg-gray-100">
                  Delivery & Pickup
                </Link>
                <Link href="/services/promotions" className="block px-4 py-2 text-black hover:bg-gray-100">
                  Promotions
                </Link>
              </div>
            )}
          </div>

          <Button 
            variant="ghost" 
            className="font-bold text-green-900 hover:text-green-700" 
            onClick={() => router.push('/contact')}
          >
            Contact
          </Button>
          <Button 
            variant="ghost" 
            className="font-bold text-green-900 hover:text-green-700" 
            onClick={() => router.push('/aboutus')}
          >
            About Us
          </Button>
          <Button 
            variant="ghost" 
            className="font-bold text-green-900 hover:text-green-700" 
            onClick={() => router.push('/')}
          >
            Go To InstaMarkt Store
          </Button>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex space-x-2">
          <Button 
            className="bg-white hover:bg-gray-50 border-2 border-green-900 rounded-full text-black transition-all duration-200" 
            onClick={() => router.push('/auth')}
          >
            <p className="text-black font-bold">Login/Signup</p>
          </Button>
          <Button 
            className="bg-green-900 hover:bg-green-700 rounded-full text-white" 
            onClick={scrollToSignup}
          >
            <p className="text-white font-bold">Get Started</p>
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
            <div className="fixed top-16 right-0 w-full max-w-sm h-screen bg-white shadow-lg overflow-y-auto">
              <div className="flex flex-col p-4 space-y-3">
                {/* Navigation Links */}
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full text-left font-bold text-green-900 justify-start" 
                    onClick={() => {
                      router.push('/business');
                      toggleMobileMenu();
                    }}
                  >
                    Home
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-left font-bold text-green-900 justify-start" 
                    onClick={() => {
                      scrollToPricing();
                      toggleMobileMenu();
                    }}
                  >
                    Pricing
                  </Button>
                </div>

                {/* Services Section */}
                <div className="py-2 space-y-2 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-500 px-3">Services</p>
                  <Button 
                    variant="ghost" 
                    className="w-full text-left font-bold text-green-900 justify-start" 
                    onClick={() => {
                      router.push('/services/onlineordering');
                      toggleMobileMenu();
                    }}
                  >
                    Online Ordering
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-left font-bold text-green-900 justify-start" 
                    onClick={() => {
                      router.push('/services/deliveryandpickup');
                      toggleMobileMenu();
                    }}
                  >
                    Delivery & Pickup
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-left font-bold text-green-900 justify-start" 
                    onClick={() => {
                      router.push('/services/promotions');
                      toggleMobileMenu();
                    }}
                  >
                    Promotions
                  </Button>
                </div>

                {/* Additional Links */}
                <div className="py-2 space-y-2 border-t border-gray-100">
                  <Button 
                    variant="ghost" 
                    className="w-full text-left font-bold text-green-900 justify-start" 
                    onClick={() => {
                      router.push('/contact');
                      toggleMobileMenu();
                    }}
                  >
                    Contact
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-left font-bold text-green-900 justify-start" 
                    onClick={() => {
                      router.push('/aboutus');
                      toggleMobileMenu();
                    }}
                  >
                    About Us
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-left font-bold text-green-900 justify-start" 
                    onClick={() => {
                      router.push('/');
                      toggleMobileMenu();
                    }}
                  >
                    Go To InstaMarkt Store
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-2 border-t border-gray-100">
                  <Button 
                    className="w-full bg-white text-black hover:bg-gray-50 border-2 border-green-900 text-black rounded-full" 
                    onClick={() => {
                      router.push('/auth');
                      toggleMobileMenu();
                    }}
                  >

            <p className="text-black font-bold">Login/Signup</p>
                  </Button>
                  <Button 
                    className="w-full bg-green-900 hover:bg-green-700 text-white rounded-full" 
                    onClick={() => {
                      scrollToSignup();
                      toggleMobileMenu();
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};


const Hero = ({ scrollToSignup }) => {
  const router = useRouter(); // Add this hook

  return (
  <section className="relative bg-white py-12 md:py-20 lg:py-32 min-h-[500px] md:min-h-[800px] overflow-hidden">
    <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col items-center justify-center max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="w-full text-center relative z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-black leading-tight">
          Transform Your Retail and D2C Business{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Quick Commerce
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Reach millions of shoppers and grow your brand with our innovative platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToSignup} 
              className="w-full sm:w-auto bg-green-900 hover:bg-green-700 text-white rounded-full px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get Started Now
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-2 border-green-900 text-green-900 hover:bg-green-50 rounded-full px-8 py-4 text-lg font-semibold"
              onClick={() => router.push('/aboutus')}

            >
              Learn More
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
            <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-green-600">1M+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-green-600">50K+</div>
              <div className="text-sm text-gray-600">Merchants</div>
            </div>
            <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm col-span-2 md:col-span-1">
              <div className="text-2xl md:text-3xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="relative w-full mt-12 md:mt-0">
          {/* Mobile-friendly single image for small screens */}
          <div className="md:hidden relative h-[300px] w-full">
            <Image
              src="/images/quick-commerce.png"
              alt="Quick Commerce"
              layout="fill"
              objectFit="contain"
              className="rounded-lg transform hover:scale-105 transition-duration-300"
            />
          </div>

          {/* Desktop images */}
          <div className="hidden md:block">
            {/* Top Right Image */}
            <div className="absolute top-[-200px] right-[-100px] w-[400px] h-[400px]">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-transparent rounded-full filter blur-3xl opacity-70"></div>
                <Image
                  src="/images/quick-commerce.png"
                  alt="Top Right Image"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg transform hover:scale-105 transition-duration-300"
                />
              </div>
            </div>

            {/* Bottom Left Image */}
            <div className="absolute bottom-[-100px] left-[-100px] w-[350px] h-[350px]">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-bl from-green-50 to-transparent rounded-full filter blur-3xl opacity-70"></div>
                <Image
                  src="/images/quick_commerce_2.png"
                  alt="Bottom Left Image"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg transform hover:scale-105 transition-duration-300"
                />
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="hidden md:block absolute top-1/4 left-1/4 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="hidden md:block absolute top-1/3 right-1/3 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
      </div>
    </div>

    {/* Background decorative elements */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-50/50 to-transparent"></div>
    </div>
  </section>
);
};

// Add these animations to your global CSS
const styles = `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

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

const GrowBrand = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const scrollRef = useRef(null);

  const benefits = [
    {"title":"Online Ordering", "description":"Add online ordering for your products directly from retail store in the city to keep up with quick commerce and pay only 1% per product of delivery and monthly platform fees.", "image":"/images/online_ordering.png"},
    {"title":"Actionable insights and incremental sales", "description":"With thoughtful controls and automation at your fingertips, Instamarkt helps you create impactful ads backed by industry-leading insights and real-time reporting.", "image":"/images/insights.png"},
    {"title":"Reach a wider audience with ease", "description":"Leverage our platform's expansive network to help your retail brand connect with a wider audience across multiple channels, enhancing your brand's visibility.", "image":"/images/audience.png"},
    {"title":"Efficient inventory management", "description":"Stay ahead with streamlined inventory tracking and real-time updates, minimizing stockouts and ensuring product availability for customers.", "image":"/images/inventory.png"},
    {"title":"Real-time customer notifications", "description":"Keep customers engaged and informed with instant notifications about new arrivals, restocks, and promotions, creating a personalized shopping experience.", "image":"/images/notification.png"},
    {"title":"24/7 Support", "description":"We Offer Free Customer Support 24/7 Via Email, Phone and Live Chat Support", "image":"/images/customer_support.png"}
  ];

  // Handle window resize and initial mobile check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleNext = () => {
    if (!isSliding) {
      setIsSliding(true);
      setCurrentIndex((prevIndex) => {
        const maxIndex = isMobile ? benefits.length - 1 : benefits.length - 2;
        return prevIndex >= maxIndex ? 0 : prevIndex + (isMobile ? 1 : 2);
      });
    }
  };

  const handlePrev = () => {
    if (!isSliding) {
      setIsSliding(true);
      setCurrentIndex((prevIndex) => {
        if (prevIndex === 0) {
          return isMobile ? benefits.length - 1 : benefits.length - 2;
        }
        return prevIndex - (isMobile ? 1 : 2);
      });
    }
  };

  const handleDotClick = (index) => {
    if (!isSliding) {
      setIsSliding(true);
      setCurrentIndex(isMobile ? index : index * 2);
    }
  };

  useEffect(() => {
    if (isSliding) {
      const timer = setTimeout(() => setIsSliding(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isSliding]);

  return (
    <section className="bg-white py-20 relative">
      <div className="container mx-auto px-4 md:px-0 relative">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-green-900">
          Grow your brand with us
        </h2>

        {/* Carousel wrapper */}
        <div className="relative mx-auto">
          {/* Left Button */}
          <button
            onClick={handlePrev}
            className={`absolute left-0 md:left-[-60px] top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full z-10 shadow-md transition-opacity duration-200 ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
            disabled={currentIndex === 0}
          >
            &#8592;
          </button>

          {/* Carousel content */}
          <div 
            ref={scrollRef}
            className="relative overflow-hidden mb-[-10px] px-4 md:px-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-all duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${isMobile ? currentIndex * 100 : currentIndex * 26}%)` 
              }}
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="w-full md:w-[42%] flex-shrink-0 md:mx-[-45px] mb-10 md:mb-40 px-4 md:px-0"
                >
                  <Card className="h-full md:ml-20 w-full md:w-3/5 hover:scale-105 transition-transform hover:shadow-2xl rounded-lg shadow-lg overflow-hidden">
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
                      <p className="text-sm md:text-base text-black">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={handleNext}
            className={`absolute right-0 md:right-[-60px] top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full z-10 shadow-md transition-opacity duration-200 ${
              currentIndex === (isMobile ? benefits.length - 1 : benefits.length - 2) 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-50'
            }`}
            disabled={currentIndex === (isMobile ? benefits.length - 1 : benefits.length - 2)}
          >
            &#8594;
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 md:mt-[-100px] space-x-2">
          {Array.from({ length: isMobile ? benefits.length : Math.ceil(benefits.length / 2) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`transition-all duration-300 ${
                (isMobile ? idx === currentIndex : idx * 2 === currentIndex)
                  ? 'w-8 h-2 bg-green-600' 
                  : 'w-2 h-2 bg-gray-300'
              } rounded-full`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Current Slide Indicator */}
        <div className="text-center mt-4 text-sm font-medium text-gray-600">
          {currentIndex + 1} of {isMobile ? benefits.length : Math.ceil(benefits.length / 2)} - {benefits[currentIndex].title}
        </div>
      </div>
    </section>
  );
};

  // const SignUpForm = ({ signUpRef }) => {
  //   const [businessName, setBusinessName] = useState('');
  //   const [businessType, setBusinessType] = useState('');
  //   const [businessAddress, setBusinessAddress] = useState('');
  //   const [skuCount, setSkuCount] = useState('');
  //   const router = useRouter();
  
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (businessName) {
  //       router.push(`/marketplace?businessName=${encodeURIComponent(businessName)}`);
  //     }
  //   };
  
  //   return (
  //     <section ref={signUpRef} className="bg-green-500 text-white py-20">
  //       <div className="container mx-auto flex flex-col md:flex-row items-center">
  //         <div className="md:w-1/2 mb-10 md:mb-0">
  //           <h2 className="text-4xl font-bold mb-6">Sign up and unlock sales</h2>
  //           <p className="text-xl mb-4">Increase your retail business to reach audiences on their doorsteps</p>
  //           <Image
  //             src="/images/boostsales.png"
  //             alt="Bottom Left Image"
  //             width={400}
  //             height={400}
  //             className="rounded-lg mx-20"
  //           />
  //         </div>
  //         <div className="md:w-1/2 bg-white text-black p-8 rounded-lg">
  //           <form onSubmit={handleSubmit} className="space-y-4">
  //             <input
  //               type="text"
  //               placeholder="Business Name"
  //               value={businessName}
  //               onChange={(e) => setBusinessName(e.target.value)}
  //               required
  //               className="w-full p-2 border border-gray-300 rounded-lg"
  //             />
  //             <input
  //               type="text"
  //               placeholder="Business Address"
  //               value={businessAddress}
  //               onChange={(e) => setBusinessAddress(e.target.value)}
  //               required
  //               className="w-full p-2 border border-gray-300 rounded-lg"
  //             />
  //             <select
  //               value={businessType}
  //               onChange={(e) => setBusinessType(e.target.value)}
  //               required
  //               className="w-full p-2 border border-gray-300 rounded-lg text-gray-500"
  //             >
  //               <option value="" disabled hidden>Select Business Type</option>
  //               <option value="Restaurant">Restaurant</option>
  //               <option value="Grocery">Grocery (fresh produce, perishables, shelf-stable products, dairy goods, pre-packaged meals)</option>
  //               <option value="Alcohol">Alcohol</option>
  //               <option value="Convenience">Convenience (everyday products, shelf-stable products, hot food / ready to eat)</option>
  //               <option value="Flower Shop">Flower Shop</option>
  //               <option value="Pet Store">Pet Store</option>
  //               <option value="Retail">Retail</option>
  //               <option value="Order Food">I want to order food...</option>
  //               <option value="Become Dasher">I want to become a Dasher...</option>
  //             </select>
  //             <select
  //               value={skuCount}
  //               onChange={(e) => setSkuCount(e.target.value)}
  //               required
  //               className="w-full p-2 border border-gray-300 rounded-lg text-gray-500"
  //             >
  //               <option value="" disabled hidden>Total SKUs for Sale</option>
  //               <option value="0-500">Less than 100</option>
  //               <option value="500-1000">100 to 500</option>
  //               <option value="1000-5000">500 to 1000</option>
  //               <option value="5000+">1000 or more</option>
  //             </select>
  //             <div className="flex space-x-4">
  //               <input
  //                 type="email"
  //                 placeholder="Email Address"
  //                 className="w-1/2 p-2 border border-gray-300 rounded-lg"
  //                 required
  //               />
  //               <input
  //                 type="tel"
  //                 placeholder="Business Phone"
  //                 className="w-1/2 p-2 border border-gray-300 rounded-lg"
  //                 required
  //               />
  //             </div>
  //             <button type="submit" className="w-full h-10 bg-green-900 hover:bg-green-600 text-white rounded-full">
  //               Start Free Trial
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // };
  
  const generateBusinessId = (businessName, businessType, businessCity, businessPhone, businessPincode, businessEmail) => {
    const cleanBusinessName = businessName.trim().toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 3);
    const cleanBusinessType = businessType.trim().toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 3);
    const cleanCity = businessCity.trim().toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 3);
    // Take last 4 digits of phone number
    const lastFourPhone = businessPhone.slice(-4);
    // Take last 3 digits of pincode
    const lastThreePincode = businessPincode.slice(-3);
    // Take first part of email before @
    const cleanEmail = businessEmail.split('@')[0].substring(0, 3);
    
    return `BIZ-${cleanBusinessName}${cleanBusinessType}${cleanCity}-${lastFourPhone}${lastThreePincode}${cleanEmail}`;
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Prevent double submission
      if (isSubmitting) return;
      setIsSubmitting(true);
  
      try {
        // Generate business ID
        const businessId = generateBusinessId(
          businessName,
          businessType,
          businessCity,
          businessPhone,
          businessPincode,
          businessEmail
        );
  
        // Check if businessId already exists
        const checkResponse = await axios.get(
          `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table?filterByFormula={Business ID}='${businessId}'`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        // If business exists, show error and return
        if (checkResponse.data.records.length > 0) {
          alert('A business with similar details already exists. Please verify your information or contact support if you believe this is an error.');
          setIsSubmitting(false);
          return;
        }
  
        // If business doesn't exist, proceed with creation
        const businessData = {
          fields: {
            "Business ID": businessId,
            Name: businessName,
            Type: businessType,
            Address: businessAddress.trim(),
            State: businessState.trim(),
            City: businessCity.trim(),
            Pincode: parseInt(businessPincode.trim()),
            "SKU Count": skuCount,
            "Business Email": businessEmail.trim(),
            "Business Phone": businessPhone.trim(),
            Status: 'Pending',
          }
        };
  
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
  
        console.log("Business record created:", businessResponse.data);
        
        // Store business ID in localStorage
        localStorage.setItem('businessId', businessId);
        
        // Navigate to marketplace
        router.push(`/marketplace?businessName=${encodeURIComponent(businessName)}&businessId=${encodeURIComponent(businessId)}`);
  
      } catch (error) {
        console.error("Error:", error);
        alert('There was an error processing your request. Please try again.');
      } finally {
        setIsSubmitting(false);
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
  scrollToSignup
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onSelect();
    scrollToSignup();
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
      <Link href="/contact">
      <Button 
        className="bg-green-900 w-full hover:bg-green-700 rounded-full text-white py-3"
      >
        {buttonText}
      </Button>
    </Link>
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



const PricingSection = ({ pricingRef, scrollToSignup }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  // Featured plans for the business page preview
  const featuredPlans = [
    {
      title: "Retailer Basic",
      originalPrice: "Rs 999",
      price: "Rs 499 for 30 Days",
      commission: "12% per order",
      description: "Perfect for small retailers starting their digital journey",
      features: [
        { name: "Online Store Setup", included: true },
        { name: "Basic Analytics", included: true },
        { name: "Standard Support", included: true },
        { name: "Limited Reach", included: true },
        { name: "Premium Features", included: false },
      ],
      buttonText: "Start Basic",
      plan: 'retail_basic',
      skuRange: '0-250 Products',
    },
    {
      title: "D2C Growth",
      originalPrice: "Rs 5,999",
      price: "Rs 3,999 for 60 Days",
      commission: "10% per order",
      description: "Ideal for D2C brands looking to scale operations",
      features: [
        { name: "Brand Storefront", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "Priority Support", included: true },
        { name: "Marketing Tools", included: true },
        { name: "Custom Domain", included: true },
      ],
      buttonText: "Choose Growth",
      plan: 'd2c_growth',
      skuRange: '100-500 Products',
    },
    {
      title: "Enterprise",
      originalPrice: "Rs 15,999",
      price: "Custom Pricing",
      commission: "8% per order",
      description: "For large retailers and established D2C brands",
      features: [
        { name: "Custom Integration", included: true },
        { name: "Dedicated Support", included: true },
        { name: "Advanced Features", included: true },
        { name: "Priority Processing", included: true },
        { name: "Custom Solutions", included: true },
      ],
      buttonText: "Contact Sales",
      plan: 'enterprise',
      skuRange: '500+ Products',
    },
  ];

  return (
    <section ref={pricingRef} className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with See More Pricing */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900">
              Flexible Pricing for Every Business
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Choose the plan that best fits your business needs
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-6 py-3
                     bg-green-900 hover:bg-green-700 text-white rounded-full 
                     text-base font-medium transition-colors duration-200
                     shadow-sm hover:shadow-md"
          >
            See detailed pricing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPlans.map((plan, index) => (
            <div key={index} className="w-full">
              <PricingPlanCard
                {...plan}
                onSelect={() => handlePlanSelect(plan.plan)}
                selected={selectedPlan === plan.plan}
                scrollToSignup={scrollToSignup}
              />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Looking for more options? Check out our{' '}
            <Link href="/pricing" className="text-green-600 hover:text-green-700 font-medium">
              detailed pricing page
            </Link>
            {' '}for all available plans and features.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <div className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-700">Free trial available</span>
            </div>
            <div className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-700">No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-700">Cancel anytime</span>
            </div>
          </div>
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
      <Header scrollToPricing={scrollToPricing} scrollToSignup={scrollToSignup} /> {/* Pass the scrollToPricing function as a prop */}
      <main>
        <Hero scrollToSignup={scrollToSignup} />
        <GrowBrand />
        <HowItWorks />
        <PricingSection pricingRef={pricingRef} scrollToSignup={scrollToSignup} /> {/* Pricing Section */}
        <SignUpForm signUpRef={signUpRef} />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}



