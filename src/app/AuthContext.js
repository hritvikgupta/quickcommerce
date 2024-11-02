// AuthContext.js
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for existing auth and business data
    const storedUser = localStorage.getItem('user');
    const storedBusinessData = localStorage.getItem('businessData');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedBusinessData) {
      setBusinessData(JSON.parse(storedBusinessData));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password, businessId) => {
    try {
      // Fetch business data from Airtable using businessId
      const response = await axios.get(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table?filterByFormula={Business ID}='${businessId}'`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          }
        }
      );

      if (response.data.records.length === 0) {
        throw new Error('Business not found');
      }

      const business = response.data.records[0].fields;

      // Create user object with business information
      const userData = {
        email,
        businessId,
        businessName: business.Name,
        businessType: business.Type,
      };

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('businessData', JSON.stringify(business));

      setUser(userData);
      setBusinessData(business);

      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('businessData');
    setUser(null);
    setBusinessData(null);
    router.push('/');
  };

  const updateBusinessData = (newData) => {
    const updatedData = { ...businessData, ...newData };
    localStorage.setItem('businessData', JSON.stringify(updatedData));
    setBusinessData(updatedData);
  };

  return (
    <AuthContext.Provider value={{
      user,
      businessData,
      loading,
      login,
      logout,
      updateBusinessData
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}