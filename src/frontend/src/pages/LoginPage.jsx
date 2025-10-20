import React, { useState } from "react";
import Label from "../components/Label.jsx"
import PasswordLabel from "../components/PasswordLabel.jsx";
import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../i18n.jsx'


export default function LoginPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let currentErrors = {};

    if (!formData.email) {
      currentErrors.email = t("login.emailRequired");
    }
    if (!formData.password) {
      currentErrors.password = t("login.passwordRequired");
    }

    setErrors(currentErrors);
    if (Object.keys(currentErrors).length > 0) return;

    console.log("Login successful! Data:", formData);
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-8">{t("login.title")}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Label
          label={t("login.email")}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("login.emailPlaceholder")}
          className="w-full flex flex-col"
          required
          error={errors.email}
        />

        <PasswordLabel
          label={t("login.password")}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={t("login.passwordPlaceholder")}
          className="w-full flex flex-col"
          required
          error={errors.password}
        />

        <Label
          label={t("login.remember")}
          name="remember"
          type="checkbox"
          checked={formData.remember}
          onChange={handleChange}
          className="flex justify-end flex-row-reverse"
        />

        <Button
          name={t("login.submit")}
          type="submit"
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full text-lg transition duration-200"
        />

        {errors.general && (
          <p className="text-sm text-red-600 text-center">{errors.general}</p>
        )}

        <p className="text-center">
          {t("login.noAccount")}
          <Link to="/signup" className="pl-2 text-blue-400 underline">
            {t("signup.title")}
          </Link>
        </p>
      </form>
    </>
  );
}