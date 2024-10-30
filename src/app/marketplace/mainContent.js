import axios from 'axios';
import {  Monitor, Mail, Link2, Upload, Check, X, ChevronDown } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // For navigation



const getAccessToken = async () => {
  const REFRESH_TOKEN = process.env.NEXT_PUBLIC_DROPBOX_REFRESH_TOKEN;
  const CLIENT_ID = process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_DROPBOX_CLIENT_SECRET;

  try {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', REFRESH_TOKEN);

    const response = await fetch('https://api.dropboxapi.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
      },
      body: formData.toString()
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Token refresh failed with response:", data);
      throw new Error(data.error || 'Failed to refresh token');
    }

    console.log("Access token refreshed successfully:", data.access_token);
    return data.access_token;
  } catch (error) {
    console.error("Failed to refresh Dropbox token:", error);
    throw new Error("Unable to refresh Dropbox access token");
  }
};


//switches
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

const FileUploadZone = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    // Ensure fileInputRef exists and trigger click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mt-6">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick} // Add click handler here
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center 
          transition-all duration-200 cursor-pointer
          ${isDragging ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:border-green-500'}
        `}
      >
        <Upload className="w-12 h-12 mx-auto text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop your menu file here, or click to browse
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: PDF, Word, JPEG, PNG (Max 5MB)
        </p>
      </div>
    </div>
  );
};
const FileUploadDropbox = ({ onFileUploadComplete, businessName }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const DROPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN;

  const uploadToDropbox = async (file) => {
    try {
      // First, upload to Dropbox
      const dropboxUploadResponse = await axios({
        method: 'post',
        url: 'https://content.dropboxapi.com/2/files/upload',
        data: file,
        headers: {
          'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
          'Dropbox-API-Arg': JSON.stringify({
            path: `/menus/${file.name}`,
            mode: 'add',
            autorename: true,
            mute: false
          }),
          'Content-Type': 'application/octet-stream'
        },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 50;
          setUploadProgress(progress);
        }
      });

      // Get a shared link
      const shareResponse = await axios({
        method: 'post',
        url: 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
        data: {
          path: dropboxUploadResponse.data.path_display,
          settings: { requested_visibility: 'public' }
        },
        headers: {
          'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      return shareResponse.data.url;
    } catch (error) {
      if (error.response?.status === 409) {
        // File already exists, try to get existing shared link
        const path = `/menus/${file.name}`;
        const listLinksResponse = await axios({
          method: 'post',
          url: 'https://api.dropboxapi.com/2/sharing/list_shared_links',
          data: { path },
          headers: {
            'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (listLinksResponse.data.links.length > 0) {
          return listLinksResponse.data.links[0].url;
        }
      }
      throw error;
    }
  };

  const updateAirtableWithLink = async (shareLink) => {
    try {
      // Find the business record
      const searchResponse = await axios.get(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          }
        }
      );

      const businessRecord = searchResponse.data.records.find(
        record => record.fields['Name']?.trim().toLowerCase() === businessName.trim().toLowerCase()
      );

      if (!businessRecord) {
        throw new Error('Business record not found');
      }

      // Update Airtable with the Dropbox link
      await axios.patch(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table/${businessRecord.id}`,
        {
          fields: {
            "Menu Type": "file",
            "Menu URL": shareLink,
            "Menu File Name": selectedFile.name
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          }
        }
      );
    } catch (error) {
      throw new Error('Failed to update Airtable: ' + error.message);
    }
  };

  const handleFileSelect = async (file) => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = {
      'application/pdf': true,
      'image/jpeg': true,
      'image/png': true,
      'application/msword': true,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true
    };

    if (!ALLOWED_TYPES[file.type]) {
      setError('Please upload a PDF, Word document, or image file (JPEG/PNG)');
      return;
    }

    if (file.size > MAX_SIZE) {
      setError('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setError('');

    try {
      // Upload to Dropbox and get share link
      const shareLink = await uploadToDropbox(file);
      setUploadProgress(75);

      // Update Airtable with the share link
      await updateAirtableWithLink(shareLink);
      setUploadProgress(100);

      setSuccess('File uploaded successfully!');
      onFileUploadComplete({ fileUrl: shareLink, fileName: file.name });
    } catch (error) {
      setError('Upload failed: ' + error.message);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files[0])}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />
      
      <div
        onClick={() => document.getElementById('fileInput').click()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          transition-all duration-200 cursor-pointer
          ${selectedFile ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'}
        `}
      >
        <Upload className="w-12 h-12 mx-auto text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {selectedFile ? selectedFile.name : 'Drop your file here, or click to browse'}
        </p>
      </div>

      {uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
          <X className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
          <Check className="w-5 h-5 mr-2" />
          {success}
        </div>
      )}
    </div>
  );
};
const MenuSection = ({ menuOption, setMenuOption, onSubmit, businessName, selectedFile, setSelectedFile }) => {
  const [menuLink, setMenuLink] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const DROPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN;

  const uploadToDropbox = async (file) => {
    try {
      // First, try using the current access token
      let accessToken = process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN;
  
      // Function to perform the actual upload
      const performUpload = async (token) => {
        const dropboxUploadResponse = await axios({
          method: "post",
          url: "https://content.dropboxapi.com/2/files/upload",
          data: file,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Dropbox-API-Arg": JSON.stringify({
              path: `/menus/${file.name}`,
              mode: "add",
              autorename: true,
              mute: false,
            }),
            "Content-Type": "application/octet-stream",
          },
        });
        return dropboxUploadResponse.data;
      };
  
      // Function to create a shared link for the uploaded file
      const createShareLink = async (token, path) => {
        const shareResponse = await axios({
          method: "post",
          url: "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
          data: {
            path: path,
            settings: { requested_visibility: "public" },
          },
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        return shareResponse.data.url;
      };
  
      // Try uploading with the current access token
      let uploadResponse;
      try {
        uploadResponse = await performUpload(accessToken);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If unauthorized (token expired), refresh the token
          accessToken = await getAccessToken();
          uploadResponse = await performUpload(accessToken); // Retry upload with new token
        } else {
          throw error; // Re-throw other errors
        }
      }
  
      // Create a shared link for the uploaded file
      const sharedLink = await createShareLink(accessToken, uploadResponse.path_display);
      return sharedLink;
    } catch (error) {
      console.error("Dropbox upload failed:", error);
      throw new Error("Dropbox upload failed: " + error.message);
    }
  };
  
  

  const updateAirtableWithLink = async (shareLink, fileName) => {
    try {
      // Find the business record
      const searchResponse = await axios.get(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          }
        }
      );

      const businessRecord = searchResponse.data.records.find(
        record => record.fields['Name']?.trim().toLowerCase() === businessName.trim().toLowerCase()
      );

      if (!businessRecord) {
        throw new Error('Business record not found');
      }

      // Update Airtable with the Dropbox link
      await axios.patch(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table/${businessRecord.id}`,
        {
          fields: {
            "Menu Type": "file",
            "Menu URL": shareLink,
            "Menu File Name": fileName
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          }
        }
      );
    } catch (error) {
      throw new Error('Failed to update Airtable: ' + error.message);
    }
  };

  const handleFileSelect = async (file) => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = {
      'application/pdf': true,
      'image/jpeg': true,
      'image/png': true,
      'application/msword': true,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true
    };

    if (!ALLOWED_TYPES[file.type]) {
      setErrorMessage('Please upload a PDF, Word document, or image file (JPEG/PNG)');
      return;
    }

    if (file.size > MAX_SIZE) {
      setErrorMessage('File size must be less than 5MB');
      return;
    }

    try {
      // Upload to Dropbox and get share link
      const shareLink = await uploadToDropbox(file);
      setUploadProgress(75);

      // Update Airtable with the share link
      await updateAirtableWithLink(shareLink, file.name);
      setUploadProgress(100);

      setSuccessMessage('File uploaded successfully!');

      // Update MainContent's selectedFile
      setSelectedFile(file);

      // Optionally, you can automatically proceed to the next step
      // onSubmit();
    } catch (error) {
      setErrorMessage('Upload failed: ' + error.message);
      setUploadProgress(0);
    }
  };
  const handleMenuLinkSubmit = async () => {
    try {
      // Find the business record
      const searchResponse = await axios.get(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          }
        }
      );
  
      const businessRecord = searchResponse.data.records.find(
        record => record.fields['Name']?.trim().toLowerCase() === businessName.trim().toLowerCase()
      );
  
      if (!businessRecord) {
        throw new Error('Business record not found');
      }
  
      // Update Airtable with the menu link
      await axios.patch(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table/${businessRecord.id}`,
        {
          fields: {
            "Menu Type": "link",
            "Menu URL": menuLink
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          }
        }
      );
  
      setSuccessMessage('Menu link saved successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onSubmit();
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to save menu link');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">How would you like to add your menu?</h2>

      <div className="space-y-4">
        <div
          onClick={() => setMenuOption('menu_link')}
          className={`
            block p-6 border-2 rounded-xl transition-all duration-200 cursor-pointer
            ${menuOption === 'menu_link' ? 'border-green-600 bg-green-50/50' : 'border-gray-200 hover:border-green-400'}
          `}
        >
          <div className="flex items-center space-x-4">
            <Link2 className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-lg font-semibold text-gray-900">Add Menu Link</p>
              <p className="text-sm text-gray-600">Provide a link to your existing menu</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => setMenuOption('menu_file')}
          className={`
            block p-6 border-2 rounded-xl transition-all duration-200 cursor-pointer
            ${menuOption === 'menu_file' ? 'border-green-600 bg-green-50/50' : 'border-gray-200 hover:border-green-400'}
          `}
        >
          <div className="flex items-center space-x-4">
            <Upload className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-lg font-semibold text-gray-900">Upload Menu File</p>
              <p className="text-sm text-gray-600">Upload your menu file (PDF, Word, or images)</p>
            </div>
          </div>
        </div>

        {menuOption === 'menu_link' && (
          <div className="mt-6">
            <input
  type="url"
  placeholder="Enter menu URL"
  value={menuLink}
  onChange={(e) => setMenuLink(e.target.value)}
  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900"
/>
          </div>
        )}

        {menuOption === 'menu_file' && (
          <div className="mt-6">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <div
              onClick={() => document.getElementById('fileInput').click()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center
                transition-all duration-200 cursor-pointer
                ${selectedFile ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'}
              `}
            >
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {selectedFile ? selectedFile.name : 'Drop your file here, or click to browse'}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supported formats: PDF, Word, JPEG, PNG (Max 5MB)
              </p>
            </div>
          </div>
        )}

        {selectedFile && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-green-800">Selected: {selectedFile.name}</p>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <X className="w-5 h-5 mr-2" />
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
            <Check className="w-5 h-5 mr-2" />
            {successMessage}
          </div>
        )}

