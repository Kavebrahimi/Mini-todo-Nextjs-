import { loginSchema } from '../auth.validation';
import bcrypt from 'bcryptjs';
import {
  sendBadRequest,
  sendInternalServer,
  sendNotFound,
  sendSuccess,
  sendUnauthorized,
} from '@/utils/api-responses';
import { findUserByEmail } from '@/features/auth/auth.service';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) return sendBadRequest(parsed.error.flatten().fieldErrors);
    const { email, password } = parsed.data;

    const existingUser = await findUserByEmail(email);
    if (!existingUser) return sendNotFound();

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) return sendUnauthorized();

    return sendSuccess({
      message: 'Login successful',
      data: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      },
    });
  } catch (error) {
    console.error('LOGIN_ERROR:', error);
    sendInternalServer();
  }
};
