import React, { useState } from "react";
import { Check, AlertTriangle } from 'lucide-react';

export default function Label({
    label, //Label name
    name, //Label for aka input id
    type = "text",//input type
    required = false, //input requirement
    error = "", 
    value, //inputs value - for form
    onChange, //Onchange function
    placeholder = "", //input's placeholder
    className = "" //outer div's className
}) {
    return (
        <div className={className}>
            <label htmlFor={name} className="text-left ms-4 text-lg">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border-2 px-4 py-2 rounded-full focus:outline-none"
            />
            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <TriangleAlert /> {error}
                </p>)
            }
        </div>
    )
};
