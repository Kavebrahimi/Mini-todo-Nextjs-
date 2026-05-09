import { db } from '@/db';
import { users, workspaceMembers, workspaces } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { verifyAccessToken } from './auth-token';

type createUserWithWorkspaceInput = {
  name: string;
  email: string;
  hashedPassword: string;
  workSpaceName: string;
  workSpaceSlug: string;
};

export const findUserByEmail = async (email: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user;
};

export const createUserWithWorkspace = async ({
  name,
  email,
  hashedPassword,
  workSpaceName,
  workSpaceSlug,
}: createUserWithWorkspaceInput) => {
  return db.transaction(async (tx) => {
    const [createdUser] = await tx
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
      });
    const [createdWorkSpace] = await tx
      .insert(workspaces)
      .values({
        name: workSpaceName,
        slug: workSpaceSlug,
        ownerId: createdUser.id,
      })
      .returning({
        id: workspaces.id,
        name: workspaces.name,
        slug: workspaces.slug,
      });

    await tx.insert(workspaceMembers).values({
      workspaceId: createdWorkSpace.id,
      userId: createdUser.id,
      role: 'ADMIN',
    });
    return {
      user: createdUser,
      workspace: createdWorkSpace,
    };
  });
};

export const findUserById = async (userId: number) => {
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user;
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return null;

  try {
    const payload = await verifyAccessToken(accessToken);
    const userId = payload.userId;

    if (typeof userId !== 'number') return null;
    const user = await findUserById(userId);

    return user ?? null;
  } catch {}
};
