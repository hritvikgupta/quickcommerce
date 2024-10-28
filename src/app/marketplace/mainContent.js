import { useState } from 'react';
import axios from 'axios';
import {  Monitor, Mail, Link2, Upload, Check, X, ChevronDown } from 'lucide-react';

const Switch = ({ checked, onChange, className = '' }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors duration-200 ease-in-out focus:outline-none
        ${checked ? 'bg-green-600' : 'bg-gray-200'}
        ${className}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};
// Define custom Input and Button directly in the file
const Input = ({ className = '', ...props }) => {
  return (
    <input
      type="text"
      className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-black ${className}`}
      {...props}
    />
  );
};

const Button = ({ className = '', children, ...props }) => {
  return (
    <button
      className={`bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Define the radio button component
const RadioButton = ({ label, description, icon, value, checked, onChange }) => {
  return (
    <div 
      onClick={onChange} // Change from label to div and add onClick here
      className={`
        block p-6 border-2 rounded-xl transition-all duration-200 cursor-pointer mb-4
        ${checked ? 'border-green-600 bg-green-50/50' : 'border-gray-200 hover:border-green-400'}
        transform hover:scale-[1.01] hover:shadow-md
      `}
    >
      <div className="flex items-center space-x-4">
        {icon && <div className="text-green-600">{icon}</div>}
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">{label}</p>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div 
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${checked ? 'border-green-600' : 'border-gray-300'}
                `}
              >
                {checked && <div className="w-3 h-3 bg-green-600 rounded-full"></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const SuccessMessage = ({ message }) => (
  <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2 z-50">
    <Check className="w-5 h-5" />
    <p>{message}</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2 z-50">
    <X className="w-5 h-5" />
    <p>{message}</p>
  </div>
);

const OrderMethodSection = ({ selectedOrderMethod, setSelectedOrderMethod, onSubmit }) => (
  <div className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">How would you like to receive orders?</h2>
    
    <RadioButton
      label="InstaMarkt Dashboard"
      description="Manage all your orders through our intuitive dashboard with real-time updates"
      icon={<Monitor className="w-6 h-6" />}
      value="dashboard"
      checked={selectedOrderMethod === 'dashboard'}
      onChange={() => setSelectedOrderMethod('dashboard')}
    />
    
    <RadioButton
      label="Email + Phone Confirmation"
      description="Receive orders via email and get phone confirmations for urgent orders"
      icon={<Mail className="w-6 h-6" />}
      value="email_phone"
      checked={selectedOrderMethod === 'email_phone'}
      onChange={() => setSelectedOrderMethod('email_phone')}
    />

    <Button 
      onClick={onSubmit}
      className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-lg"
      disabled={!selectedOrderMethod} // Disable button if no method is selected
    >
      Continue
    </Button>
  </div>
);

const StoreHoursSection = ({ formData, handleInputChange, applySameHours, handleSameHoursToggle, handleClosedToggle, onSubmit }) => (
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Set Your Store Hours</h2>
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600">Apply same hours to all days</span>
        <Switch
          checked={applySameHours}
          onChange={handleSameHoursToggle}
        />
      </div>
    </div>

    <div className="grid gap-6">
      {Object.keys(formData).map(day => (
        <div key={day} className="bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="w-1/4">
              <h3 className="font-medium text-gray-900">{day}</h3>
            </div>
            
            <div className="flex-grow grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Opening Time</label>
                <Input
                  type="time"
                  value={formData[day].open}
                  onChange={(e) => handleInputChange(e, day, 'open')}
                  disabled={formData[day].closed}
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Closing Time</label>
                <Input
                  type="time"
                  value={formData[day].close}
                  onChange={(e) => handleInputChange(e, day, 'close')}
                  disabled={formData[day].closed}
                />
              </div>
            </div>

            <div className="ml-4">
              <Switch
                checked={!formData[day].closed}
                onChange={() => handleClosedToggle(day)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    <Button 
      onClick={onSubmit}
      className="w-full mt-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-lg"
    >
      Save Store Hours
    </Button>
  </div>
);


const MenuSection = ({ menuOption, setMenuOption, onSubmit }) => (
  <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">How would you like to add your menu?</h2>

    <div className="space-y-4">
      <RadioButton
        label="Add Menu Link"
        description="Provide a link to your existing menu (PDF, website, or image)"
        icon={<Link2 className="w-6 h-6" />}
        value="menu_link"
        checked={menuOption === 'menu_link'}
        onChange={() => setMenuOption('menu_link')}
      />

      <RadioButton
        label="Upload Menu File"
        description="Upload your menu file directly (PDF, Word, or image formats)"
        icon={<Upload className="w-6 h-6" />}
        value="menu_file"
        checked={menuOption === 'menu_file'}
        onChange={() => setMenuOption('menu_file')}
      />

      {menuOption === 'menu_link' && (
        <div className="mt-6">
          <Input
            type="url"
            placeholder="Enter menu URL"
            className="p-4"
          />
        </div>
      )}

      {menuOption === 'menu_file' && (
        <div className="mt-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Drag and drop your menu file here, or click to browse</p>
          </div>
        </div>
      )}
    </div>

    <Button 
      onClick={onSubmit}
      className="w-full mt-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-lg"
    >
      Continue
    </Button>
  </div>
);

// Define the PricingPlanCard component
// const PricingPlanCard = ({ title, price, commission, description, features, buttonText, onSelect, selected }) => {
//   return (
//     <div
//       className={`border-2 rounded-lg p-6 space-y-4 text-left w-full md:w-1/3 transition-colors transform hover:scale-105 
//       ${selected ? 'border-green-600 bg-white' : 'border-gray-300 bg-white'} 
//       hover:border-green-600 hover:bg-green-100 flex flex-col justify-between`} // Added flex and justify-between
//       onClick={onSelect}
//     >
//       <h2 className="text-2xl font-bold text-black">{title}</h2>
//       <p className="text-xl text-green-600 font-semibold">{price}</p>
//       <p className="text-md text-gray-600">{commission}</p>
//       <p className="text-sm text-gray-600 mb-4">{description}</p>
//       <ul className="list-disc ml-6 text-gray-600">
//         {features.map((feature, index) => (
//           <li key={index} className="text-sm">{feature}</li>
//         ))}
//       </ul>
//       <Button className="mt-6 w-full">{buttonText}</Button>
//     </div>
//   );
// };

const smallScalePlans = [
  {
    title: "Starter Plan",
    originalPrice: "Rs 999",
    price: "Rs 499 for 7 Days",
    commission: "12% per order",
    description: "Ideal for new small businesses. No delivery charges of first 200 orders",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Basic Support", included: true },
      { name: "Limited Reach", included: false },
      { name: "Premium Listing", included: false },
    ],
    buttonText: "Select Starter",
    plan: 'starter',
    skuRange: '0-500', // SKU range for small retailers
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
    skuRange: '500-999',
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
    skuRange: '1000-4999',
  },
];

// Plans for Medium Scale Retailers
const mediumScalePlans = [
  {
    title: "Growth Plan",
    originalPrice: "Rs 4,999",
    price: "Rs 4,499 for 10 Days",
    commission: "15% per order",
    description: "Scale your medium business.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Standard Support", included: true },
      { name: "Expanded Reach", included: true },
      { name: "Access Premium Customers", included: false },
    ],
    buttonText: "Select Growth",
    plan: 'growth',
    skuRange: '0-500', // SKU range for medium retailers
  },
  {
    title: "Premium Plan",
    originalPrice: "Rs 8,999",
    price: "Rs 7,999 for 30 Days",
    commission: "12% per order",
    description: "Expand your medium business reach.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Priority Support", included: true },
      { name: "Expanded Reach", included: true },
      { name: "Access Premium Customers", included: true },
    ],
    buttonText: "Select Premium",
    plan: 'premium',
    skuRange: '500-999',
  },
  {
    title: "Enterprise Plan",
    originalPrice: "Rs 15,999",
    price: "Rs 14,999 for 60 Days",
    commission: "10% per order",
    description: "Maximize your medium business growth.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Dedicated Support", included: true },
      { name: "Expanded Reach", included: true },
      { name: "Access Premium Customers", included: true },
      { name: "Growth Guarantee", included: true },
    ],
    buttonText: "Select Enterprise",
    plan: 'enterprise',
    skuRange: '1000-4999',
  },
];

