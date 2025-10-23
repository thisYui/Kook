import React from "react";
/* 

    const [selected, setSelected] = useState("");
    const options = [
        { value: "vn", label: "Vietnam" },
        { value: "us", label: "United States" },
        { value: "jp", label: "Japan" },
    ];
    
    <DropdownLabel
        label="Country"
        name="country"
        options={options}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        placeholder="Choose a country"
        required
        error={!selected && "Please select a country"}
        className='text-lg ml-3'
        selectClassName=''
    />
*/
export default function DropdownLabel({
    label,
    name,
    options = [],
    value,
    onChange,
    placeholder = "Select an option",
    className = "",
    selectClassName = "",
    required = false,
    disabled = false,
    error = "",
    children,
    }) {
    return (
        <div className="flex flex-col gap-1 w-full">
        {label && (
            <label
            htmlFor={name}
            className={className}
            >
            {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}

        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`border rounded-lg p-2 ${selectClassName}`}
        >
            {placeholder && (
            <option value="" disabled hidden>
                {placeholder}
            </option>
            )}

            {options.length > 0
            ? options.map((opt, index) => (
                <option key={index} value={opt.value}>
                    {opt.label}
                </option>
                ))
            : children}
        </select>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}
