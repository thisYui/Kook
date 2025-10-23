import React, { useState } from "react";
import Label from "../components/Label";
import PasswordLabel from "../components/PasswordLabel";
import Button from "../components/Button";
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18n.jsx'


export default function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setFormError(t("signup.emptyFields"));
      return;
    }
    if (form.password !== form.confirmPassword) {
      setFormError(t("signup.passwordMismatch"));
      return;
    }

    navigate('/confirm-otp');
  };

  return (
    <>
      <h1 className="text-2xl mb-6 text-center">{t("signup.title")}</h1>

      {formError && <p className="mb-4 text-sm text-red-600">{formError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Label
          label={t("signup.username")}
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder={t("signup.username")}
          className="w-full flex flex-col"
          required
        />

        <Label
          label={t("signup.email")}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t("signup.email")}
          className="w-full flex flex-col"
          required
        />

        <PasswordLabel
          label={t("signup.password")}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={t("signup.password")}
          required
        />

        <PasswordLabel
          label={t("signup.confirmPassword")}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder={t("signup.confirmPassword")}
          required
        />

        <Button
          type="submit"
          name={t("signup.submit")}
          className="w-full bg-blue-600 text-white py-2 rounded-full"
        />

        <p className="text-center">
          {t("signup.haveAccount")}
          <Link to="/login" className="pl-2 text-blue-400 underline">
            {t("login.title")}
          </Link>
        </p>
      </form>
    </>
  );
}

