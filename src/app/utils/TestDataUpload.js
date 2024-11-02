'use client';

import React, { useState } from 'react';
import axios from 'axios';
import uploadTestData from './uploadTestData';
const generateBusinessId = (businessName, businessType, businessCity, businessPhone, businessPincode, businessEmail) => {
  const cleanBusinessName = businessName.trim().toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 3);
  const cleanBusinessType = businessType.trim().toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 3);
  const cleanCity = businessCity.trim().toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 3);
  const lastFourPhone = businessPhone.slice(-4);
  const lastThreePincode = businessPincode.slice(-3);
  const cleanEmail = businessEmail.split('@')[0].substring(0, 3);
  
  return `BIZ-${cleanBusinessName}${cleanBusinessType}${cleanCity}-${lastFourPhone}${lastThreePincode}${cleanEmail}`;
};

const TestDataUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Form states
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessPincode, setBusinessPincode] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');

  const validateForm = () => {
    if (!businessName || !businessType || !businessCity || 
        !businessPhone || !businessPincode || !businessEmail) {
      setError('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Generate business ID using the same function as signup
      const businessId = generateBusinessId(
        businessName,
        businessType,
        businessCity,
        businessPhone,
        businessPincode,
        businessEmail
      );

      // First check if business exists with this ID
      const checkResponse = await axios.get(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table?filterByFormula={Business ID}='${businessId}'`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          }
        }
      );

      if (checkResponse.data.records.length === 0) {
        setError('Business not found. Please make sure to sign up the business first.');
        return;
      }

      // Upload test data using the business name
      const result = await uploadTestData(businessName);
      console.log('Upload successful:', result);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Test Data</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter business name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type
          </label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Business Type</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Grocery">Grocery</option>
            <option value="Convenience">Convenience</option>
            <option value="Flower Shop">Flower Shop</option>
            <option value="Pet Store">Pet Store</option>
            <option value="Retail">Retail</option>
            <option value="Coffee Shop">Coffee Shop</option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            value={businessCity}
            onChange={(e) => setBusinessCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter city"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={businessPhone}
            onChange={(e) => setBusinessPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pincode
          </label>
          <input
            type="text"
            value={businessPincode}
            onChange={(e) => setBusinessPincode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter pincode"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Email
          </label>
          <input
            type="email"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter business email"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
          } text-white font-medium`}
        >
          {loading ? 'Uploading...' : 'Upload Test Data'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            Test data uploaded successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDataUpload;