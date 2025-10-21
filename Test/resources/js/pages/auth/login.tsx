import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { register } from '@/routes';
import { request } from '@/routes/password';

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4CC9F0] via-[#4361EE] to-[#3A0CA3] p-6">
      <Head title="Log in" />
      <div className="w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 md:p-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/Tickora-logo.png"
            alt="Tickora Logo"
            className="h-10 w-10 object-contain mb-2"
          />
          <h1 className="text-3xl font-bold text-[#0D6EFD] dark:text-[#4CC9F0]">
            Tickora
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        {status && (
          <div className="mb-4 text-center text-sm font-medium text-green-600 dark:text-green-400">
            {status}
          </div>
        )}

        <Form
          {...AuthenticatedSessionController.store.form()}
          resetOnSuccess={['password']}
          className="space-y-6"
        >
          {({ processing, errors }) => (
            <>
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  placeholder="Enter your email address"
                />
                <InputError message={errors.email} />
              </div>

              {/* Password */}
                <div className="space-y-2">
                <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Password
                </Label>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    tabIndex={2}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                />
                <div className="flex justify-end">
                    {canResetPassword && (
                    <TextLink
                        href={request()}
                        className="text-sm text-[#0D6EFD] hover:underline dark:text-[#4CC9F0]"
                        tabIndex={5}
                    >
                        Forgot your password?
                    </TextLink>
                    )}
                </div>
                <InputError message={errors.password} />
                </div>


              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" name="remember" tabIndex={3} />
                <Label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white py-2.5 rounded-lg transition-all duration-150"
                tabIndex={4}
                disabled={processing}
              >
                {processing ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-[#1a1a1a] px-2 text-gray-500">
                    or
                  </span>
                </div>
              </div>

              {/* Signup */}
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don’t have an account?{' '}
                <TextLink
                  href={register()}
                  tabIndex={5}
                  className="font-semibold text-[#0D6EFD] hover:underline dark:text-[#4CC9F0]"
                >
                  Sign up
                </TextLink>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