<button
  onClick={async () => {
    if (menuOption === 'menu_link') {
      await handleMenuLinkSubmit();
    } else {
      onSubmit();
    }
  }}
  disabled={menuOption === 'menu_file' && !selectedFile}
  className={`
    w-full mt-8 py-4 rounded-xl font-medium text-lg transition-colors
    ${menuOption === 'menu_file' && !selectedFile ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}
  `}
>
  Continue
</button>
      </div>
    </div>
  );
};




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
const SuccessModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    router.push('/business');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Setup Complete!</h3>
          <p className="text-gray-600 mb-6">
            Your details have been successfully submitted. You'll receive all the details via email and phone. Your store is being set up and we'll notify you once it's ready.
          </p>
          <button
            onClick={handleClose}
            className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
export default function MainContent({ selectedStep, onComplete, businessName }) {
  const [accessToken, setAccessToken] = useState(null);

  // Call getAccessToken and set the access token state
  const refreshAccessToken = async () => {
    try {
      const token = await getAccessToken();
      setAccessToken(token);
    } catch (error) {
      console.error(error.message);
    }
  };
  const [applySameHours, setApplySameHours] = useState(false);
  const [selectedOrderMethod, setSelectedOrderMethod] = useState('');
  const [menuOption, setMenuOption] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formData, setFormData] = useState({
    Monday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Tuesday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Wednesday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Thursday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Friday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Saturday: { open: '08:00 AM', close: '09:00 PM', closed: false },
    Sunday: { open: '08:00 AM', close: '09:00 PM', closed: false },
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  
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
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
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
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("Successfully updated Business Table record with Order Method:", businessRecordId);

        // Proceed to the next step
        onComplete(selectedStep); // Move to store hours step
      } else {
        console.error("No matching business record found for the provided business name.");
        setErrorMessage('No matching business record found. Please verify your business name.');
      }
    } catch (error) {
      console.error("Error updating Business Data with Order Method:", error);
      console.error("Error details:", error.response ? error.response.data : "No response data");
      setErrorMessage('Failed to save order method. Please try again.');
    }
  };

  const handleStoreHoursSubmit = async () => {
    try {
      for (const day in formData) {
        const { open, close, closed } = formData[day];
        
        // Ensure that the `Is Open` field is a boolean
        const isOpen = closed ? "false" : "true";
        
        await axios.post(
          `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Store Hours`,
          {
            fields: {
              "Business Name": businessName,
              "WeekDay": day,
              "Store Open Hour": closed ? '' : open,
              "Store Close Hour": closed ? '' : close,
              "Is Open": isOpen, // true or false
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
              'Content-Type': 'application/json',
            }
          }
        );
      }
      onComplete(selectedStep);
    } catch (error) {
      console.error("Error saving Store Hours:", error);
      console.error("Error details:", error.response ? error.response.data : "No response data");
      setErrorMessage('Failed to save store hours. Please try again.');
    }
  };
  
  
  const handleMenuOptionSubmit = async () => {
    try {
      // Since MenuSection already handles uploading and Airtable updates,
      // we can proceed to the next step directly.

      setSuccessMessage('Menu information saved successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onComplete(selectedStep);
      }, 2000);

    } catch (error) {
      console.error('Error saving menu information:', error);
      let errorMessage = 'Failed to save menu information. ';
      
      if (error.response?.status === 413) {
        errorMessage += 'File is too large. Please try a smaller file.';
      } else if (error.response?.status === 403) {
        errorMessage += 'Upload permission denied. Please try again.';
      } else if (error.message.includes('Dropbox')) {
        errorMessage += 'Failed to upload to Dropbox. Please try again.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      setErrorMessage(errorMessage);
      setUploadProgress(0);
    }
  };

  const handlePlanSelect = async (plan) => {
    setSelectedPlan(plan.title);
  
    try {
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
      const matchedRecord = records.find(
        record => record.fields['Name'] &&
                  record.fields['Name'].trim().toLowerCase() === businessName.trim().toLowerCase()
      );
  
      if (matchedRecord) {
        const recordId = matchedRecord.id;
  
        await axios.patch(
          `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table/${recordId}`,
          {
            fields: {
              "Pricing Plan": plan.title,
            },
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log("Successfully updated Business Table record with Pricing Plan:", recordId);
        setIsModalOpen(true); // Show modal after successful update
      } else {
        console.error("Record with the specified business name not found.");
        setErrorMessage('Pricing plan update failed. Please try again.');
      }
    } catch (error) {
      console.error("Error updating Pricing Plan:", error);
      console.error("Error details:", error.response ? error.response.data : "No response data");
      setErrorMessage('Failed to update pricing plan. Please try again.');
    }
  };

  const [planScale, setPlanScale] = useState('small'); // Initialize planScale state

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
      case 4:
        return <h1 className="text-3xl font-bold text-black">Choose Your Pricing Plan</h1>;
      default:
        return null;
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
            businessName={businessName}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
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
     rounded-full font-medium text-lg px-6 py-2
     ${planScale === scale 
       ? 'bg-green-900 text-white shadow-lg' 
       : 'bg-green-50 text-green-900 hover:bg-green-100'}
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
        return <p>Select a section to get started.</p>;
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-20 lg:px-40 ml-40">
      <div className="text-center mb-8">
        {renderHeader()}
        <SuccessModal isOpen={isModalOpen} onClose={() => {
      setIsModalOpen(false);
      router.push('/business');
    }} />
      </div>
      <div className="w-full max-w-5xl">
        {renderContent()}
      </div>

      {/* Display Success and Error Messages Globally */}
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}
