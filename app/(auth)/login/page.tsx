'use client';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { LoginInput, loginSchema } from '@/services/auth/auth.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/features/auth/auth.hooks';
import Link from 'next/link'

export default function Login() {
  const loginMutation = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginInput) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <div className='w-full max-w-md p-4 mx-auto bg-white rounded-lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>
              <div className='text-xl'>Login</div>
            </FieldLegend>
            <FieldDescription>
              Login to manage your todo&apos;s list{' '}
            </FieldDescription>
            <FieldGroup className='gap-5'>
              <Field className='gap-1'>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  {...register('email')}
                  className='p-2 transition border-gray-300 shadow-2xl ring rounded-xl ring-transparent shadow-transparent focus:ring-blue-500 focus:shadow-gray-700 focus:scale-105'
                  id='email'
                  placeholder='JonDoe@example.com'
                />
                {errors.email && (
                  <small className='text-rose-500'>
                    {errors.email.message}
                  </small>
                )}
              </Field>
              <Field className='gap-1'>
                <FieldLabel htmlFor='password'>Password</FieldLabel>
                <Input
                  type='password'
                  {...register('password')}
                  className='p-2 transition border-gray-300 shadow-2xl ring rounded-xl ring-transparent shadow-transparent focus:ring-blue-500 focus:shadow-gray-700 focus:scale-105'
                  id='password'
                />
                {errors.password && (
                  <small className='text-rose-500'>
                    {errors.password.message}
                  </small>
                )}
              </Field>
              <FieldSeparator />
              {loginMutation.isError && (
                <p className='text-sm text-rose-500'>
                  {loginMutation.error.message}
                </p>
              )}
              <Field>
                <Button
                  type='submit'
                  disabled={loginMutation.isPending}
                  className='bg-sky-700 rounded-xl hover:bg-sky-800'
                >
                  {loginMutation.isPending ? 'Logging in...' : 'Enter Todo'}
                </Button>
              </Field>
            </FieldGroup>
            <p className='text-xs text-center'>
              Don&apos;t have an account?{' '}
              <Link href={'/signup'} className='text-blue-500 font-semibold underline'>
                Signup
              </Link>
            </p>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