// Plans for Large Scale Retailers
const largeScalePlans = [
  {
    title: "Pro Plan",
    originalPrice: "Rs 25,999",
    price: "Rs 23,999 for 10 Days",
    commission: "20% per order",
    description: "Ideal for large retailers seeking expansion.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Priority Support", included: true },
      { name: "Expanded Reach", included: true },
      { name: "Access Premium Customers", included: true },
    ],
    buttonText: "Select Pro",
    plan: 'pro',
    skuRange: '500-999', // SKU range for large retailers
  },
  {
    title: "Elite Plan",
    originalPrice: "Rs 45,999",
    price: "Rs 42,999 for 60 Days",
    commission: "15% per order",
    description: "For large retailers wanting maximum visibility.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Dedicated Support", included: true },
      { name: "Maximum Reach", included: true },
      { name: "Access Premium Customers", included: true },
      { name: "Premium Listing", included: true },
    ],
    buttonText: "Select Elite",
    plan: 'elite',
    skuRange: '1000-4999',
  },
  {
    title: "Ultimate Plan",
    originalPrice: "Rs 75,999",
    price: "Rs 69,999 for 180 Days",
    commission: "12% per order",
    description: "The best plan for large retailers.",
    features: [
      { name: "Online Ordering", included: true },
      { name: "Dedicated Support", included: true },
      { name: "Maximum Reach", included: true },
      { name: "Access Premium Customers", included: true },
      { name: "Premium Listing", included: true },
      { name: "Growth Guarantee", included: true },
    ],
    buttonText: "Select Ultimate",
    plan: 'ultimate',
    skuRange: '5000+',
  },
];
const PricingPlanCard = ({ title, originalPrice, price, commission, description, features, buttonText, onSelect, selected, skuRange }) => (
  <div
    onClick={onSelect}
    className={`
      border-2 rounded-xl p-6 flex flex-col space-y-4 transition-all duration-200
      transform hover:scale-[1.02] hover:shadow-lg cursor-pointer
      ${selected ? 'border-green-600 bg-green-50/50' : 'border-gray-200'}
      min-h-[500px]
    `}
  >
    <div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">SKU Range: {skuRange}</p>
    </div>

    <div className="space-y-2">
      {originalPrice && (
        <p className="text-sm text-red-500 line-through">{originalPrice}</p>
      )}
      <p className="text-2xl font-bold text-green-600">{price}</p>
      <p className="text-sm font-medium text-gray-900">{commission}</p>
    </div>

    <p className="text-gray-600">{description}</p>

    <div className="flex-grow space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start space-x-2">
          {feature.included ? (
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
          ) : (
            <X className="w-5 h-5 text-red-400 flex-shrink-0" />
          )}
          <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
            {feature.name}
          </span>
        </div>
      ))}
    </div>

    <Button className={`
      w-full py-3 rounded-lg text-white font-medium
      ${selected ? 'bg-green-600' : 'bg-gray-900'} 
      hover:bg-green-700 transition-colors
    `}>
      {buttonText}
    </Button>
  </div>
);

