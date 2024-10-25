export function Button({ children, variant = "default", className, ...props }) {
  let baseClasses = "rounded px-4 py-2 transition-all duration-150";
  let variantClasses = {
    default: "bg-blue-500 hover:bg-blue-600 text-white",
    ghost: "bg-transparent hover:bg-gray-200",
    secondary: "bg-gray-500 hover:bg-gray-600 text-black", // Added text-black
    link: "text-blue-500 hover:underline",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
