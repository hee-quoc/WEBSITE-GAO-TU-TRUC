// Login.tsx

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // <-- New: for redirection
import { signIn } from "next-auth/react"; // <-- New: the magic function
import React, { useState } from 'react';

import Button from "~/app/_components/ui/Button";
import Input from "~/app/_components/ui/Input";
import type { LoginFormData } from "~/app/types/Types";

export default function ContactSection() {
    const router = useRouter(); // <-- New: get router instance
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
    });
    // --- New States for UI feedback ---
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // --- Updated handleSubmit function ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Clear previous errors

        try {
            const result = await signIn('credentials', {
                // The first argument is the "id" of the provider in auth.ts
                // The second argument is the credentials object
                username: formData.username,
                password: formData.password,
                redirect: false, // We handle redirection manually
            });

            if (result?.error) {
                // The error message comes from the "throw new Error(...)" in your authorize function
                setError("Tên đăng nhập hoặc mật khẩu không đúng."); // "Invalid credentials"
                setIsLoading(false);
            } else if (result?.ok) {
                // Login was successful
                // Redirect to a protected page, e.g., the dashboard
                router.push('/products'); 
                // You can also use router.refresh() to update server components
            }
        } catch (err) {
            // This catches network errors, etc.
            console.error(err);
            setError("Đã xảy ra lỗi. Vui lòng thử lại.");
            setIsLoading(false);
        }
    };

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold text-blue-dark mb-12 leading-tight">
                            Form đăng nhập
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Username"
                                name="username" // <-- FIX: Was "name", should be "username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />

                            {/* --- New: Error Message Display --- */}
                            {error && (
                                <p className="text-sm text-red-600">{error}</p>
                            )}
                            
                            <div className="pt-4">
                                <Button
                                  type="submit" // Good practice for form buttons
                                  size="large"
                                  // --- New: Disable button while loading ---
                                  disabled={isLoading}
                                  className="
                                    flex items-center gap-2 bg-green-normal 
                                    hover:scale-105
                                    hover:bg-green-normal
                                    transition-colors  
                                    duration-200 
                                    rounded-full
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                  "
                                >
                                    {/* --- New: Show loading text --- */}
                                    {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                                    <Image
                                        src="/Icon wheat.svg"
                                        alt="Wheat Icon"
                                        width={20}
                                        height={20}
                                    />
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="relative">
                        <div className="relative pt-40 pl-20">
                            <Image
                                src="/img_contact.svg"
                                alt="Contact Illustration"
                                width={789}
                                height={682}
                                className="w-full h-auto scale-150"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}