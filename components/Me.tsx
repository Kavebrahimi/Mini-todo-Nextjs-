'use client';

import { useLogout, useMe } from '@/features/auth/auth.hooks';
import ButtonHover1 from './ButtonHover1';
import { Spinner } from './ui/spinner';
import { useRouter } from 'next/navigation';

export default function Me() {
  const { data, isLoading, isError, error } = useMe();
  const logoutMutation = useLogout();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className='px-5'>
        <Spinner className='size-5' />
      </div>
    );
  }

  if (isError) {
    return <small className='text-destructive'>{error.message}</small>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <div className='border-r pr-5 text-center'>
        <p>{data.name}</p>
        <p className='text-xs text-muted-foreground'>{data.email}</p>
      </div>

      <ButtonHover1
        className='p-2 hover:text-white'
        variant='destructive'
        layerClassName='before:bg-rose-500'
        onClick={() => {
          logoutMutation.mutate();
          router.push('/login')
        }}
        disabled={logoutMutation.isPending}
      >
        {logoutMutation.isPending ? <Spinner /> : 'Logout'}
      </ButtonHover1>
    </>
  );
}
