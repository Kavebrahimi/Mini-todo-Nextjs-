import bcrypt from 'bcryptjs';
import { signupSchema } from '../../../../services/auth/auth.schema';
import {
  sendBadRequest,
  sendConflict,
  sendCreated,
  sendInternalServer,
} from '@/utils/api-responses';
import {
  findUserByEmail,
  createUserWithWorkspace,
} from '@/services/auth/auth.service';
import { makeSlug } from '@/utils/slugify';
import { setAuthCookie } from '@/helper/auth-cookie';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success)
      return sendBadRequest(parsed.error.flatten().fieldErrors);
    const { name, email, password, workSpaceName } = parsed.data;

    const existingUser = await findUserByEmail(email);
    if (existingUser) return sendConflict();

    const hashedPassword = await bcrypt.hash(password, 10);

    const workSpaceSlug = makeSlug(workSpaceName);

    const result = await createUserWithWorkspace({
      email,
      hashedPassword,
      name,
      workSpaceName,
      workSpaceSlug,
    });

    await setAuthCookie({ email: result.user.email, userId: result.user.id });

    return sendCreated({ message: 'Signed up successfully', data: result });
  } catch (error) {
    console.error(error);
    return sendInternalServer();
  }
};
