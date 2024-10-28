import { useState } from 'react';
import axios from 'axios';


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
const RadioButton = ({ label, description, value, checked, onChange }) => {
  return (
    <label className={`block p-4 border-2 rounded-lg ${checked ? 'border-green-600' : 'border-gray-300'} cursor-pointer mb-4`}>
      <div className="flex justify-between items-center">
        <div className="text-left mr-4">
          <p className="text-lg font-bold text-black">{label}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <input
          type="radio"
          className="form-radio h-5 w-5 text-green-600"
          value={value}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </label>
  );
};

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
    className={`border-2 rounded-lg p-6 flex flex-col space-y-4 transition-transform transform hover:scale-105 hover:shadow-lg ${
      selected ? 'border-green-600 bg-white' : 'border-gray-300 bg-white'
    } min-h-[450px]`}
  >
    <div className="flex-grow">
      <h2 className="text-2xl font-bold text-black">{title}</h2>
      <p className="text-md text-gray-700 font-medium mb-2">SKU Range: {skuRange}</p>
      <div className="flex items-center space-x-2 mb-4">
        {originalPrice && <p className="text-xl text-red-500 line-through">{originalPrice}</p>}
        <p className="text-xl text-green-600 font-semibold">{price}</p>
      </div>
      <hr className="border-gray-300 my-4" />
      <p className="text-md font-medium text-black">{commission}</p>
      <p className="text-md text-gray-600 mb-4">{description}</p>
      <ul className="list-none ml-6 text-gray-600 space-y-1 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="text-sm flex items-center">
            <span className={`${feature.included ? 'text-green-600' : 'text-red-600'} mr-2`}>{feature.included ? '✓' : '✗'}</span>
            {feature.name}
          </li>
        ))}
      </ul>
    </div>
    <Button className="bg-green-900 mt-auto w-full hover:bg-green-700 rounded-full text-white">{buttonText}</Button>
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-20 lg:px-40 ml-40">
      <div className="text-center mb-8">
        {renderHeader()}
      </div>
      <div className="w-full max-w-5xl">
        {renderForm()}
      </div>
    </div>
  );
}