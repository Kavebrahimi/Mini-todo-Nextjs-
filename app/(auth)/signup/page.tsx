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
import {
  SignupInput,
  signupSchema,
} from '@/services/auth/auth.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSignup } from '@/features/auth/auth.hooks';
import Link from 'next/link';
export default function Signup() {
  const router = useRouter();
  const signupMutation = useSignup();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      workSpaceName: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (values: SignupInput) => {
    signupMutation.mutate(values, {
      onSuccess: () => router.push('/'),
    });
  };

  return (
    <div className='w-full max-w-md p-4 mx-auto bg-white rounded-lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>
              <div className='text-xl'>Signup</div>
            </FieldLegend>
            <FieldDescription>
              Signup to start listing your todo&apos;
            </FieldDescription>
            <FieldGroup className='gap-5'>
              <Field className='gap-1'>
                <FieldLabel htmlFor='name'>Name</FieldLabel>
                <Input
                  {...register('name')}
                  className='p-2 transition border-gray-300 shadow-2xl ring rounded-xl ring-transparent shadow-transparent focus:ring-blue-500 focus:shadow-gray-700 focus:scale-105'
                  id='name'
                  placeholder='Jon Doe'
                />
                {errors.name && (
                  <small className='text-rose-500'>{errors.name.message}</small>
                )}
              </Field>
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
              <Field className='gap-1'>
                <FieldLabel htmlFor='workSpaceName'>Workspace name</FieldLabel>
                <Input
                  {...register('workSpaceName')}
                  className='p-2 transition border-gray-300 shadow-2xl ring rounded-xl ring-transparent shadow-transparent focus:ring-blue-500 focus:shadow-gray-700 focus:scale-105'
                  id='workSpaceName'
                  placeholder={`Jon's Workspace`}
                />
                {errors.workSpaceName && (
                  <small className='text-rose-500'>
                    {errors.workSpaceName.message}
                  </small>
                )}
              </Field>
              <FieldSeparator />
              {signupMutation.isError && (
                <p className='text-sm text-rose-500'>
                  {signupMutation.error.message}
                </p>
              )}
              <Field>
                <Button
                  type='submit'
                  disabled={signupMutation.isPending}
                  className='bg-sky-700 rounded-xl hover:bg-sky-800'
                >
                  {signupMutation.isPending ? 'Signing up...' : 'Submit'}
                </Button>
              </Field>
            </FieldGroup>
            <p className='text-xs text-center'>
              Already have an account?{' '}
              <Link
                href={'/login'}
                className='text-blue-500 font-semibold underline'
              >
                Login
              </Link>
            </p>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
