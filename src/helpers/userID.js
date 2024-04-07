import { v4 as uuidv4 } from 'uuid';

/**
 * creates unique user-id and removes dashes from it
 * @returns 32-long string
 */
export const createUserID = () => {
  const id = uuidv4().replace(/-/g, '');
  return id;
};
