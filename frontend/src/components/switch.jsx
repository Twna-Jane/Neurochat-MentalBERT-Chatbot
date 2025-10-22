import React from "react";

export const Switch = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-3">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors ${
          checked ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
};
