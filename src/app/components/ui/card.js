export function Card({ className = "", children }) {
  return (
    <div className={`bg-white shadow-md rounded-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="text-lg font-bold text-gray-800">{children}</h3>;
}

export function CardFooter({ className = "", children }) {
  return <div className={`p-4 border-t ${className}`}>{children}</div>;
}
