import { getCurrentUser } from '@/services/auth/auth.service';
import { sendSuccess, sendUnauthorized } from '@/utils/api-responses';

export const GET = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return sendUnauthorized('User not found');

    return sendSuccess({
      message: 'Current user fetched successfully',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log('ME_ERROR', error);
    return sendUnauthorized('Invalid or expired token');
  }
};
