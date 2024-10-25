// components/ui/textarea.js
import React from 'react';

const Textarea = ({ className = '', ...props }) => {
  return (
    <textarea
      className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${className}`}
      {...props}
    />
  );
};

export default Textarea;
