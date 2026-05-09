import { sendSuccess } from '@/utils/api-responses';
import { cookies } from 'next/headers';

export const POST = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');

  return sendSuccess({ message: 'Logged out successfully', data: null });
};
