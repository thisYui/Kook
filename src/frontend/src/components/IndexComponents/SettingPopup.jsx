import React, { useState } from "react";
import Popup from "../Popup";
import Button from "../Button";
import Label from "../Label"
import { Moon, Sun } from "lucide-react";

export default function SettingPopup({ isOpen, onClose, size }) {
    const [isDark, setIsDark] = useState(false);

    const handleChangePassword = () => {
        alert("Đổi mật khẩu");
    };

    const handleChangeLanguage = () => {
        alert("Đổi ngôn ngữ");
    };

    const handleChangeTheme = () => {
        setIsDark((prev) => !prev);
        alert("Đã đổi theme!");
    };

    const handleLockAccount = () => {
        alert("Khóa tài khoản");
    };

    const handleDeleteAccount = () => {
        alert("Xóa tài khoản vĩnh viễn");
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose} title="Setting" size={size}>
        <Button
            name="Change Password"
            onClick={handleChangePassword}
            className="border py-3 text-lg"
        />
        <div className="border py-3 text-lg">
            Language
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition">
                <span>Tiếng Việt</span>
                <Label
                type="radio"
                name="language"
                value="vi"
                onChange={handleChangeLanguage}
                checked={language === "vi"}
                className="m-0"
                />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition">
                <span>English</span>
                <Label
                type="radio"
                name="language"
                value="en"
                onChange={handleChangeLanguage}
                checked={language === "en"}
                className="m-0"
                />
            </label>

        </div>

        {/* Nút Theme */}
        <button
            onClick={handleChangeTheme}
            className="relative flex items-center justify-center w-full border py-3 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
            {isDark ? (
            <>
                Dark Mode <Moon className="absolute right-20 w-5 h-5 ml-3" /> 
            </>
            ) : (
            <>
                Light Mode <Sun className="absolute right-20 w-5 h-5 ml-3" /> 
            </>
            )}
        </button>

        <Button
            name="Lock Account"
            onClick={handleLockAccount}
            className="border py-3 text-lg"
        />
        <Button
            name="Delete Account"
            onClick={handleDeleteAccount}
            className="border py-3 text-lg"
        />
        </Popup>
    );
}
