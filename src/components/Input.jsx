import React, { useId } from 'react';

// This is used in the input field used in the login and signup form.
const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props
}, ref) {
  const id = useId();

  return (
    <div className='w-full'>
      {label && (
        <label
          className='inline-block mb-2 pl-1 text-sm font-medium text-gray-700'
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-4 py-2 rounded-lg bg-white text-gray-900 outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 border border-gray-300 w-full transition duration-200 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
