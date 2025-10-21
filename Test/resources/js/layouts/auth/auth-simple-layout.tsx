import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#4facfe] to-[#3f51b1] p-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                <div className="flex flex-col items-center gap-3 mb-6">
                    <Link href={home()} className="flex flex-col items-center">
                        <div className="flex h-16 w-16 items-center justify-center">
                            <img
                                src="/Tickora-logo.png"
                                alt="Tickora Logo"
                                className="h-14 w-14 object-contain"
                            />
                        </div>
                        <h1 className="mt-2 text-2xl font-semibold text-blue-600">{title}</h1>
                        <p className="text-sm text-gray-500">{description}</p>
                    </Link>
                </div>

                <div className="space-y-4">{children}</div>
            </div>
        </div>
    );
}
