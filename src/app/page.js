// app/landing/page.js
"use client";

import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Apple, Smartphone,ArrowRight, Clock, MapPin,ChevronDown,ShoppingBag,Star,StorefrontIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { Menu, X } from "lucide-react";
// import { useState } from "react";
const StoreCard = ({ store }) => (
  <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-start gap-6">
        {/* Logo Section */}
        <div className="w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
          {store.logo ? (
            <Image 
              src={store.logo} 
              alt={`${store.name} logo`} 
              width={80} 
              height={80} 
              className="object-cover"
            />
          ) : (
            <StorefrontIcon className="w-10 h-10 text-gray-400" />
          )}
        </div>

        {/* Content Section */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-xl text-gray-900 mb-1 truncate">
                {store.name}
              </h3>
              <p className="text-green-600 text-sm font-medium line-clamp-2">
                {store.description}
              </p>
            </div>
            {store.rating && (
              <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm font-semibold text-green-700">
                  {store.rating}
                </span>
              </div>
            )}
          </div>

          {/* Delivery Time Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 mr-1.5" />
              {store.deliveryTime || '10-15'} mins away
            </span>
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2">
            {store.banner?.text && (
              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                {store.banner.text}
              </span>
            )}
            {store.isOpen && (
              <span className="inline-flex items-center bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></div>
                Open Now
              </span>
            )}
          </div>

          {/* Categories Section */}
          <div className="flex flex-wrap gap-2 mt-3">
            {['Beverages', 'Frozen Food', 'Grocery', 'Snacks'].map((category, index) => (
              <span 
                key={index}
                className="inline-flex items-center bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Footer Section */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1.5" />
              <span className="text-sm">{store.distance || '1.2'} km away</span>
            </div>
            {store.minOrder && (
              <div className="flex items-center text-gray-600">
                <ShoppingBag className="w-4 h-4 mr-1.5" />
                <span className="text-sm">Min. ₹{store.minOrder}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const StoreSection = () => {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/retailers.json")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        const storeArray = Object.values(data);
        setStores(storeArray);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching stores data:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
          Order from stores in your area
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Get your favorite items delivered quickly from the best local stores near you
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">
            Error loading stores: {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store, index) => (
              <div key={index}>
                <StoreCard store={store} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const LandingHeader = () => (
  <header className="bg-orange-600 text-black p-4">
    <div className="container mx-auto text-center">
      <p className="text-white font-bold">
        Get fast delivery and great deals on products near you!
      </p>
    </div>
  </header>
);

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 relative z-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Mobile Controls */}
          <div className="flex w-full md:w-auto justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/green_logo.png"
                alt="InstaMarkt Logo"
                width={280}
                height={120}
                className="object-contain"
              />
            </Link>
            
            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-4">
              <button
                className="bg-gray-400 cursor-not-allowed rounded-full text-white px-4 py-2"
                disabled
                aria-label="Store Opening Soon"
              >
                <span className="text-sm font-bold">Store Opening Soon</span>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-green-900 hover:bg-green-50 rounded-lg"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-row items-center gap-4 w-full md:w-auto">
            <div className="flex items-center space-x-4">
              <Link
                href="/aboutus"
                className="font-bold text-black hover:text-green-700 px-3 py-2 rounded-md hover:bg-green-50 transition-colors"
              >
                About
              </Link>
              <Link
                href="/business"
                className="font-bold text-black hover:text-green-700 px-3 py-2 rounded-md hover:bg-green-50 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="font-bold text-black hover:text-green-700 px-3 py-2 rounded-md hover:bg-green-50 transition-colors"
              >
                Contact
              </Link>
            </div>
            <button
              className="bg-gray-400 cursor-not-allowed rounded-full text-white px-4 py-2"
              disabled
              aria-label="Store Opening Soon"
            >
              <span className="font-bold">Store Opening Soon</span>
            </button>
          </div>

          {/* Mobile Menu Panel */}
          <div 
            className={`
              fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
              ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
              md:hidden
            `}
            style={{ top: '0', zIndex: 1000 }}
          >
            {/* Mobile Menu Content */}
            <div className="flex flex-col p-4">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-green-900 hover:bg-green-50 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                <Link
                  href="/aboutus"
                  className="font-bold text-black hover:text-green-700 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/business"
                  className="font-bold text-black hover:text-green-700 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className="font-bold text-black hover:text-green-700 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Overlay for mobile menu */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
              style={{ zIndex: 999 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </nav>
  );
};


const Hero = () => (
  <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 md:py-24 overflow-hidden px-4 md:px-0">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-0 w-48 md:w-72 h-48 md:h-72 bg-green-100 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-20 right-0 w-48 md:w-72 h-48 md:h-72 bg-emerald-100 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        {/* Content section */}
        <div className="z-10 flex flex-col space-y-6 md:space-y-8">
          <div className="space-y-4">
            <div className="inline-block">
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
              Get delivery that{' '}
              <span className="relative">
                <span className="relative inline-block animate-bounce">moves</span>
              </span>{' '}
              as fast as you do
            </h2>
          </div>

          <p className="text-base md:text-xl text-gray-600 leading-relaxed max-w-xl">
            Connecting you with your city's top retailers, we deliver from the brands you love in record time. From furniture to electronics, and everything in between, we've got you covered.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="group bg-gray-400 cursor-not-allowed text-white rounded-full px-4 md:px-8 py-3 md:py-6 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              disabled
            >
              <span className="font-bold text-base md:text-lg whitespace-nowrap">Store Opening Soon</span>
            </Button>
            
            <Link href="/business" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="group bg-green-900 hover:bg-green-800 text-white rounded-full px-4 md:px-8 py-3 md:py-6 transition-all duration-300 transform hover:scale-105 w-full flex items-center justify-center"
              >
                <span className="font-bold text-base md:text-lg whitespace-nowrap">Retail Business Collaboration</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 inline-flex" />
              </Button>
            </Link>
            
            {/* <Button 
              size="lg" 
              variant="outline" 
              className="group border-2 border-green-900 text-green-900 hover:bg-green-50 rounded-full px-4 md:px-8 py-3 md:py-6 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              <span className="font-bold text-base md:text-lg whitespace-nowrap">Contact Us</span>
            </Button> */}
          </div>

          {/* Trust indicators */}
          <div className="pt-6 md:pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2">
                <div className="text-green-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">5000+</p>
                  <p className="text-sm text-gray-600">Retail Brands</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-green-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fast</p>
                  <p className="text-sm text-gray-600">Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="z-10 flex justify-end">
          <div className="relative w-full md:w-[120%] md:-mr-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-emerald-50 rounded-2xl transform rotate-3"></div>
            <Image 
              src="/images/homepage_logo.jpg" 
              alt="Business delivery" 
              width={1000} 
              height={2000} 
              className="relative rounded-2xl shadow-2xl transform -rotate-3 transition-transform hover:rotate-0 duration-500 w-full"
            />
          </div>
        </div>
      </div>
    </div>
    
    <style jsx global>{`
      @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(20px, -30px) scale(1.1); }
        50% { transform: translate(-20px, 20px) scale(0.9); }
        75% { transform: translate(20px, 30px) scale(0.95); }
      }
      
      .animate-blob {
        animation: blob 7s infinite;
      }
      
      .animation-delay-2000 {
        animation-delay: 2s;
      }
    `}</style>
  </section>
);


const BenefitsSection = () => (
  <section className="py-12 md:py-20 bg-white px-4 md:px-0">
    <div className="container mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-black">
        Why Choose InstaMarkt Business?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Faster Turnaround Time",
            description: "With InstaMarkt's quick commerce model, your business can reduce the time between customer orders and deliveries. This faster turnaround means your products reach customers in record time, leading to higher customer satisfaction and repeat business.",
            image: "/images/fastdelivery.png"
          },
          {
            title: "Boost Sales",
            description: "InstaMarkt opens up a new revenue stream for your business by offering your products to a wider audience that values speed and convenience. Quick commerce caters to impulse buyers and last-minute shoppers, increasing your daily sales without increasing your overhead costs.",
            image: "/images/boostsales.png"
          },
          {
            title: "Lower Operational Costs",
            description: "By leveraging InstaMarkt's infrastructure, you can reduce the operational costs associated with in-store staffing and logistics. Quick commerce allows your business to fulfill orders quickly and efficiently without the need for costly last-mile delivery setups.",
            image: "/images/operationcost.png"
          }
        ].map((benefit, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <Image 
                src={benefit.image} 
                alt={benefit.title} 
                width={300} 
                height={200} 
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-black">
                {benefit.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const ProductsSection = () => (
  <section className="bg-white py-20">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-bold text-center text-black">
        Products from 5,000 retail brands being listed
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Latest Kurtis from Your Favorite Brands",
            description: "Need a new Kurti for the day? InstaMarkt partners with your favorite local clothing brands to bring you the latest designs. Shop trending Kurtis and get them delivered right from the store to your door.",
            image: "/images/kurtis.png"
          },
          {
            title: "Furniture Delivered with Ease",
            description: "Looking to update your home? InstaMarkt delivers furniture from local stores, ensuring you get stylish and functional pieces without the hassle of visiting showrooms. Shop for chairs, tables, and more with delivery right to your door.",
            image: "/images/furniture.png"
          },
          {
            title: "Shoes from Top Brands",
            description: "InstaMarkt brings you the latest in footwear from top brands. Whether you need running shoes or casual wear, get them delivered from your favorite local stores, ready to wear.",
            image: "/images/shoes.png"
          },
          {
            title: "Fresh Dairy and Milk Products",
            description: "Need fresh milk or dairy products? InstaMarkt ensures timely delivery of milk, curd, butter, and other dairy essentials, straight from trusted local suppliers to your home.",
            image: "/images/fresh_dairy.png"
          },
          {
            title: "Everyday Household Essentials",
            description: "From toothpaste to soap, InstaMarkt delivers all the daily household items you need to keep your home running smoothly. Order everyday essentials online and get them delivered in under an hour.",
            image: "/images/household_essentials.png"
          },
          {
            title: "Your Favorite Skincare and Beauty Products",
            description: "Need skincare or beauty products from your go-to brands? InstaMarkt brings you personal care products delivered right to your home. Shop the latest skincare and beauty essentials for a glowing you!",
            image: "/images/skincare_products.png"
          }
        ].map((product, index) => (
          <Card key={index} className="shadow-none">
            <CardContent className="p-6">
              <Image src={product.image} alt={product.title} width={300} height={200} className="mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2 text-black">
                {product.title}
              </h3>
              <p className="text-black">{product.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const PopularItemsSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-bold text-black">
        Popular Products for Your Everyday Needs
      </h2>
      <div className="flex justify-center space-x-12">
        {[
          { name: 'Latest Fashion Kurtis', image: '/images/kurtis.png' },
          { name: 'Trendy Sneakers', image: '/images/trendy_sneakers.png' },
          { name: 'Smartphones', image: '/images/smartphones.png' },
          { name: 'Modern Furniture', image: '/images/modern_furniture.png' },
          { name: 'Skincare Essentials', image: '/images/skincare_essentials.png' }
        ].map((item, index) => (
          <div key={index} className="text-center flex flex-col items-center">
            <Image 
              src={item.image} 
              alt={item.name} 
              width={100} 
              height={100} 
              className="rounded-full mb-2 object-cover" 
            />
            <p className="text-black text-bold">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


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

const DemoVideo = () => {
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
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
              Experience Seamless Shopping with InstaMarkt
            </h2>
            <ul className="space-y-6 text-black text-base md:text-lg">
              <li className="flex flex-col gap-2">
                <strong className="text-green-900">1. Browse & Select Your Favorites</strong>
                <p className="text-gray-600">
                  Explore thousands of products from your local stores. Compare prices, check availability, and add items to your cart with just a few taps.
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <strong className="text-green-900">2. Choose Delivery Options</strong>
                <p className="text-gray-600">
                  Select your preferred delivery time slot or opt for express delivery. Track your order in real-time and get updates right to your phone.
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <strong className="text-green-900">3. Pay & Enjoy</strong>
                <p className="text-gray-600">
                  Multiple payment options available - UPI, cards, or cash on delivery. Earn rewards on every purchase and enjoy exclusive member benefits.
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <strong className="text-green-900">4. Rate & Review</strong>
                <p className="text-gray-600">
                  Share your experience, rate products, and help other shoppers make informed decisions. Your feedback helps us improve!
                </p>
              </li>
            </ul>
            
            <div className="mt-8">
              <p className="text-sm text-gray-500 italic">
                "Join thousands of happy customers who have made InstaMarkt their go-to shopping destination. Download our app now and experience the difference!"
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full max-w-[600px] aspect-video rounded-lg overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="https://oeffyqfy88qvayhg.public.blob.vercel-storage.com/StoreVideo-Z78Ieyii5wGWdjvVrawhESHHPCbnN5.mp4"
                playsInline
                controls
                muted
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 text-center">
              Watch how easy it is to shop with InstaMarkt
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};



const DeliverySection = () => (
  <section className="py-12 md:py-20 bg-white px-4 md:px-0">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
          Get delivery that moves as fast as you do
        </h2>
      </div>
      <div className="w-full md:w-1/2 flex flex-col space-y-4">
        <p className="text-base md:text-lg text-black">
          Save time and money with InstaMarkt. Shop from over 1,400 retailers for all of your needs, from grocery to office supplies. We help you take care of the shopping and cut costs with flexible delivery options and no monthly minimums. So go ahead and focus on your business—we've got you covered.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            className="bg-gray-400 cursor-not-allowed rounded-full px-6 py-3 w-full sm:w-auto"
            disabled
          >
            <span className="text-white font-bold whitespace-nowrap">Store Opening Soon</span>
          </Button>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-green-800 text-green-800 rounded-full px-6 py-3 hover:bg-green-100 w-full"
            >
              <span className="font-bold whitespace-nowrap">Contact Us</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/data/customer_faq.json');
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  return (
    <section className="py-12 md:py-20 bg-black text-white px-4 md:px-0">
      <div className="container mx-auto max-w-3xl"> {/* Added max-width for better readability */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div 
              key={index} 
              className="border-b border-gray-700 pb-4 rounded-lg overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full text-left text-white p-4 hover:bg-gray-900 transition-colors duration-200"
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                aria-expanded={openQuestion === index}
              >
                <span className="font-semibold pr-8 text-sm md:text-base">{q.q}</span>
                <ChevronDown 
                  className={`transform transition-transform duration-200 flex-shrink-0 w-5 h-5 
                    ${openQuestion === index ? 'rotate-180' : ''}`} 
                />
              </button>
              {openQuestion === index && (
                <div className="p-4 pt-2 text-gray-300 text-sm md:text-base">
                  <p className="leading-relaxed">{q.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <Navigation />
      <main>
        <Hero />
        <StoreSection />  {/* Inserted Store Section */}

        <BenefitsSection />
        <ProductsSection />
        <DemoVideo /> {/* Insert the new section here */}

        <DeliverySection /> {/* Insert the new section here */}

        {/* <PopularItemsSection /> */}
        <FAQ />

      </main>
      <Footer />
    </div>
  );
}
