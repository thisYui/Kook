import React, { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import { useTranslation } from 'react-i18next';
import '../i18n.jsx'

export default function OTPVerificationPage() { 

    const { t } = useTranslation();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (timer > 0) {
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
        } else {
        setCanResend(true);
        }
    }, [timer]);

    // Giữ nguyên logic handleChange vì nó đã kiểm tra và chỉ chấp nhận số
    const handleChange = (index, value) => {
        // Đảm bảo chỉ cho phép ký tự số hoặc chuỗi rỗng (khi xóa)
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
        }
    };

    const handleFocus = (index, e) => {
        e.target.select();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        // Allow numeric input from both keyboard rows
        if (/^\d$/.test(e.key)) {
            return; // Allow the digit to be processed normally
        }
        // Prevent non-numeric characters (except Backspace, Tab, Arrow keys)
        if (e.key !== "Backspace" && e.key !== "Tab" && !e.key.startsWith("Arrow")) {
            e.preventDefault();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, '').slice(0, 6); // Loại bỏ ký tự không phải số
        if (!pastedData) return; // Nếu dữ liệu dán vào không có số nào thì dừng

        const newOtp = [...otp];
        pastedData.split("").forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);

        const lastIndex = Math.min(pastedData.length - 1, 5); // Focus vào ô cuối cùng được điền
        inputRefs.current[lastIndex]?.focus();
    };

    const handleSubmit = async () => {
        setError("");

        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
        setError(t("otp.incomplete"));
        return;
        }

    setSubmitting(true);
    try {
      // TODO: Replace with real API endpoint
      // const res = await fetch("/api/verify-otp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: sessionStorage.getItem("signupEmail"),
      //     otp: otpCode,
      //   }),
      // });
      // 
      // if (!res.ok) {
      //   const data = await res.json().catch(() => ({}));
      //   setError(data.message || "Verification failed");
      //   return;
      // }
      // 
      // console.log("OTP verified successfully");
      // window.location.href = "/login";

        console.log("OTP submitted:", otpCode);
        } catch (err) {
        setError(t("otp.networkError"));
        } finally {
        setSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        setError("");
        setTimer(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();

        try {
        // TODO: Replace with real API endpoint
        // const res = await fetch("/api/resend-otp", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     email: sessionStorage.getItem("signupEmail"),
        //   }),
        // });
        // 
        // if (!res.ok) {
        //   const data = await res.json().catch(() => ({}));
        //   setError(data.message || "Resend failed");
        //   return;
        // }

        console.log("OTP resent");
        } catch (err) {
        setError(t("otp.networkError"));
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-8 rounded-lg shadow">
            <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-2">{t("otp.title")}</h1>
            <p className="text-gray-600 text-sm">
                {t("otp.description")}
                <br />
                <span className="font-medium">example@email.com</span>
            </p>
            </div>

            <div>
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"  // Changed from [0-9]* to \d*
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    onFocus={(e) => handleFocus(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    autoFocus={index === 0}
                />
                ))}
            </div>

            <Button
                type="button"
                name={submitting ? t("otp.verifying") : t("otp.verify")}
                className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={submitting || otp.join("").length !== 6}
            />

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-2">
                {t("otp.didntReceive")}
                </p>
                {canResend ? (
                <button
                    type="button"
                    onClick={handleResend}
                    className="text-blue-600 font-medium hover:underline"
                >
                    {t("otp.resend")}
                </button>
                ) : (
                <p className="text-gray-500 text-sm">
                    {t("otp.resendIn")} {timer}s
                </p>
                )}
            </div>

            <div className="mt-6 text-center">
                <a href="/login" className="text-sm text-gray-600 hover:text-blue-600">
                ← {t("otp.backToLogin")}
                </a>
            </div>
            </div>
        </div>
    );
}