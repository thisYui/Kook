import React, { useEffect, useState } from "react";
import { CircleAlert, CheckCircle, XCircle, X } from "lucide-react";

const VARIANTS = {
    info: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        icon: <CircleAlert className="w-5 h-5 text-blue-600" />
    },
    success: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        icon: <CheckCircle className="w-5 h-5 text-green-600" />
    },
    error: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
        icon: <XCircle className="w-5 h-5 text-red-600" />
    }
};

export default function AlertPopup({
    title,
    content,
    variant = "info", // "info" | "success" | "error"
    className = "",
    onClose // optional close handler
}) {
    const v = VARIANTS[variant] || VARIANTS.info;
    const [visible, setVisible] = useState(true);

    function closeAlert() {
        setVisible(false);
        if (typeof onClose === "function") onClose();
    }

    useEffect(() => {
        if (!visible) return;
        const t = setTimeout(closeAlert, 10000); // auto close after 10s
        return () => clearTimeout(t);
    }, [visible]);

    if (!visible) return null;

    return (
        <div
            role="alert"
            aria-live="polite"
            className={`w-full ${v.bg} ${v.border} border px-4 py-3 rounded-lg shadow-sm flex items-start gap-3 ${className} transition-opacity duration-200`}
        >
            <div className="flex-shrink-0 mt-0.5">
                {v.icon}
            </div>

            <div className="flex-1 min-w-0">
                {title && <h3 className={`font-medium ${v.text} text-sm`}>{title}</h3>}
                {content && <p className="text-sm text-gray-700 mt-1 leading-relaxed">{content}</p>}
            </div>

            {onClose && (
                <button
                    type="button"
                    onClick={closeAlert}
                    aria-label="Close alert"
                    className="ml-3 p-1 rounded-full hover:bg-gray-100 active:scale-95 transition"
                >
                    <X className="w-4 h-4 text-gray-600" />
                </button>
            )}
        </div>
    );
};