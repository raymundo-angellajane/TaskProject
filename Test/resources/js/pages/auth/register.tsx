import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout
            title="Create your Tickora account"
            description="Enter your details below to get started"
        >
            <Head title="Register" />

            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            {/* Full Name */}
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    placeholder="Enter your full name"
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    placeholder="Enter your email address"
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    placeholder="Enter your password"
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            {/* Confirm Password */}
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password_confirmation"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    placeholder="Re-enter your password"
                                />
                                <InputError message={errors.password_confirmation} className="mt-1" />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="mt-2 w-full bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white rounded-md py-2"
                                tabIndex={5}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                Create Account
                            </Button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-2 text-gray-400 text-sm">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Footer */}
                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <TextLink
                                href={login()}
                                className="text-[#0D6EFD] hover:underline"
                                tabIndex={6}
                            >
                                Sign in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
