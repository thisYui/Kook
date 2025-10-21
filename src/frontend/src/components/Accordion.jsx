import React, {useState} from "react";
import {ChevronDown, ChevronUp} from 'lucide-react'


export default function Accordion({header, content}) {
    const [showContent, setShowContent] = useState(false);

    function handleClick() {
        setShowContent(!showContent);
    }

    // Đảm bảo ID an toàn cho DOM
    const regionId = `accordion-${header?.toString().replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <div className="w-full border-b">
            <button
                type="button"
                aria-expanded={showContent}
                aria-controls={regionId}
                onClick={handleClick}
                // Mặc định (mobile): padding nhỏ hơn (px-3 py-3)
                // sm: (màn hình lớn hơn): padding lớn hơn (sm:px-4 sm:py-4)
                className="w-full flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 text-left hover:bg-gray-50 focus:outline-none"
            >
                {/* Văn bản nhỏ hơn trên mobile (text-sm) */}
                <span className="font-medium text-sm sm:text-base">{header}</span>
                {/* Khoảng cách và kích thước icon nhỏ hơn trên mobile */}
                <span className="ml-2 sm:ml-4 flex-shrink-0">
                    {showContent 
                        ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> 
                        : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    }
                </span>
            </button>

            <div
                id={regionId}
                role="region"
                aria-labelledby={regionId}
                // Điều chỉnh padding ngang cho mobile (px-3)
                className={`${showContent ? 'block' : 'hidden'} px-3 sm:px-4 pb-3`}
            >
                {/* Nội dung nhỏ hơn trên mobile (text-xs) */}
                <p className="text-xs sm:text-sm text-gray-700 pt-2">
                    {content}
                </p>
            </div>
        </div>
    );
}