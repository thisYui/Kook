import React, { useState } from "react";
import { Moon, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import Popup from "../Popup";
import Label from "../Label";
import Button from "../Button";
import { usersApi } from "../../api/users";
import useUser from "../../hooks/useUser";
import Accordion from "../Accordion";

import ChangePasswordPopup from "./ChangePasswordPopup";

export default function SettingPopup({ isOpen, onClose, size }) {

    const { t } = useTranslation();
    const { theme, language, updateTheme, updateLanguage } = useUser();

    const [showPasswordPopup, setShowPasswordPopup] = useState(false);

    const handleThemeChange = async (e) => {
        const newTheme = e.target.value;
        try {
            // Call API to persist the change
            await usersApi.changeTheme(newTheme);
            
            // Update local state via hook
            updateTheme(newTheme);
            
            // Apply the theme change immediately to UI
            const { applyTheme } = await import('../../utils/settingUtils');
            applyTheme(newTheme);
        } catch (error) {
            console.error("Error changing theme:", error);
        }
    };

    const handleLanguageChange = async (e) => {
        const newLang = e.target.value;
        try {
            // Call API to persist the change
            await usersApi.changeLanguage(newLang);
            
            // Update local state via hook
            updateLanguage(newLang);
            
            // Apply the language change immediately to UI
            const { applyLanguage } = await import('../../utils/settingUtils');
            applyLanguage(newLang);
        } catch (error) {
            console.error("Error changing language:", error);
        }
    };

    const handlePasswordChange = async (newPassword) => {
        try {
            await usersApi.resetPassword(newPassword);
            console.log("Change Password successfully!");
        } catch (error) {
            console.error("Error changing password: ", error);
        }
    }

    return (
        <Popup isOpen={isOpen} onClose={onClose} title={t('settings.title')} size={size}>
            {/* --- Theme --- */}
            <Accordion header={
                <div className="flex flex-row gap-4">
                    <Moon /> {t('settings.theme.title')}
                </div>
            }>
            {[
                { value: "light", translationKey: "theme.light" },
                { value: "dark", translationKey: "theme.dark" },
                { value: "system", translationKey: "theme.system" }
            ].map((item) => (
                <label key={item.value} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition">
                <span>{t(`settings.${item.translationKey}`)}</span>
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
            </Accordion>

            {/* --- Language --- */}
            <Accordion header={
                <div className="flex flex-row gap-4">
                    <Globe /> {t('settings.language.title')}
                </div>
            }>
            {[
                { value: "vi", translationKey: "language.vi" },
                { value: "en", translationKey: "language.en" },
            ].map((item) => (
                <label key={item.value} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition">
                <span>{t(`settings.${item.translationKey}`)}</span>
                <Label
                    type="radio"
                    name="language"
                    value={item.value}
                    onChange={handleLanguageChange}
                    checked={language === item.value}
                    className=""
                />
                </label>
            ))}
        </Accordion>

            <div className="">
                <Button
                name={t('settings.account.changePassword')}
                className="border-t border-b w-full p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setShowPasswordPopup(true)}
                ></Button>
            </div>
            <div className="">
                <Button
                name={t('settings.account.lockAccount')}
                className="border-t border-b w-full p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
                ></Button>
            </div>
            <div className="">
                <Button
                name={t('settings.account.deleteAccount')}
                className="border-t border-b w-full p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
                ></Button>
            </div>
            <ChangePasswordPopup isOpen={showPasswordPopup} onClose={() => setShowPasswordPopup(false)} onSubmit={handlePasswordChange}/>
        </Popup>
        
    );
}
