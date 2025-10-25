import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Accordion({ header, children, defaultOpen = false }) {
    const [showContent, setShowContent] = useState(defaultOpen);

    const handleClick = () => setShowContent(!showContent);

    const regionId = `accordion-${header?.toString().replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <div className="w-full border-b">
        <button
            type="button"
            aria-expanded={showContent}
            aria-controls={regionId}
            onClick={handleClick}
            className="w-full flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
        >
            <span className="font-medium text-sm sm:text-base">{header}</span>

            <span className="ml-2 sm:ml-4 flex-shrink-0">
            {showContent ? (
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
            </span>
        </button>

        <div
            id={regionId}
            role="region"
            aria-labelledby={regionId}
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showContent ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
            <div className="px-3 sm:px-4 pb-3">{children}</div>
        </div>
        </div>
    );
}
