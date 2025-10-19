import React, { useState } from "react";
import Label from "../components/Label";
import PasswordLabel from "../components/PasswordLabel";
import Button from "../components/Button";
import loginBg from "../assets/login_bg.jpg";
import { useTranslation } from 'react-i18next';
import "../i18n.jsx"
import { useNavigate } from 'react-router-dom';


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
  const [submitting, setSubmitting] = useState(false);

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

    // setSubmitting(true);
    // try {
    //   // TODO: replace with real API endpoint
    //   const res = await fetch("/api/signup", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       username: form.username,
    //       email: form.email,
    //       password: form.password,
    //     }),
    //   });

    //   if (!res.ok) {
    //     const data = await res.json().catch(() => ({}));
    //     setFormError(data.message || "Signup failed.");
    //     return;
    //   }

    //   // success - handle as needed (redirect, show message, etc.)
    //   const data = await res.json().catch(() => ({}));
    //   console.log("Signup successful:", data);
    // } catch (err) {
    //   setFormError("Network error. Please try again.");
    // } finally {
    //   setSubmitting(false);
    // }
    navigate('/otp')
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      <img src={loginBg} alt="Background" className="w-full h-full object-containt"/>
      <form
        onSubmit={handleSubmit}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-8 rounded-lg shadow"
      >
        <h1 className="text-2xl mb-6 text-center">{t("signup.title")}</h1>
        
        <p className="ml-5">{t("signup.haveAccount")}<a href="/login" className="pl-2 text-blue-400 underline">{t("login.title")}</a></p>
        {
        formError && <p className="mb-4 text-sm text-red-600">{formError}</p>}

        <div className="space-y-4">
          <Label
            label={t("signup.username")}
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Choose a username"
            className="w-full flex flex-col my-4"
            required
          />

          <Label
            label={t("signup.email")}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full flex flex-col my-4"
            required
          />

          <PasswordLabel
            label={t("signup.password")}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          <PasswordLabel
            label={t("signup.confirmPassword")}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            required
          />
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            name={t("signup.submit")}
            className="w-full bg-blue-600 text-white py-2 rounded-full"
          />
        </div>
      </form>
    </div>
  );
}

