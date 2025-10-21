import React, {useState} from "react";

export default function AlertDialog({title, message, onConfirm, onCancel}) {
    const [isOpen, setIsOpen] = useState(true);

    const handleConfirm = () => {
        setIsOpen(false);
        // if (onConfirm) onConfirm();
    };

    const handleCancel = () => {
        setIsOpen(false);
        // if (onCancel) onCancel();
    };

    if (!isOpen) return null;

    return (
        <div className="w-full p-4 border rounded-lg shadow-md bg-white">
            <div className="">
                <h2 className="text-xl font-medium">{title}</h2>
                <p>{message}</p>
                <div className="flex justify-end gap-6 mt-2 px-5">
                    <button className="px-3 py-1 border bg-blue-400 rounded" onClick={handleConfirm}>Confirm</button>
                    <button className="" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}       