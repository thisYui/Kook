import React from "react";
import { AlertTriangle } from 'lucide-react';

export default function Label({
    label, // Label name
    name, // Label for aka input id
    type = "text", // input type
    required = false, // input requirement
    error = "",
    value, // input's value - for form
    onChange, // onChange function
    placeholder = "", // input's placeholder
    className = "", // outer div's className
    checked = false, // for radio / checkbox
}) {
    const isRadioOrCheckbox = type === "radio" || type === "checkbox";

    return (
        <div className={className}>
            {isRadioOrCheckbox ? (
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        checked={checked}
                        className="w-5 h-5 cursor-pointer accent-blue-600"
                    />
                    {label && (
                        <span className="text-lg select-none">
                            {label}
                            {required && <span className="text-red-500 ml-1">*</span>}
                        </span>
                    )}
                </label>
            ) : (
                <>
                    {label && (
                        <label htmlFor={name} className="text-left ms-4 text-lg">
                            {label}
                            {required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                    )}
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="border-2 px-4 py-2 rounded-full focus:outline-none"
                    />
                </>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertTriangle size={16} /> {error}
                </p>
            )}
        </div>
    );
}
