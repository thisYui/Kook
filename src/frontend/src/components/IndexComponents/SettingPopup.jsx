import React from "react";
import { Moon, Globe } from "lucide-react";
import Popup from "../Popup";
import Label from "../Label";
import Button from "../Button";
import { usersApi } from "../../api/users";
import useUser from "../../hooks/useUser";

export default function SettingPopup({ isOpen, onClose, size }) {
    const { theme, language, updateTheme, updateLanguage } = useUser();
    // console.log("theme:", theme, " - lang: ", language);

    const handleThemeChange = async (e) => {
        const newTheme = e.target.value;
        // console.log('New theme: ', newTheme)
        try {
        await usersApi.changeTheme(newTheme);
        updateTheme(newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else if (newTheme === "light") {
            document.documentElement.classList.remove("dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.classList.toggle("dark", prefersDark);
        }
        } catch (error) {
        console.error("Lỗi khi đổi theme:", error);
        }
    };

    const handleLanguageChange = async (e) => {
        const newLang = e.target.value;
        // console.log('New lang: ', newLang)
        try {
        await usersApi.changeLanguage(newLang);
        updateLanguage(newLang);

        console.log(`Đã đổi ngôn ngữ sang ${newLang}`);
        } catch (error) {
        console.error("Lỗi khi đổi ngôn ngữ:", error);
        }
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose} title="Cài đặt" size={size}>
            <div className="border-b px-5 pt-4 pb-4 mb-4">
                <div className="flex items-center mb-2">
                <Moon className="w-5 h-5 mr-2" />
                <h2 className="text-lg font-semibold">Chế độ tối</h2>
                </div>

                <div className="space-y-2">
                {[
                    { value: "light", label: "Tắt" },
                    { value: "dark", label: "Bật" },
                    { value: "auto", label: "Tự động" }
                ].map((item) => (
                    <label
                    key={item.value}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
                    >
                    <span>{item.label}</span>
                    <Label
                        type="radio"
                        name="theme"
                        value={item.value}
                        onChange={handleThemeChange}
                        checked={theme === item.value}
                        className="m-0"
                    />
                    </label>
                ))}
                </div>
            </div>

            <div className="px-5 pt-4 pb-4 border-b">
                <div className="flex items-center mb-2">
                <Globe className="w-5 h-5 mr-2" />
                <h2 className="text-lg font-semibold">Ngôn ngữ</h2>
                </div>

                <div className="space-y-2">
                {[
                    { value: "vi", label: "Tiếng Việt" },
                    { value: "en", label: "English" },
                ].map((item) => (
                    <label
                    key={item.value}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
                    >
                    <span>{item.label}</span>
                    <Label
                        type="radio"
                        name="language"
                        value={item.value}
                        onChange={handleLanguageChange}
                        checked={language === item.value}
                        className="m-0"
                    />
                    </label>
                ))}
                </div>
            </div>

            <div className="">
                <Button name="Change Password" className="border-t border-b w-full p-4 hover:bg-gray-100 dark:hover:bg-gray-800"></Button>
            </div>
            <div className="">
                <Button name="Lock Account" className="border-t border-b w-full p-4 hover:bg-gray-100 dark:hover:bg-gray-800"></Button>
            </div>
            <div className="">
                <Button name="Delete Account" className="border-t border-b w-full p-4 hover:bg-gray-100 dark:hover:bg-gray-800"></Button>
            </div>
        </Popup>
    );
}
