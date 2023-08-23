import * as bcrypt from 'bcrypt';

export const passwordHash = (password: string) => bcrypt.hash(password, 10);

export const passwordCompare = (data: string, hash: string) =>
  bcrypt.compare(data, hash);
