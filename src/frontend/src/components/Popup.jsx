import React from "react";
import { X } from 'lucide-react'
import Button from "./Button";
const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
};

export default function Popup({
    children, 
    isOpen = false, 
    onClose,
    title,
    size = "md",
    className,
    closeOnOverlayClick = true,
    showCloseButton = true

    }) {
    
    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = () => {
        if (closeOnOverlayClick) {
            onClose();
        }
    };

    const popupSize = sizeClasses[size] || sizeClasses.md;

    return (
        // Lớp phủ (Overlay)
        // fixed: toàn màn hình
        // inset-0: top/right/bottom/left = 0
        // bg-black/50: màu đen với độ mờ 50%
        // z-40: nằm bên dưới popup
        // flex items-center justify-center: căn giữa popup
        <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={handleOverlayClick}
        >
        {/* Hộp thoại Popup */}
        {/* relative: để nút 'X' có thể định vị tuyệt đối
            bg-white: nền trắng
            rounded-lg: bo góc
            shadow-xl: đổ bóng
            z-50: nằm trên lớp phủ
            onClick: ngăn sự kiện click lan ra lớp phủ (để không bị đóng khi click vào popup)
        */}
            <div
                className={`relative z-50 w-full rounded-lg bg-white shadow-xl overflow-hidden ${popupSize} ${className}`}
                onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click từ popup lan ra overlay
            >
                {/* Phần Header (Tiêu đề và Nút đóng) */}
                <div className="relative flex border-b p-3">
                {title && (
                    <h3 className="text-xl font-semibold mx-auto">{title}</h3>
                )}
                {showCloseButton && (
                    <Button name={
                        <div>
                            <X/>
                        </div>
                    } onClick={onClose} className="absolute right-5"/>
                )}
                </div>

                {/* Phần Content (Nội dung chính) */}
                <div className="flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
}