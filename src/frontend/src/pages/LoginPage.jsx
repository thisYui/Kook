import React, { useState } from "react";
import Label from "../components/Label.jsx"
import PasswordLabel from "../components/PasswordLabel.jsx";
import Button from "../components/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { authApi } from '../api/auth';
import authService from '../services/authService';
import '../i18n.jsx'


export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
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

    setIsLoading(true);
    setErrors({});

    try {
      // Call login API with rememberMe parameter
      const response = await authApi.login(
        formData.email,
        formData.password,
        formData.remember
      );

      if (response.success) {
        console.log("Login successful!", response);

        // Save authentication data using authService
        // Backend always returns token now (with different expiration times)
        if (response.token) {
          authService.setTokens(
            response.token,
            response.refresh_token,
            response.expires_in || 3600,
            formData.remember // rememberMe flag
          );
        }

        if (response.user) {
          authService.setUserData(response.user, formData.remember);
        }

        if (response.uid) {
          authService.setUserId(response.uid, formData.remember);
        }

        // Show appropriate message based on remember option
        if (formData.remember) {
          console.log("Token saved to localStorage - you will stay logged in");
        } else {
          console.log("Token saved to sessionStorage - you will be logged out when browser closes");
        }

        // Redirect to home page
        navigate('/');
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle error codes from backend
      const errorCode = error.response?.data?.error_code;
      const errorMessage = error.response?.data?.message;

      if (errorCode) {
        // Translate error code using i18n
        setErrors({ general: t(`errors.${errorCode}`, { defaultValue: errorMessage }) });
      } else {
        setErrors({ general: t("errors.AUTH_LOGIN_FAILED", { defaultValue: "Login failed" }) });
      }
    } finally {
      setIsLoading(false);
    }
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
          name={isLoading ? t("login.loading") : t("login.submit")}
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
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