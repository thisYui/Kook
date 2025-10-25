import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Popup from "../Popup";
import Button from "../Button";
import PasswordLabel from "../PasswordLabel";

export default function ChangePasswordPopup({ isOpen, onClose, size, onSubmit }) {
    const { t } = useTranslation();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!newPassword || !confirmPassword) {
        setError(t("changePassword.required"));
        return;
        }
        if (newPassword.length < 6) {
        setError(t("changePassword.tooShort"));
        return;
        }
        if (newPassword !== confirmPassword) {
        setError(t("changePassword.mismatch"));
        return;
        }

        setLoading(true);
        try {
        if (typeof onSubmit === "function") {
            await onSubmit(newPassword);
        }
        setSuccess(t("changePassword.success"));
        resetForm();
        setTimeout(() => {
            setSuccess("");
            onClose && onClose();
        }, 1200);
        } catch {
        setError(t("changePassword.error"));
        } finally {
        setLoading(false);
        }
    };

    return (
        <Popup
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        title={t("settings.account.changePassword")}
        showCloseButton={false}
        >
        <form onSubmit={handleSubmit} className="space-y-4 px-2 py-2">
            <PasswordLabel
            label={t("changePassword.newPassword")}
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            />
            <PasswordLabel
            label={t("changePassword.confirmPassword")}
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}

            <div className="flex gap-2 justify-end pt-2">
            <Button
                type="button"
                name={t("changePassword.cancel")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={onClose}
                disabled={loading}
            />
            <Button
                type="submit"
                name={loading ? t("changePassword.saving") : t("changePassword.save")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                disabled={loading}
            />
            </div>
        </form>
        </Popup>
    );
}