export default function MainContent({ selectedStep, onComplete, businessName }) {
  
  const [applySameHours, setApplySameHours] = useState(false);
  const [selectedOrderMethod, setSelectedOrderMethod] = useState('');
  const [menuOption, setMenuOption] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // Add this to control navigation flow
  const [formData, setFormData] = useState({
    Monday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Tuesday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Wednesday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Thursday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Friday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Saturday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Sunday: { open: '08:00 AM', close: '09:00 PM', closed: false },
  });

  const handleInputChange = (e, day, field) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [day]: { ...prevFormData[day], [field]: value },
    }));
  };

  const handleClosedToggle = (day) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [day]: { ...prevFormData[day], closed: !prevFormData[day].closed },
    }));
  };

  const handleSameHoursToggle = () => {
    setApplySameHours(!applySameHours);
    if (!applySameHours) {
      const { open, close } = formData.Monday;
      setFormData((prevFormData) => {
        const updatedFormData = {};
        for (const day in prevFormData) {
          updatedFormData[day] = { ...prevFormData[day], open, close };
        }
        return updatedFormData;
      });
    }
  };

// Function to handle 'Order Method' submission
const handleOrderMethodSubmit = async () => {
  try {
    // Step 1: Retrieve all records from the Business Table
    const searchResponse = await axios.get(
      `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const records = searchResponse.data.records;

    // Step 2: Find the record with the matching business name (case-insensitive, trimmed)
    const matchedRecord = records.find(
      record => record.fields['Name'] &&
                record.fields['Name'].trim().toLowerCase() === businessName.trim().toLowerCase()
    );

    if (matchedRecord) {
      const businessRecordId = matchedRecord.id;

      // Step 3: Update the 'Order Method' field in the matched Business Table record
      await axios.patch(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table/${businessRecordId}`,
        {
          fields: {
            "Order Method": selectedOrderMethod,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Successfully updated Business Table record with Order Method:", businessRecordId);

      // Proceed to the next step
      
      onComplete(selectedStep); // Move to store hours step
    } else {
      console.error("No matching business record found for the provided business name.");
    }
  } catch (error) {
    console.error("Error updating Business Data with Order Method:", error);
    console.error("Error details:", error.response ? error.response.data : "No response data");
  }
};



  const handleStoreHoursSubmit = async () => {
    try {
      for (const day in formData) {
        const { open, close, closed } = formData[day];
        
        // Make sure that the `Is Open` field is explicitly a boolean
        const isOpen = closed ? "false" : "true";
  
        await axios.post(
          `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Store Hours`,
          {
            fields: {
              "Business Name": businessName,
              "WeekDay": day,
              "Store Open Hour": closed ? '' : open,
              "Store Close Hour": closed ? '' : close,
              "Is Open": isOpen, // Ensures this is true or false
            }
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
              'Content-Type': 'application/json',
            }
          }
        );
      }
      onComplete(selectedStep);
    } catch (error) {
      console.error("Error saving Store Hours:", error);
      console.error("Error details:", error.response ? error.response.data : "No response data");
    }
  };
  

  const handleMenuOptionSubmit = async () => {
    try {
      await axios.post(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Menu Option`,
        {
          fields: {
            "Business Name": businessName,
            "Menu Items": menuOption,
          }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          }
        }
      );
      onComplete(selectedStep);
    } catch (error) {
      console.error("Error saving Menu Option:", error);
    }
  };

  const [planScale, setPlanScale] = useState('small'); // To toggle between small, medium, and large plans

  const handlePlanSelect = async (plan) => {
    setSelectedPlan(plan.title);
  
    try {
      // Step 1: Retrieve all records from the Business Table
      const searchResponse = await axios.get(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const records = searchResponse.data.records;
  
      // Step 2: Find the record with the matching business name (case-insensitive, trimmed)
      const matchedRecord = records.find(
        record => record.fields['Name'] &&
                  record.fields['Name'].trim().toLowerCase() === businessName.trim().toLowerCase()
      );
  
      if (matchedRecord) {
        const recordId = matchedRecord.id;
  
        // Step 3: Update the 'Pricing Plan' field in the matched Business Table record
        await axios.patch(
          `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table/${recordId}`,
          {
            fields: {
              "Pricing Plan": plan.title,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log("Successfully updated Business Table record with Pricing Plan:", recordId);
        onComplete(selectedStep); // Proceed to the next step
      } else {
        console.error("Record with the specified business name not found.");
      }
    } catch (error) {
      console.error("Error updating Pricing Plan:", error);
      console.error("Error details:", error.response ? error.response.data : "No response data");
    }
  };
  

  const getPlansByScale = () => {
    if (planScale === 'small') return smallScalePlans;
    if (planScale === 'medium') return mediumScalePlans;
    if (planScale === 'large') return largeScalePlans;
    return [];
  };

  const renderHeader = () => {
    switch (selectedStep) {
      case 1:
        return <h1 className="mt-[-150px] text-3xl font-bold text-black">Set Your Order Method</h1>;
      case 2:
        return <h1 className="mt-[-110px] text-3xl font-bold text-black">Set Your Store Hours</h1>;
      case 3:
        return <h1 className="text-3xl font-bold text-black">Add Your Menu Option</h1>;
      default:
        return null;
    }
  };

  const renderForm = () => {
    switch (selectedStep) {
      case 1:
        return (
          <div className="mt-[-100px] space-y-4 w-full">
            <p className="text-lg text-gray-600">Choose a method to receive your orders. You can always change this later.</p>
            <RadioButton
              label="InstaMarkt Dashboard"
              value="dashboard"
              checked={selectedOrderMethod === 'dashboard'}
              onChange={() => setSelectedOrderMethod('dashboard')}
            />
            <RadioButton
              label="Email + Phone Confirmation"
              value="email_phone"
              checked={selectedOrderMethod === 'email_phone'}
              onChange={() => setSelectedOrderMethod('email_phone')}
            />
            <Button onClick={handleOrderMethodSubmit}>Save Order Method</Button>
          </div>
        );
      case 2:
        return (
          <div className="mt-[-100px] space-y-4 w-full">
            <div className="flex items-center justify-between mb-4">
              <p className="text-black">Apply same store hours to all days</p>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
                checked={applySameHours}
                onChange={handleSameHoursToggle}
              />
            </div>
            {Object.keys(formData).map(day => (
              <div key={day} className="flex items-center space-x-4 mb-4">
                <p className="text-black">{day}</p>
                <Input
                  placeholder="Open Time"
                  value={formData[day].open}
                  onChange={(e) => handleInputChange(e, day, 'open')}
                />
                <Input
                  placeholder="Close Time"
                  value={formData[day].close}
                  onChange={(e) => handleInputChange(e, day, 'close')}
                />
                <Button onClick={() => handleClosedToggle(day)}>
                  {formData[day].closed ? 'Closed' : 'Open'}
                </Button>
              </div>
            ))}
            <Button onClick={handleStoreHoursSubmit}>Save Store Hours</Button>
          </div>
        );
      case 3:
        return (
          <div className="mt-[-100px] space-y-4 w-full">
            <p className="text-lg text-gray-600">Provide a menu link or upload a menu file.</p>
            <RadioButton
              label="Menu Link"
              value="menu_link"
              checked={menuOption === 'menu_link'}
              onChange={() => setMenuOption('menu_link')}
            />
            <RadioButton
              label="Upload Menu File"
              value="menu_file"
              checked={menuOption === 'menu_file'}
              onChange={() => setMenuOption('menu_file')}
            />
            <Button onClick={handleMenuOptionSubmit}>Save Menu Option</Button>
          </div>
        );

      case 4:
        return (
          <div className="mt-[-100px] space-y-4 w-full">
            <h2 className="text-3xl font-bold text-black mb-4">Choose a Pricing Plan</h2>
            <div className="flex space-x-4 mb-8">
              <Button onClick={() => setPlanScale('small')} className={planScale === 'small' ? 'bg-green-700' : ''}>Small Scale</Button>
              <Button onClick={() => setPlanScale('medium')} className={planScale === 'medium' ? 'bg-green-700' : ''}>Medium Scale</Button>
              <Button onClick={() => setPlanScale('large')} className={planScale === 'large' ? 'bg-green-700' : ''}>Large Scale</Button>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {getPlansByScale().map((plan, index) => (
                <PricingPlanCard
                  key={index}
                  title={plan.title}
                  originalPrice={plan.originalPrice}
                  price={plan.price}
                  commission={plan.commission}
                  description={plan.description}
                  features={plan.features}
                  buttonText={plan.buttonText}
                  onSelect={() => handlePlanSelect(plan)}
                  selected={selectedPlan === plan.title}
                  skuRange={plan.skuRange}
                />
              ))}
            </div>
          </div>
        );

      default:
        return <p>Select a section to get started.</p>;
    }
  };
  const renderContent = () => {
    switch (selectedStep) {
      case 1:
        return (
          <OrderMethodSection
            selectedOrderMethod={selectedOrderMethod}
            setSelectedOrderMethod={setSelectedOrderMethod}
            onSubmit={handleOrderMethodSubmit}
          />
        );
      case 2:
        return (
          <StoreHoursSection
            formData={formData}
            handleInputChange={handleInputChange}
            applySameHours={applySameHours}
            handleSameHoursToggle={handleSameHoursToggle}
            handleClosedToggle={handleClosedToggle}
            onSubmit={handleStoreHoursSubmit}
          />
        );
      case 3:
        return (
          <MenuSection
            menuOption={menuOption}
            setMenuOption={setMenuOption}
            onSubmit={handleMenuOptionSubmit}
          />
        );
      case 4:
        return (
          <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
              <p className="text-gray-600 mt-2">Select the plan that best fits your business</p>
            </div>

            <div className="flex justify-center space-x-4 mb-8">
              {['small', 'medium', 'large'].map((scale) => (
                <Button
                  key={scale}
                  onClick={() => setPlanScale(scale)}
                  className={`
                    rounded-full font-medium
                    ${planScale === scale 
                      ? 'bg-green-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  `}
                >
                  {scale.charAt(0).toUpperCase() + scale.slice(1)} Scale
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getPlansByScale().map((plan, index) => (
                <PricingPlanCard
                  key={index}
                  {...plan}
                  onSelect={() => handlePlanSelect(plan)}
                  selected={selectedPlan === plan.title}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-20 lg:px-40 ml-40">
      <div className="text-center mb-8">
        {renderHeader()}
      </div>
      <div className="w-full max-w-5xl">
        {renderContent()}
      </div>
    </div>
  );
}