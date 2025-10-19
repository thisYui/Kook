import React, { useState } from "react";
import Label from "../components/Label.jsx"
import { useTranslation } from 'react-i18next';
import "../i18n.jsx"
import PasswordLabel from "../components/PasswordLabel.jsx";
import Button from "../components/Button.jsx";
import loginBg from "../assets/login_bg.jpg";

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

    if (Object.keys(currentErrors).length > 0) {
      return; 
    }
    
    // Login Function
    console.log("Đăng nhập thành công! Dữ liệu:", formData);
  };

  return (
    <div className="flex w-screen h-screen relative"> 

      <div className="w-full hidden lg:block">
        <img src={loginBg} alt="Background" className="w-full h-full object-containt"/>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-2/5 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl">
          <h2 className="text-3xl text-center font-bold mb-8">{t("login.title")}</h2>
          
          <Label
            label={t("login.email")}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("login.emailPlaceholder")}
            className="w-full flex flex-col my-4"
            required
            error={errors.email} 
          />

          <PasswordLabel
            label={t("login.password")}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("login.passwordPlaceholder")}
            className="w-full flex flex-col mb-4" 
            required
            error={errors.password} 
          />
          
          <Label 
            label={t("login.remember")}
            name="remember"
            type="checkbox"
            checked={formData.remember} 
            onChange={handleChange}
            placeholder=""
            className="flex justify-end flex-row-reverse my-3"
          />

          <Button 
            name={t("login.submit")} 
            type="submit"
            className="w-full py-3 mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full text-lg transition duration-200"
          />
          
          {errors.general && (
            <p className="mt-3 text-sm text-red-600 text-center">{errors.general}</p>
          )}

          <p className="ml-5 mt-3">{t("login.noAccount")}<a href="/register" className="pl-2 text-blue-400 underline">{t("signup.title")}</a></p>
        </form>
      </div>
    </div>
  );
}