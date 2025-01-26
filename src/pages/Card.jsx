import React from "react";
export const Card = ({ children, className = "" }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-lg p-4 ${className}`}>
            {children}
        </div>
    );
};