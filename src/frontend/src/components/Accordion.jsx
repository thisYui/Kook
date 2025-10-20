import React, {useState} from "react";
import {ChevronDown, ChevronUp} from 'lucide-react'


export default function Accordion({header, content}) {
    const [showContent, setShowContent] = useState(false);

    function handleClick() {
        setShowContent(!showContent);
    }

    const regionId = `accordion-${header?.toString().replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <div className="w-full border-b">
            <button
                type="button"
                aria-expanded={showContent}
                aria-controls={regionId}
                onClick={handleClick}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 focus:outline-none"
            >
                <span className="font-medium">{header}</span>
                <span className="ml-4 flex-shrink-0">
                    {showContent ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
            </button>

            <div
                id={regionId}
                role="region"
                aria-labelledby={regionId}
                className={`${showContent ? 'block' : 'hidden'} px-4 pb-3`}
            >
                <p className="text-sm text-gray-700 pt-2">
                    {content}
                </p>
            </div>
        </div>
    );
}