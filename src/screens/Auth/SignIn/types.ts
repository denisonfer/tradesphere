export type TSignInResponse = {
  token: string;
  refresh_token: string;
  user: TUser;
};
export type TUser = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  tel: string;
  created_at: string;
  updated_at: string;
};
