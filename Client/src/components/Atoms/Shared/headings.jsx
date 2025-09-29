import React from "react";

const H1 = ({ children, className = "", ...props }) => (
  <h1
    className={`text-3xl lg:text-5xl text-gray-900 font-bold mb-3 lg:mb-6 ${className}`}
    {...props}
  >
    {children}
  </h1>
);

const H2 = ({ children, className = "", ...props }) => (
  <h2
    className={`text-2xl lg:text-4xl text-gray-900 font-bold mb-2 lg:mb-5 ${className}`}
    {...props}
  >
    {children}
  </h2>
);

const H3 = ({ children, className = "", ...props }) => (
  <h3
    className={`text-xl lg:text-3xl text-gray-900 font-semibold mb-1 lg:mb-4 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const H4 = ({ children, className = "", ...props }) => (
  <h4
    className={`text-lg lg:text-2xl text-gray-900 font-semibold mb-1 lg:mb-3 ${className}`}
    {...props}
  >
    {children}
  </h4>
);

const SubHeading = ({ children, className = "", ...props }) => (
  <strong
    className={`text-sm lg:text-base uppercase tracking-wider text-gray-600 font-semibold ${className}`}
    {...props}
  >
    {children}
  </strong>
);

export { H1, H2, H3, H4, SubHeading };
