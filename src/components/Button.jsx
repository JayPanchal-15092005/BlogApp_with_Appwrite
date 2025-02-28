import React from "react";

// This button is used in login and signup form the end.

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-5 py-2.5 rounded-lg font-medium ${bgColor} ${textColor} shadow-md hover:opacity-90 transition duration-300 ease-in-out w-full sm:w-auto ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
