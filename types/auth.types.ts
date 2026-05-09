export type LoginInput = {
  email: string;
  password: string;
};
export type SignupInput = {
  name: string;
  workSpaceName: string;
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};
export type SignupResult = {
  user: AuthUser;
  workspace?: {
    id: number;
    name: string;
    slug: string;
  };
};
