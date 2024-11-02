'use client'
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { X } from 'lucide-react';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
const generateBusinessId = (
  businessName,
  businessType,
  businessCity,
  businessPhone,
  businessPincode,
  businessEmail
) => {
  const cleanBusinessName = businessName.trim().toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 3);
  const cleanBusinessType = businessType.trim().toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 3);
  const cleanCity = businessCity.trim().toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 3);
  const lastFourPhone = businessPhone.slice(-4);
  const lastThreePincode = businessPincode.slice(-3);
  const cleanEmail = businessEmail.split('@')[0].substring(0, 3);
  
  return `BIZ-${cleanBusinessName}${cleanBusinessType}${cleanCity}-${lastFourPhone}${lastThreePincode}${cleanEmail}`;
};
const BusinessSignupModal = ({ isOpen, onClose, prefilledEmail, initialPassword }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessState, setBusinessState] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [businessPincode, setBusinessPincode] = useState('');
  const [skuCount, setSkuCount] = useState('');
  const [businessEmail, setBusinessEmail] = useState(prefilledEmail || '');
  const [businessPhone, setBusinessPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState(initialPassword || ''); // Initialize with passed password

  const router = useRouter();

  useEffect(() => {
    // Update both email and password when props change
    setBusinessEmail(prefilledEmail || '');
    if (initialPassword) {
      const hashPwd = async () => {
        const hashedPwd = await hashPassword(initialPassword);
        setPassword(hashedPwd);
      };
      hashPwd();
    }
  }, [prefilledEmail, initialPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Hash the password before storing
    
      const businessId = generateBusinessId(
        businessName,
        businessType,
        businessCity,
        businessPhone,
        businessPincode,
        businessEmail
      );

      const checkResponse = await axios.get(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table?filterByFormula={Business ID}='${businessId}'`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (checkResponse.data.records.length > 0) {
        alert('A business with similar details already exists. Please verify your information or contact support if you believe this is an error.');
        return;
      }

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
          "Business Password": password, // Add the hashed password
          "Auth Type": "email", // Add auth type
          Status: 'Pending',
        }
      };

      console.log('Creating business record with data:', businessData); // Debug log

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

      localStorage.setItem('businessId', businessId);
      onClose();
      router.push(`/marketplace?businessName=${encodeURIComponent(businessName)}&businessId=${encodeURIComponent(businessId)}`);

    } catch (error) {
      console.error("Error:", error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Register Your Business</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Existing form fields */}
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
                    disabled
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
                <div>
  <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
  <input
    type="text" // Changed from "password" to "text" to have control over the display
    value={'•'.repeat(password.length)} // Display bullet points instead of actual password
    disabled
    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-gray-50"
  />
</div>
            <button 
              type="submit" 
              className="w-full p-3 bg-green-900 hover:bg-green-700 text-white rounded-full font-medium transition-colors duration-200 mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Start Free Trial"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Context for tabs
const TabsContext = createContext({});
const checkEmailExists = async (email) => {
  const AIRTABLE_BASE_ID = 'your_airtable_base_id';
  const AIRTABLE_API_KEY = 'your_airtable_api_key';
  const AIRTABLE_TABLE_NAME = 'Users'; // Replace with your table name

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
        AIRTABLE_TABLE_NAME
      )}?filterByFormula=${encodeURIComponent(`{Email}='${email}'`)}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to check email');
    }

    const data = await response.json();
    return data.records.length > 0; // Returns true if email exists
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
};

// Custom Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-bold text-gray-900 ${className}`}>
    {children}
  </h2>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`mt-2 text-sm text-gray-600 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// Custom Alert Component
const Alert = ({ children, variant = "default", className = "" }) => {
  const baseStyles = "rounded-lg p-4 mb-4 text-sm flex items-start";
  const variantStyles = {
    default: "bg-blue-50 text-blue-700",
    destructive: "bg-red-50 text-red-700 border border-red-200",
    success: "bg-green-50 text-green-700",
    warning: "bg-yellow-50 text-yellow-700"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} role="alert">
      {variant === "destructive" && (
        <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )}
      {children}
    </div>
  );
};

const AlertDescription = ({ children }) => (
  <span className="block ml-1">{children}</span>
);

// Custom Tabs Components
const Tabs = ({ value, onValueChange, children, className = "" }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={`w-full ${className}`} data-orientation="horizontal">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className = "" }) => (
  <div 
    className={`inline-flex items-center justify-center w-full rounded-lg bg-gray-100 p-1 ${className}`}
    role="tablist"
  >
    {children}
  </div>
);

const TabsTrigger = ({ value, children }) => {
  const { value: selectedValue, onValueChange } = useContext(TabsContext);
  const isSelected = value === selectedValue;

  return (
    <button
      className={`
        w-full flex items-center justify-center px-3 py-2
        text-sm font-medium rounded-md select-none
        transition-all duration-200 ease-in-out
        ${isSelected 
          ? 'bg-white text-green-900 shadow-sm' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }
      `}
      onClick={() => onValueChange(value)}
      role="tab"
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children }) => {
  const { value: selectedValue } = useContext(TabsContext);
  const isSelected = value === selectedValue;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className="focus:outline-none mt-4"
      data-state={isSelected ? "active" : "inactive"}
    >
      {children}
    </div>
  );
};

// Form field wrapper component for consistent styling
const FormField = ({ label, children, error }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    {children}
    {error && (
      <p className="text-xs text-red-600 mt-1">{error}</p>
    )}
  </div>
);

const AuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [googleInitialized, setGoogleInitialized] = useState(false);
  const tab = searchParams.get('tab');
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");   
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
 
  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  // const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
 

  useEffect(() => {
    if (tab === 'login') {
      setActiveTab('login');
    }
  }, [tab]);

  // Get business details from URL parameters
  const businessId = searchParams.get('businessId');
  const businessName = searchParams.get('businessName');
  const businessType = searchParams.get('businessType');

  const checkBusinessEmail = async (email) => {
    const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_PAT;
    const AIRTABLE_TABLE_NAME = 'Business Table'; // Update with your actual table name

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula=${encodeURIComponent(
          `{Business Email}='${email}'`
        )}`,
        {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to check business email');
      }

      const data = await response.json();
      return data.records.length > 0;
    } catch (error) {
      console.error('Error checking business email:', error);
      throw error;
    }
  };


  // Initialize Google OAuth
  useEffect(() => {
    // Remove any existing Google Sign-In scripts
    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Clear any existing Google Sign-In states
    if (window.google?.accounts) {
      window.google.accounts.id.cancel();
    }

    const initializeGoogleSignIn = () => {
      if (typeof window !== 'undefined' && window.google && !googleInitialized) {
        try {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            context: 'signin',
            ux_mode: 'popup',
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          window.google.accounts.id.renderButton(
            document.getElementById('googleButton'),
            {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              text: 'continue_with',
              shape: 'rectangular',
              width: '100%',
            }
          );

          setGoogleInitialized(true);
        } catch (error) {
          console.error('Google Sign-In initialization error:', error);
          setError("Failed to initialize Google Sign-In");
        }
      }
    };

    // Load the Google Sign-In script
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (window.google?.accounts) {
        window.google.accounts.id.cancel();
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Form validation
  const validateForm = (isLogin) => {
    const errors = {};
    
    if (isLogin) {
      if (!loginEmail) errors.email = "Email is required";
      if (!loginPassword) errors.password = "Password is required";
    } else {
      if (!signupEmail) errors.email = "Email is required";
      if (!signupName) errors.name = "Name is required";
      if (!signupPassword) errors.password = "Password is required";
      if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
      if (signupPassword !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      // Add password strength validation
      if (signupPassword && signupPassword.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }
    }
    
    return errors;
  };

  // Handle Google Sign-In response
  // Handle Google Sign-In response
// In AuthPage component, update the handlers:
const handleLogin = async (e) => {
  e.preventDefault();
  const errors = validateForm(true);
  setFormErrors(errors);

  if (Object.keys(errors).length > 0) return;

  setLoading(true);
  setError("");

  try {
    const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_PAT;

    // Find the business record
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Business%20Table?filterByFormula=${encodeURIComponent(
        `{Business Email}='${loginEmail}'`
      )}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    const businessRecord = data.records[0];

    if (!businessRecord) {
      throw new Error('No account found with this email');
    }

    // Check auth type and handle accordingly
    if (businessRecord.fields['Auth Type'] === 'google') {
      // Redirect to Google login if the user originally signed up with Google
      await handleGoogleAuth();
      return;
    }

    const storedPassword = businessRecord.fields['Business Password'];
    if (!storedPassword) {
      throw new Error('No password set for this account');
    }

    // Hash the login password
    const hashedLoginPassword = await hashPassword(loginPassword);
    console.log('Login attempt:', {
      hashedLoginPassword,
      storedPassword
    }); // For debugging

    if (hashedLoginPassword !== storedPassword) {
      throw new Error('Invalid password');
    }

    // If credentials are valid, redirect to retailer dashboard
    router.push(`/retaildasboard?${new URLSearchParams({
      userName: businessRecord.fields['Business Name'] || '',
      userEmail: businessRecord.fields['Business Email'],
      businessId: businessRecord.id
    })}`);

  } catch (err) {
    console.error('Login Error:', err);
    setError(err.message || "Invalid email or password");
  } finally {
    setLoading(false);
  }
};

const handleSignup = async (e) => {
  e.preventDefault();
  console.log('Signup attempted');

  const errors = validateForm(false);
  setFormErrors(errors);

  if (Object.keys(errors).length > 0) {
    console.log('Validation errors:', errors);
    return;
  }

  setLoading(true);
  setError("");

  try {
    // Hash the password before checking email
    const hashedPassword = await hashPassword(signupPassword);
    console.log('Generated hash:', hashedPassword); // Debug log

    // Check if email exists in business table
    const emailExists = await checkBusinessEmail(signupEmail);
    
    if (!emailExists) {
      localStorage.setItem('hashedPassword', hashedPassword); // Store the hash temporarily
      setShowBusinessModal(true);
      setLoading(false);
      return;
    }

    const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_PAT;

    // Find the business record
    const businessResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Business%20Table?filterByFormula=${encodeURIComponent(
        `{Business Email}='${signupEmail}'`
      )}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const businessData = await businessResponse.json();
    const businessRecord = businessData.records[0];

    if (!businessRecord) {
      throw new Error('Business record not found');
    }

    // Update the business record with the hashed password
    const updateResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Business%20Table/${businessRecord.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            "Business Password": hashedPassword,
            "Business Name": signupName,
            "Auth Type": "email"
          }
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error('Update response error:', errorData);
      throw new Error('Failed to update business record');
    }

    // Clear temporary storage
    localStorage.removeItem('hashedPassword');

    // Navigate to retailer dashboard
    router.push(`/retaildasboard?${new URLSearchParams({
      userName: signupName,
      userEmail: signupEmail,
      businessId: businessRecord.id
    })}`);

  } catch (err) {
    console.error('Signup Error:', err);
    setError(err.message || "Error creating account");
  } finally {
    setLoading(false);
  }
};




// Updated Google Sign-In response handler
const handleGoogleResponse = async (response) => {
  try {
    setLoading(true);
    setError("");

    // Decode the JWT to get the email
    const decoded = JSON.parse(atob(response.credential.split('.')[1]));
    const email = decoded.email;

    // Check if email exists in business table
    const emailExists = await checkBusinessEmail(email);
    
    if (!emailExists) {
      // Show the business signup modal instead of redirecting
      setSignupEmail(email); // Store the email in signup state
      setShowBusinessModal(true);
      setLoading(false);
      return;
    }

    // If email exists, proceed with Google authentication
    const result = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential: response.credential }),
    });

    const data = await result.json();

    if (!result.ok) {
      throw new Error(data.message || 'Authentication failed');
    }

    router.push(`/retaildasboard?${new URLSearchParams({
      userName: data.user.name,
      userEmail: data.user.email,
    })}`);
  } catch (err) {
    console.error('Google Auth Error:', err);
    setError(err.message || "Error signing in with Google");
  } finally {
    setLoading(false);
  }
};




  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="w-full bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <button 
            onClick={() => router.push('/business')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Business
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-fadeIn">
          <CardHeader>
            <div className="flex justify-center mb-6">
              <Image
                src="/images/insta_market_business.png"
                alt="InstaMarkt Logo"
                width={200}
                height={75}
                className="object-contain"
              />
            </div>
            <CardTitle className="text-center">Welcome to InstaMarkt</CardTitle>
            <CardDescription className="text-center">
              Continue to access your business dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <FormField error={formErrors.loginEmail}>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </FormField>

                  <FormField error={formErrors.loginPassword}>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </FormField>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-900 hover:bg-green-700 text-white py-2 rounded-lg transition-colors duration-200"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
      <form onSubmit={handleSignup} className="space-y-4">
        <FormField error={formErrors.signupName}>
          <Input
            type="text"
            placeholder="Full Name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {formErrors.name && (
            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
          )}
        </FormField>

        <FormField error={formErrors.signupEmail}>
          <Input
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
          )}
        </FormField>

        <FormField error={formErrors.signupPassword}>
          <Input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {formErrors.password && (
            <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
          )}
        </FormField>

        <FormField error={formErrors.confirmPassword}>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
          )}
        </FormField>

        <Button 
          type="submit" 
          className="w-full bg-green-900 hover:bg-green-700 text-white py-2 rounded-lg transition-colors duration-200"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </TabsContent>
            </Tabs>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div id="googleButton" className="w-full h-[40px]">
              {/* Google Sign-In button will be rendered here */}
            </div>

            {/* Fallback Google button in case the official one fails to load */}
            <div className="mt-4" style={{ display: 'none' }} id="fallbackGoogleButton">
              <Button
                type="button"
                variant="outline"
                className="w-full border-2 border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 h-10"
                onClick={() => {
                  if (window.google?.accounts?.id) {
                    window.google.accounts.id.prompt();
                  } else {
                    setError("Google Sign-In is not available at the moment");
                  }
                }}
                disabled={loading}
              >
                <Image
                  src="/images/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                {loading ? "Loading..." : "Continue with Google"}
              </Button>
            </div>

            {/* Help text */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Need help?{' '}
              <a 
                href="/contact" 
                className="text-green-900 hover:text-green-700 hover:underline"
              >
                Contact Support
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} InstaMarkt. All rights reserved.</p>
      </footer>
    </div>
    <BusinessSignupModal 
    isOpen={showBusinessModal} 
    onClose={() => setShowBusinessModal(false)} 
    prefilledEmail={signupEmail} // Pass the email from signup or Google auth
    initialPassword={signupPassword} // Pass the password from signup form

  />
  </>
  );
};

export default AuthPage;
