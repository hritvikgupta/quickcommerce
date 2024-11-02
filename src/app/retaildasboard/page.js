'use client';

import React, { useState, useEffect,Suspense } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import {
  Store, Package, Clock, TrendingUp, Settings, Users, ShoppingBag, ChevronDown, Bell
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';


const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading dashboard data...</p>
    </div>
  </div>
);

// Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-black ${className}`}>
    {children}
  </h3>
);

// Overview Content Component
const OverviewContent = ({ dashboardData }) => (
  <>
    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-black">Total Revenue</CardTitle>
          <TrendingUp className="w-4 h-4 text-black" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-black">Rs {dashboardData.revenue.total}</div>
          <p className="text-xs text-black">
            {dashboardData.revenue.growth > 0 ? '+' : ''}{dashboardData.revenue.growth}% from last week
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-black">Total Orders</CardTitle>
          <Package className="w-4 h-4 text-black" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-black">{dashboardData.orders.total}</div>
          <p className="text-xs text-black">
            {dashboardData.orders.growth > 0 ? '+' : ''}{dashboardData.orders.growth}% from last week
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-black">Active Customers</CardTitle>
          <Users className="w-4 h-4 text-black" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-black">{dashboardData.customers.total}</div>
          <p className="text-xs text-black">
            {dashboardData.customers.growth > 0 ? '+' : ''}{dashboardData.customers.growth}% from last week
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-black">Avg. Order Time</CardTitle>
          <Clock className="w-4 h-4 text-black" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-black">{dashboardData.averageOrderTime.value}m</div>
          <p className="text-xs text-black">{dashboardData.averageOrderTime.change}m from last week</p>
        </CardContent>
      </Card>
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.revenue.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-black">Order Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.orders.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#059669" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Recent Orders */}
    <Card>
      <CardHeader>
        <CardTitle className="text-black">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-xs text-black uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map((order) => (
                <tr key={order.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-black">#{order.id}</td>
                  <td className="px-6 py-4 text-black">{order.customer}</td>
                  <td className="px-6 py-4 text-black">{order.items}</td>
                  <td className="px-6 py-4 text-black">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-black' :
                      order.status === 'Processing' ? 'bg-blue-100 text-black' :
                      'bg-yellow-100 text-black'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </>
);

// Orders Content Component
const OrdersContent = ({ dashboardData }) => (
  <div>
    <Card>
      <CardHeader>
        <CardTitle className="text-black">All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-xs text-black uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map((order) => (
                <tr key={order.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-black">#{order.id}</td>
                  <td className="px-6 py-4 text-black">{order.customer}</td>
                  <td className="px-6 py-4 text-black">{order.items}</td>
                  <td className="px-6 py-4 text-black">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-black' :
                      order.status === 'Processing' ? 'bg-blue-100 text-black' :
                      'bg-yellow-100 text-black'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Inventory Content Component
const InventoryContent = ({ inventory = [] }) => (
  <div>
    <Card>
      <CardHeader>
        <CardTitle className="text-black">Inventory Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-xs text-black uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Item Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock Level</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(inventory) && inventory.map((item) => (
                <tr key={item.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-black">{item.fields['Item Name']}</td>
                  <td className="px-6 py-4 text-black">{item.fields['Category']}</td>
                  <td className="px-6 py-4 text-black">Rs {item.fields['Price']}</td>
                  <td className="px-6 py-4 text-black">{item.fields['Stock Level']}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.fields['Stock Level'] > item.fields['Low Stock Alert'] 
                        ? 'bg-green-100 text-black' 
                        : 'bg-red-100 text-black'
                    }`}>
                      {item.fields['Stock Level'] > item.fields['Low Stock Alert'] ? 'In Stock' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-blue-600 hover:text-blue-800">Update Stock</button>
                  </td>
                </tr>
              ))}
              {(!inventory || inventory.length === 0) && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No inventory items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Customers Content Component
const CustomersContent = ({ customerAnalytics }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Total Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-black">{customerAnalytics.total}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-black">New Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-black">{customerAnalytics.growth}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Avg Items Per Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-black">2.5</div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="text-black">Customer List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-xs text-black uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Customer Name</th>
                <th className="px-6 py-3">Total Orders</th>
                <th className="px-6 py-3">Total Spent</th>
                <th className="px-6 py-3">Last Order</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* You'll need to implement customer list data */}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Settings Content Component
const SettingsContent = ({ businessData, businessId, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: businessData?.name || '',
    type: businessData?.type || '',
    email: businessData?.email || '',
    phone: businessData?.phone ? businessData.phone.toString() : '',
    address: businessData?.address || '',
    city: businessData?.city || '',
    state: businessData?.state || '',
    pincode: businessData?.pincode ? businessData.pincode.toString() : '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (businessData) {
      setFormData({
        name: businessData.name || '',
        type: businessData.type || '',
        email: businessData.email || '',
        phone: businessData.phone ? businessData.phone.toString() : '',
        address: businessData.address || '',
        city: businessData.city || '',
        state: businessData.state || '',
        pincode: businessData.pincode ? businessData.pincode.toString() : '',
      });
    }
  }, [businessData]);

  // Function to generate Business ID
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    // Validate pincode
    if (formData.pincode && isNaN(Number(formData.pincode))) {
      setMessage({ type: 'error', text: 'Pincode must be a valid number' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Fetch the business record using the businessId
      const businessResponse = await axios.get(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table?filterByFormula={Business ID}='${businessId}'`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          },
        }
      );

      const businessRecord = businessResponse.data.records[0];
      if (!businessRecord) {
        throw new Error('Business not found');
      }

      // Generate new business ID if relevant fields have changed
      const shouldUpdateBusinessId =
        formData.name !== businessData.name ||
        formData.type !== businessData.type ||
        formData.city !== businessData.city ||
        formData.state !== businessData.state ||
        formData.phone !== businessData.phone ||
        formData.pincode !== businessData.pincode ||
        formData.email !== businessData.email;
      
      let newBusinessId = businessRecord.fields['Business ID'];
      if (shouldUpdateBusinessId) {
        newBusinessId = generateBusinessId(
          formData.name,
          formData.type,
          formData.city,
          formData.phone,
          formData.pincode,
          formData.email
        );
      }

      // Prepare updated fields
      const updatedFields = {
        ...businessRecord.fields,
        Name: formData.name,
        Type: formData.type,
        'Business Email': formData.email,
        'Business Phone': formData.phone,
        Address: formData.address,
        City: formData.city,
        State: formData.state,
        Pincode: formData.pincode ? Number(formData.pincode) : null,
        'Business ID': newBusinessId,
      };

      // Update the record in Airtable
      await axios.patch(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table`,
        {
          records: [
            {
              id: businessRecord.id,
              fields: updatedFields,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage({
        type: 'success',
        text: shouldUpdateBusinessId
          ? 'Business settings and ID updated successfully!'
          : 'Business settings updated successfully!',
      });

      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating business:', error);
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        'Failed to update business settings. Please try again.';
      setMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Business Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {message.text && (
              <div
                className={`p-4 rounded-md ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full p-2 border rounded-md text-black"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Type
              </label>
              <input
                type="text"
                name="type"
                className="mt-1 block w-full p-2 border rounded-md text-black"
                value={formData.type}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full p-2 border rounded-md text-black"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Phone
              </label>
              <input
                type="tel"
                name="phone"
                className="mt-1 block w-full p-2 border rounded-md text-black"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                className="mt-1 block w-full p-2 border rounded-md text-black"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                className="mt-1 block w-full p-2 border rounded-md text-black"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                className="mt-1 block w-full p-2 border rounded-md text-black"
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Address
              </label>
              <textarea
                name="address"
                className="mt-1 block w-full p-2 border rounded-md text-black"
                rows="3"
                value={formData.address}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Security Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Security Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Update Password
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DashboardContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [selectedBusinessName, setSelectedBusinessName] = useState('');
  const [selectedBusinessType, setSelectedBusinessType] = useState('');
  const [businessData, setBusinessData] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    revenue: { total: 0, growth: 0, data: [] },
    orders: { total: 0, growth: 0, data: [] },
    customers: { total: 0, growth: 0 },
    averageOrderTime: { value: 0, change: 0 },
    recentOrders: [],
    inventory: []
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Logout handler
  const handleLogout = () => {
    router.push('/business');
  };

  // Get user details from URL parameters
  const userName = searchParams.get('userName');
  const userEmail = searchParams.get('userEmail');

  useEffect(() => {
    if (!userEmail) {
      router.push('/auth');
      return;
    }
    fetchBusinesses();
  }, [userEmail]);

  const fetchBusinesses = async () => {
    try {
      // Fetch all businesses associated with this email from Airtable
      const businessResponse = await axios.get(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table`,
        {
          params: {
            filterByFormula: `{Business Email} = '${userEmail}'`,
          },
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          },
        }
      );

      const businessesData = businessResponse.data.records;

      if (businessesData.length === 0) {
        throw new Error('No business associated with this email');
      }

      setBusinesses(businessesData);

      // Set the first business as the selected one by default
      const firstBusiness = businessesData[0];
      setSelectedBusinessId(firstBusiness.fields['Business ID']);
      setSelectedBusinessName(firstBusiness.fields.Name);
      setSelectedBusinessType(firstBusiness.fields.Type);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBusinessId) {
      fetchDashboardData();
    }
  }, [selectedBusinessId]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.log('Starting data fetch for business:', selectedBusinessName);

      const businessResponse = await axios.get(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table?filterByFormula={Business ID}='${selectedBusinessId}'`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          }
        }
      );

      const businessRecord = businessResponse.data.records[0];
      if (!businessRecord) throw new Error('Business not found');

      // Set business data
      setBusinessData({
        name: businessRecord.fields.Name,
        type: businessRecord.fields.Type,
        email: businessRecord.fields['Business Email'],
        phone: businessRecord.fields['Business Phone'] ? businessRecord.fields['Business Phone'].toString() : '',
        address: businessRecord.fields.Address,
        city: businessRecord.fields.City,
        state: businessRecord.fields.State || '',
        pincode: businessRecord.fields.Pincode ? businessRecord.fields.Pincode.toString() : ''
      });

      // Get related records
      const inventoryIds = businessRecord.fields.Inventory || [];
      const orderIds = businessRecord.fields['Orders 3'] || [];

      // Fetch related data
      const [inventoryResponse, ordersResponse] = await Promise.all([
        inventoryIds.length > 0
          ? axios.get(
              `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Inventory?filterByFormula=OR(${
                inventoryIds.map(id => `RECORD_ID()='${id}'`).join(',')
              })`,
              {
                headers: {
                  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
                }
              }
            )
          : Promise.resolve({ data: { records: [] } }),
        orderIds.length > 0
          ? axios.get(
              `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Orders?filterByFormula=OR(${
                orderIds.map(id => `RECORD_ID()='${id}'`).join(',')
              })`,
              {
                headers: {
                  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
                }
              }
            )
          : Promise.resolve({ data: { records: [] } }),
      ]);

      // Process the data
      const inventory = inventoryResponse.data.records;
      const orders = ordersResponse.data.records;
      const totalRevenue = orders.reduce((sum, order) => 
        sum + (order.fields['Total Amount'] || 0), 0
      );
      
      // Process recent orders
      const recentOrders = orders
        .sort((a, b) => new Date(b.fields['Order Date']) - new Date(a.fields['Order Date']))
        .slice(0, 5)
        .map(order => ({
          id: order.id,
          customer: order.fields['Customer Name'] || 'Unknown',
          items: order.fields['Items Count'] || 0,
          total: `Rs ${order.fields['Total Amount'] || 0}`,
          status: order.fields['Status'] || 'Pending'
        }));

      // Update dashboard data
      setDashboardData({
        revenue: {
          total: totalRevenue,
          growth: 5,
          data: orders.map(order => ({
            name: new Date(order.fields['Order Date']).toLocaleDateString('en-US', { weekday: 'short' }),
            revenue: order.fields['Total Amount'] || 0
          }))
        },
        orders: {
          total: orders.length,
          growth: 10,
          data: orders.map(order => ({
            name: new Date(order.fields['Order Date']).toLocaleDateString('en-US', { weekday: 'short' }),
            orders: 1
          }))
        },
        customers: {
          total: orders.length, // You can adjust this based on actual customer data
          growth: Math.round(orders.length * 0.3)
        },
        averageOrderTime: {
          value: 30, // This could be calculated from actual data
          change: -2
        },
        recentOrders,
        inventory
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent dashboardData={dashboardData} />;
      case 'orders':
        return <OrdersContent dashboardData={dashboardData} />;
      case 'inventory':
        return <InventoryContent inventory={dashboardData.inventory} />;
      case 'customers':
        return <CustomersContent customerAnalytics={dashboardData.customers} />;
      case 'settings':
        return businessData ? (
          <SettingsContent 
            businessData={businessData}
            businessId={selectedBusinessId}
            onUpdate={fetchDashboardData}
          />
        ) : null;
      default:
        return <OverviewContent dashboardData={dashboardData} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-black">Select Store</h2>
          <select
            value={selectedBusinessId || ''}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedBusiness = businesses.find(b => b.fields['Business ID'] === selectedId);
              setSelectedBusinessId(selectedId);
              setSelectedBusinessName(selectedBusiness.fields.Name);
              setSelectedBusinessType(selectedBusiness.fields.Type);
            }}
            className="mt-2 block w-full text-black p-2 border rounded-md"
          >
            {businesses.map((business) => (
              <option key={business.id} value={business.fields['Business ID']}>
                {business.fields.Name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-600">{userName}</p>
        </div>
        <nav className="mt-6">
          {[
            { id: 'overview', icon: Store, label: 'Overview' },
            { id: 'orders', icon: Package, label: 'Orders' },
            { id: 'inventory', icon: ShoppingBag, label: 'Inventory' },
            { id: 'customers', icon: Users, label: 'Customers' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center px-6 py-3 text-left ${
                activeTab === id ? 'bg-green-50 text-black border-r-4 border-green-800' : 'text-black'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-black">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="text-gray-600">
              Manage your {activeTab.toLowerCase()} and view analytics
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Bell className="w-6 h-6" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-800 font-medium">
                    {selectedBusinessName.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                  isDropdownOpen ? 'transform rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

const RetailerDashboard = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardContent />
    </Suspense>
  );
};

export default RetailerDashboard;
