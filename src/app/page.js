// app/landing/page.js
"use client";

import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Apple, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Reusable StoreCard component for displaying stores
// Reusable StoreCard component for displaying stores
const StoreCard = ({ store }) => (
  <Link href={`/store/${encodeURIComponent(store.name.toLowerCase())}`} key={store.name}>
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
          {store.logo && (
            <Image src={store.logo} alt={`${store.name} logo`} width={64} height={64} />
          )}
        </div>
        <div className="flex-grow text-black">
          <h3 className="font-bold text-lg">{store.name}</h3>
          <p className="text-sm text-green-600">{store.description}</p>
          <div className="mt-2 space-x-2">
            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
              {store.banner?.text || "No Banner Text"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

// Add the new Store Section here
const StoreSection = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch stores data from storage (mock data or API)
    fetch("/data/retailers.json")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Data fetched from retailers.json:", data); // Log fetched data
        // Convert object values to an array
        const storeArray = Object.values(data);
        setStores(storeArray);  // Set the array of stores
      })
      .catch(error => {
        console.error("Error fetching stores data:", error);
      });
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-black">
          Order from stores in your area
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {stores.length > 0 ? (
            stores.map((store, index) => <StoreCard key={index} store={store} />)
          ) : (
            <p>No stores available or still loading...</p>
          )}
        </div>
      </div>
    </section>
  );
};

const LandingHeader = () => (
  <header className="bg-orange-600 text-black p-4">
    <div className="container mx-auto text-center">
      <p className="text-white font-bold">
        Get fast delivery and great deals on local products!
      </p>
    </div>
  </header>
);

const Navigation = () => (
  <nav className="bg-white shadow-md p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/home" className="flex items-center space-x-2">
      <Image
        src="/images/green_logo.png" // Update with your logo's path
        alt="InstaMarkt Logo"
        width={230}
        height={150}
        className="object-contain"
      />
      </Link>
      <div className="hidden md:flex space-x-4">
        <Button variant="ghost" className="font-bold text-black hover:text-green-700">About</Button>
        <Button variant="ghost" className="font-bold text-black hover:text-green-700">Services</Button>
        <Button variant="ghost" className="font-bold text-black hover:text-green-700">Contact</Button>
      </div>
      <Link href="/main">
        <Button className="bg-green-900 hover:bg-green-700 rounded-full text-white">
        <p className="text-white font-bold rounded-full">Get Started</p>
        </Button>
      </Link>
    </div>
  </nav>
);

const Hero = () => (
  <section className="bg-gray-100 py-20">
    <div className="container mx-auto flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-10 md:mb-0">
      <h2 className="text-5xl font-bold text-green-900">
          Get delivery that moves as fast as you do
        </h2>
        <p className="text-xl mt-5 mb-8 text-black">
          Connecting you with your city's top retailers, we deliver from the brands you love in record time. From furniture to electronics, and everything in between, we’ve got you covered. Our platform makes shopping simple, fast, and convenient, so you can focus on what matters most.
        </p>
        <div className="flex space-x-4">
          <Link href="/main">
            <Button size="lg" className="bg-green-900 text-bold hover:bg-green-700 text-white rounded-full">
              <p className="text-white font-bold rounded-full">Get Started</p>
            </Button>
          </Link>
          <Link href="/business">
            <Button size="lg" className="bg-green-900 text-bold hover:bg-green-700 text-white rounded-full">
              <p className="text-white font-bold rounded-full">For Business Retail Collaboration</p>
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="font-bold text-black border-green-900 hover:bg-green-100">
            Contact Us
          </Button>
        </div>
      </div>
      <div className="md:w-1/2">
        <Image src="/images/homepage_logo.jpg" alt="Business delivery" width={1000} height={2000} className="ml-10 rounded-lg shadow-lg" />
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-black">
        Why Choose InstaMarkt Business?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Faster Turnaround Time",
            description: "With InstaMarkt’s quick commerce model, your business can reduce the time between customer orders and deliveries. This faster turnaround means your products reach customers in record time, leading to higher customer satisfaction and repeat business.",
            image: "/images/fastdelivery.png"
          },
          {
            title: "Boost Sales",
            description: "InstaMarkt opens up a new revenue stream for your business by offering your products to a wider audience that values speed and convenience. Quick commerce caters to impulse buyers and last-minute shoppers, increasing your daily sales without increasing your overhead costs.",
            image: "/images/boostsales.png"
          },
          {
            title: "Lower Operational Costs",
            description: "By leveraging InstaMarkt’s infrastructure, you can reduce the operational costs associated with in-store staffing and logistics. Quick commerce allows your business to fulfill orders quickly and efficiently without the need for costly last-mile delivery setups.",
            image: "/images/operationcost.png"
          }
        ].map((benefit, index) => (
          <Card key={index} className="shadow-none">
            <CardContent className="p-6">
              <Image 
                src={benefit.image} 
                alt={benefit.title} 
                width={300} 
                height={200} 
                className="mb-4 rounded-lg object-cover"
              />
              <h3 className="text-xl font-semibold mb-2 text-black">
                {benefit.title}
              </h3>
              <p className="text-black">{benefit.description}</p>
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
        { title: "InstaMarkt Programs", items: ["InstaMarkt+", "InstaMarkt Business", "EBT SNAP", "Fresh Funds"] },
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

const DeliverySection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
      {/* Left Section: Heading */}
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h2 className="text-6xl font-bold text-green-900">
          Get delivery that moves as fast as you do
        </h2>
      </div>

      {/* Right Section: Paragraph and Buttons */}
      <div className="md:w-1/2 flex flex-col space-y-4">
        <p className="text-lg text-black">
          Save time and money with InstaMarkt. Shop from over 1,400 retailers for all of your needs, from grocery to office supplies. We help you take care of the shopping and cut costs with flexible delivery options and no monthly minimums. So go ahead and focus on your business—we've got you covered.
        </p>
        <div className="flex space-x-4">
          <Link href="/main">
            <Button size="lg" className="bg-green-800 text-white px-8 py-3 hover:bg-green-900 rounded-full">
            <p className="text-white font-bold rounded-full">Get Started</p>
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-green-800 text-green-800 px-8 py-3 hover:bg-green-100 rounded-full">
            <p className="text-black font-bold">Contact Us</p>
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
        <DeliverySection /> {/* Insert the new section here */}

        {/* <PopularItemsSection /> */}
        <FAQ />

      </main>
      <Footer />
    </div>
  );
}
