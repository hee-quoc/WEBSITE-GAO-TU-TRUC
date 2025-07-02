// src/app/about/page.tsx
import Image from 'next/image';
export default function AboutPage() {
    return (
        <section className="relative min-h-screen bg-white overflow-hidden">
            <div>
                <div className="relative w-full h-full min-h-screen inset-0">
                    <Image
                        src="/about_background.svg"
                        alt={`about Background`}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
}