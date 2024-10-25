import { useState } from 'react';

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
const PricingPlanCard = ({ title, price, commission, description, features, buttonText, onSelect, selected }) => {
  return (
    <div
      className={`border-2 rounded-lg p-6 space-y-4 text-left w-full md:w-1/3 transition-colors transform hover:scale-105 
      ${selected ? 'border-green-600 bg-white' : 'border-gray-300 bg-white'} 
      hover:border-green-600 hover:bg-green-100 flex flex-col justify-between`} // Added flex and justify-between
      onClick={onSelect}
    >
      <h2 className="text-2xl font-bold text-black">{title}</h2>
      <p className="text-xl text-green-600 font-semibold">{price}</p>
      <p className="text-md text-gray-600">{commission}</p>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <ul className="list-disc ml-6 text-gray-600">
        {features.map((feature, index) => (
          <li key={index} className="text-sm">{feature}</li>
        ))}
      </ul>
      <Button className="mt-6 w-full">{buttonText}</Button>
    </div>
  );
};

export default function MainContent({ selectedStep, onComplete }) {
  const [applySameHours, setApplySameHours] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [menuOption, setMenuOption] = useState('');
  const [formData, setFormData] = useState({
    Monday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Tuesday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Wednesday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Thursday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Friday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Saturday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Sunday: { open: '08:00 AM', close: '09:00 PM', closed: false },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(selectedStep); // Mark the step as completed
  };

  const renderHoursFields = (day) => (
    <div className="flex items-center justify-between mb-4" key={day}>
      <p className="text-black">{day}</p>
      <div className="flex items-center space-x-4">
        <Input
          className="w-32"
          type="text"
          placeholder="Opening Time"
          value={formData[day].open}
          onChange={(e) => handleInputChange(e, day, 'open')}
          disabled={formData[day].closed || (applySameHours && day !== 'Monday')}
        />
        <span>-</span>
        <Input
          className="w-32"
          type="text"
          placeholder="Closing Time"
          value={formData[day].close}
          onChange={(e) => handleInputChange(e, day, 'close')}
          disabled={formData[day].closed || (applySameHours && day !== 'Monday')}
        />
        <Button
          className="px-2"
          type="button"
          onClick={() => handleClosedToggle(day)}
        >
          {formData[day].closed ? 'Closed' : 'Open'}
        </Button>
      </div>
    </div>
  );

  const renderForm = () => {
    switch (selectedStep) {
      case 1:
        return (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <h1 className="text-2xl font-bold text-black">How would you like to receive orders?</h1>
            <p className="text-lg text-gray-600">Choose a method to receive your orders. You can always change this later.</p>

            {/* <RadioButton
              label="DoorDash Tablet"
              description="We’ll ship you a DoorDash tablet and send orders directly to it."
              value="doordash_tablet"
              checked={selectedPlan === 'doordash_tablet'}
              onChange={() => setSelectedPlan('doordash_tablet')}
            /> */}
            <RadioButton
              label="InstaMarkt DashBoard "
              description="Use InstaMarkt Business To Manage and Receive Orders "
              value="pos"
              checked={selectedPlan === 'pos'}
              onChange={() => setSelectedPlan('pos')}
            />
            <RadioButton
              label="Email + Phone Confirmation"
              description="Receive DoorDash orders via email and phone for confirmation."
              value="email_phone"
              checked={selectedPlan === 'email_phone'}
              onChange={() => setSelectedPlan('email_phone')}
            />

            <Button type="submit">Next</Button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <h1 className="text-2xl font-bold text-black">When are you open for business?</h1>
            <p className="text-lg text-gray-600">Let your customers know when you’re open for business. You can apply the same hours for all days or set different times for each day.</p>

            <div className="flex items-center justify-between mb-4">
              <p className="text-black">Apply same store hours to all days</p>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-green-600"
                  checked={applySameHours}
                  onChange={handleSameHoursToggle}
                />
              </label>
            </div>

            {Object.keys(formData).map(renderHoursFields)}

            <Button type="submit">Submit Store Hours</Button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handleSubmit} className="space-y-4 w-full text-center">
            <h1 className="text-2xl font-bold text-black">Now, let’s add your menu</h1>
            <p className="text-lg text-gray-600">Provide a menu link or upload a menu file. You can always review and edit it before your store is live.</p>
            
            <div className="flex justify-center text-sm space-x-4">
              <RadioButton
                label="Menu Link"
                description=""
                value="menu_link"
                className="text-sm"
                checked={menuOption === 'menu_link'}
                onChange={() => setMenuOption('menu_link')}
              />
              <RadioButton
                label="Upload Menu File"
                description=""
                value="menu_file"
                checked={menuOption === 'menu_file'}
                onChange={() => setMenuOption('menu_file')}
              />
            </div>

            {menuOption === 'menu_link' && (
              <Input
                placeholder="Enter Menu Link"
                name="menuUrl"
                value={formData.menuUrl || ''}
                onChange={handleChange}
                required
              />
            )}

            <Button type="submit" className="w-full">Next</Button>

            <div className="mt-8 text-left">
              <h3 className="text-lg font-bold text-black">High-performing menus usually include...</h3>
              <ul className="list-disc ml-6 text-gray-600">
                <li>Prices clearly listed with each item</li>
                <li>Modifiers listed with the associated item</li>
              </ul>
            </div>
          </form>
        );
      case 4: // Pricing Plan case
        return (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <p className="text-lg text-gray-600 mb-8">
              Enjoy all our Marketplace plans with $0 credit card processing fee. Change or cancel your plan at any time.
            </p>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <PricingPlanCard
                title="Save On Cost"
                price="$0 for 7 days"
                commission="15% commission per delivery order"
                description="Offer delivery & pickup to customers who already know you."
                features={[
                  'Limited visibility on DoorDash',
                  'Reach customers nearby',
                  'Highest customer delivery fee'
                ]}
                buttonText="Continue with Basic"
                onSelect={() => handlePlanSelect('basic')}
                selected={selectedPlan === 'basic'}
              />

              <PricingPlanCard
                title="Reach More Customers"
                price="$0 for 30 days"
                commission="25% commission per delivery order"
                description="Get discovered by new customers in your area."
                features={[
                  'Shown to new customers',
                  'Reach customers further away',
                  'Lower customer delivery fee',
                  'Access DashPass customers'
                ]}
                buttonText="Continue with Plus"
                onSelect={() => handlePlanSelect('plus')}
                selected={selectedPlan === 'plus'}
              />

              <PricingPlanCard
                title="Maximize Sales"
                price="$0 for 30 days"
                commission="30% commission per delivery order"
                description="Stand out to the most new customers in your area."
                features={[
                  'Ranked higher on DoorDash',
                  'Reach customers further away',
                  'Lowest customer delivery fee',
                  '20 orders/month guarantee'
                ]}
                buttonText="Continue with Premier"
                onSelect={() => handlePlanSelect('premier')}
                selected={selectedPlan === 'premier'}
              />
            </div>
          </form>
        );
      case 5:
        return (
          <form onSubmit={handleSubmit} className="space-y-4 w-full text-center">
            <Input
              placeholder="Bank Account Number"
              name="bankAccount"
              value={formData.bankAccount || ''}
              onChange={handleChange}
              required
            />
            <Button type="submit">Submit Bank Account</Button>
          </form>
        );
      default:
        return <p>Select a section to get started.</p>;
    }
  };

  const renderHeader = () => {
    switch (selectedStep) {
      case 1:
        return (
          <>
            <h1 className="text-3xl font-bold text-black">Now, let’s set your Order Method</h1>
            <p className="text-lg text-gray-600">Add details about how customers can place orders.</p>
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-3xl font-bold text-black">Set Your Store Hours</h1>
            <p className="text-lg text-gray-600">Let your customers know when you’re open for business.</p>
          </>
        );
      case 3:
        return (
          <>
            {/* <h1 className="text-3xl font-bold text-black">Now, let’s add your menu</h1>
            <p className="text-lg text-gray-600">Provide a menu link or upload a menu file.</p> */}
          </>
        );
      case 4:
        return (
          <>
            <h1 className="text-3xl font-bold text-black">Choose a Pricing Plan</h1>
            <p className="text-lg text-gray-600">Select a plan that fits your business needs.</p>
          </>
        );
      case 5:
        return (
          <>
            <h1 className="text-3xl font-bold text-black">Add Your Bank Account</h1>
            <p className="text-lg text-gray-600">Add your bank details to receive payments.</p>
          </>
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
      <div className="w-full max-w-5xl"> {/* Adjusted max width */}
        {renderForm()}
      </div>
    </div>
  );
}
