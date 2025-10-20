import React, { useState } from "react";
import { Check, AlertTriangle } from 'lucide-react';
import {Eye, EyeClosed} from "lucide-react"

export default function PasswordLabel ({
    label, //Label name
    name, //Label for aka input id
    type = "password",//input type
    required = false, //input requirement
    error = "", 
    value, //inputs value - for form
    onChange, //Onchange function
    placeholder = "", //input's placeholder
    className = "", //outer div's className
}) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={className}>
            <label htmlFor={name} className="text-left ms-4 text-lg">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="relative w-full border-2 px-4 py-2 rounded-full">
                <input
                id={name}
                name={name}
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pr-8 focus:outline-none"
                {...(required && { required: true })}
                />

                <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-4"
                    >
                    {showPassword ? <EyeClosed /> : <Eye />}
                </button>
            </div>
            
            

            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <TriangleAlert /> {error}
                </p>)
            }
            
        </div>
    )
};
