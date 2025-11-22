import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-xl border border-gray-200 p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => {
  return <div className={`border-b pb-2 mb-3 ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-800 ${className}`}>
      {children}
    </h2>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`text-gray-700 ${className}`}>{children}</div>;
};
