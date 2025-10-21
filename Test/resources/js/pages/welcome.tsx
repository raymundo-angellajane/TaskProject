import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0D6EFD" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h6l6 6v10a2 2 0 01-2 2z" />
                </svg>
            ),
            title: 'Task Organization',
            description: 'Categorize, prioritize, and group your tasks to stay focused and productive.',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0D6EFD" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Smart Reminders',
            description: 'Never miss a deadline again with intelligent reminders and recurring tasks.',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0D6EFD" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13m-7 6h7M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
            ),
            title: 'List Management',
            description: 'Create, reorder, and track multiple lists seamlessly across your workspace.',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0D6EFD" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 21l-2.25-2.25M16.5 3a4.5 4.5 0 010 9H7.5a4.5 4.5 0 010-9h9z" />
                </svg>
            ),
            title: 'Collaboration',
            description: 'Share lists, assign tasks, and work together effortlessly with teammates.',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0D6EFD" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927C11.341 2.38 11.927 2 12.618 2h8.764c.691 0 1.277.38 1.569.927l.557 1.046a2 2 0 01-.524 2.5L13.9 14.046a2 2 0 01-2.8 0L3.016 6.473a2 2 0 01-.524-2.5l.557-1.046A2 2 0 013.618 2h8.764a2 2 0 01.667.927z" />
                </svg>
            ),
            title: 'Progress Tracking',
            description: 'Visualize your task completion and stay motivated with real-time insights.',
        },
    ];

    return (
        <>
            <Head title="Welcome to Tickora">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col scroll-smooth text-[#1b1b18] dark:text-[#EDEDEC]">
                {/* Sticky Navbar */}
                <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-white/80 px-6 py-4 backdrop-blur-md shadow-md dark:bg-[#121212]/80">
                    <div className="flex items-center gap-2">
                        <img
                            src="/Tickora-logo.png"
                            alt="Tickora Logo"
                            className="h-8 w-8 object-contain"
                        />
                        <span className="text- font-semibold text-[#0D6EFD] dark:text-[#4CC9F0]">Tickora</span>
                    </div>

                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <a href="#features" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">Features</a>
                        <a href="#about" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">About</a>
                        <a href="#contact" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">Contact</a>

                        {auth.user ? (
                            <Link href={dashboard()} className="rounded-full bg-gradient-to-r from-[#0D6EFD] to-[#4CC9F0] px-5 py-1.5 text-white shadow-md hover:opacity-90">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href={login()} className="rounded-full bg-gradient-to-r from-[#0D6EFD] to-[#4CC9F0] px-5 py-1.5 text-white shadow-md hover:opacity-90">
                                Login
                            </Link>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <section
                    id="hero"
                    className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 px-6 text-center text-white"
                >
                    {/* Floating Tickora Logo on the very right */}
                    <img
                        src="/Tickora-logo.png"
                        alt="Tickora Floating Logo"
                        className="absolute right-[-50px] bottom-20 h-100 w-100 opacity-25 animate-float-slow select-none pointer-events-none"
                    />

                    <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                        Organize Your Tasks with Tickora
                    </h1>
                    <p className="mb-8 max-w-2xl text-base font-light text-white/90 sm:text-lg">
                        Streamline your day with Tickora — the all-in-one task and list manager designed to help you stay productive, focused, and stress-free.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={register()}
                            className="rounded-full bg-white px-6 py-2 font-medium text-[#0D6EFD] shadow-md transition hover:bg-[#f0f0f0]"
                        >
                            Get Started
                        </Link>
                        <a
                            href="#features"
                            className="rounded-full border border-white px-6 py-2 font-medium text-white transition hover:bg-white/10"
                        >
                            Explore Features
                        </a>
                    </div>
                </section>


                {/* Features Section */}
                <section id="features" className="bg-[#F9FAFB] px-6 py-20 text-center dark:bg-[#111]">
                    <h2 className="mb-12 text-3xl font-bold text-[#0D6EFD] dark:text-[#4CC9F0]">Key Features</h2>
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div key={index} className="rounded-2xl bg-white p-6 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:bg-[#1a1a1a]">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF4FF] shadow-sm dark:bg-[#222]">{feature.icon}</div>
                                <h3 className="mb-2 text-lg font-semibold text-[#0D6EFD] dark:text-[#4CC9F0]">{feature.title}</h3>
                                <p className="text-sm text-[#4b4b4b] dark:text-[#A1A09A]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="bg-white px-8 py-20 text-left dark:bg-[#121212]">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="mb-4 text-2xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">About Tickora</h2>
                        <p className="text-[#4b4b4b] dark:text-[#A1A09A] leading-relaxed">
                            Tickora is a web-based productivity system designed to help individuals and teams organize tasks, manage projects, and track progress — all in one streamlined platform. 
                            Instead of relying on sticky notes or scattered apps, Tickora provides dashboards, list management tools, and progress reports that make it easier to plan, focus, and achieve your goals efficiently.
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="bg-[#F9FAFB] px-8 py-20 text-left dark:bg-[#111]">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="mb-4 text-2xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">Contact</h2>
                        <p className="text-[#4b4b4b] dark:text-[#A1A09A]">
                            Have feedback or questions? Reach us at{' '}
                            <a href="mailto:support@tickora.app" className="text-[#0D6EFD] hover:underline dark:text-[#4CC9F0]">
                                support@tickora.app
                            </a>.
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#EAF4FF] dark:bg-[#0A192F] py-12 text-[#1b1b18] dark:text-[#EDEDEC]">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-4 lg:text-left">
                        {/* Logo + About */}
                        <div className="flex flex-col items-center lg:items-start">
                            <div className="flex items-center gap-2 mb-3">
                                <img src="/Tickora-logo.png" alt="Tickora Logo" className="h-8 w-8 object-contain" />
                                <h3 className="text-2xl font-bold tracking-tight text-[#0D6EFD] dark:text-[#4CC9F0]">Tickora</h3>
                            </div>
                            <p className="text-sm text-[#1b1b18]/70 dark:text-[#A1A09A] max-w-xs">
                                Making task and list management simple, organized, and data-driven.
                            </p>
                        </div>


                        <div>
                            <h4 className="mb-3 text-base font-semibold text-[#0D6EFD] dark:text-[#4CC9F0]">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#features" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">Features</a></li>
                                <li><a href="#about" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">About</a></li>
                                <li><a href="#contact" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">Contact</a></li>
                                <li><a href="/register" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">Get Started</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="mb-3 text-base font-semibold text-[#0D6EFD] dark:text-[#4CC9F0]">Support</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="mailto:support@tickora.app" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">Help Center</a></li>
                                <li><a href="#" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">FAQs</a></li>
                                <li><a href="#" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">Terms of Service</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="mb-3 text-base font-semibold text-[#0D6EFD] dark:text-[#4CC9F0]">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li>Email: <a href="mailto:support@tickora.app" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">support@tickora.app</a></li>
                                <li>Phone: <a href="tel:+1234567890" className="hover:text-[#0D6EFD] dark:hover:text-[#4CC9F0]">+1 (234) 567-890</a></li>
                                <li>Location: <span>New York, USA</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[#d1e3ff] dark:border-[#1a2b45] pt-4 text-center text-xs text-[#1b1b18]/60 dark:text-[#A1A09A]">
                        © {new Date().getFullYear()} Tickora — Task & List Manager. Built with Laravel & Inertia.
                    </div>
                </footer>
            </div>
        </>
    );
}
