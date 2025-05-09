import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

export default function SignupForm() {
    const navigate = useNavigate();

    // State for input errors
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = (name, email, password) => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required.";
        } else if (name.length < 3) {
            newErrors.name = "Name must be at least 3 characters.";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!validate(name, email, password)) return;
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("🎉 Registered successfully!");
                navigate("/login");
                e.target.reset();
            } else {
                alert(`❌ Error: ${data.msg}`);
            }
        } catch (err) {
            alert("Something went wrong. Please try again.");
            console.error(err);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 5000); // prevent multiple submits for 5 seconds

    };
    const debouncedSignup = useCallback(debounce(handleSubmit, 1000), []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
            <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-md p-8 shadow-2xl border border-white/10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Create your account</h2>
                    <p className="text-sm text-gray-300 mt-1">
                        Join the community — it's free!
                    </p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()} noValidate>
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            className="w-full rounded-xl border border-gray-600 bg-white/5 text-white placeholder-gray-400 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-1">{errors.name}</p>

                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="w-full rounded-xl border border-gray-600 bg-white/5 text-white placeholder-gray-400 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-gray-600 bg-white/5 text-white placeholder-gray-400 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={debouncedSignup}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2 rounded-xl transition-all duration-200 shadow-lg"
                    >
                        Sign Up
                    </button>



                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-400 hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}
