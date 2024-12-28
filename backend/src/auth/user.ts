export interface User {
  platform: 'discord';
  id: string;
  username: string;
}

export interface UserInfo extends User {
  isAdmin: boolean;
}