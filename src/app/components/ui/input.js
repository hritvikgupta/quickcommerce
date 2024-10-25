export function Input({ className, ...props }) {
    return (
      <input
        className={`border border-gray-300 rounded-md px-4 py-2 ${className}`}
        {...props}
      />
    );
  }
  