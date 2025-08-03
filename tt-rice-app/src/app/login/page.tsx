"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { signIn } from "next-auth/react"; 
import React, { useState } from 'react';

import Button from "~/app/_components/ui/Button";
import Input from "~/app/_components/ui/Input";
import type { LoginFormData } from "~/app/types/Types";

export default function ContactSection() {
    const router = useRouter(); 
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); 

        try {
            const result = await signIn('credentials', {
                username: formData.username,
                password: formData.password,
                redirect: false, 
            });

            if (result?.error) {
                setError("Tên đăng nhập hoặc mật khẩu không chính xác."); 
                setIsLoading(false);
            } else if (result?.ok) {
                router.push('/products'); 
            }
        } catch (err) {
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
                                name="username" 
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
                            {error && (
                                <p className="text-sm text-red-600">{error}</p>
                            )}
                            
                            <div className="pt-4">
                                <Button
                                  type="submit" 
                                  size="large"
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
                                    {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                                    <Image
                                        src="/icon_wheat_white.svg"
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